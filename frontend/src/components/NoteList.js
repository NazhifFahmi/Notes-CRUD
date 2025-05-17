import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setMessage("Token tidak ditemukan. Silakan login ulang.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`${BASE_URL}/notes`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setNotes(data);
    } catch (err) {
      console.error(err);
      setMessage("Gagal mengambil data catatan. Mungkin token kadaluarsa.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const deleteNote = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus catatan ini?")) return;

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setMessage("Token tidak ditemukan. Silakan login ulang.");
      return;
    }

    try {
      await axios.delete(`${BASE_URL}/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error(err);
      setMessage("Gagal menghapus catatan.");
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    // Jika kamu pakai refresh token, juga hapus di sini
    navigate("/");
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>📌 Catatan</h1>
        <button onClick={logout} className="btn danger" style={{ height: "fit-content" }}>
          Logout
        </button>
      </div>

      <Link to="add" className="btn primary">
        <span>+</span> Tambah Catatan
      </Link>

      {loading ? (
        <p className="loading-text">Memuat catatan…</p>
      ) : message ? (
        <p className="error-text">{message}</p>
      ) : notes.length === 0 ? (
        <div className="empty-text">
          <p>Belum ada catatan.</p>
          <p>Klik "Tambah Catatan" untuk membuat catatan baru.</p>
        </div>
      ) : (
        <div className="note-list">
          {notes.map((note) => (
            <div key={note.id} className="note-card">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              {note.createdAt && (
                <small className="note-date">
                  Dibuat: {formatDate(note.createdAt)}
                </small>
              )}
              <div className="actions">
                <Link to={`edit/${note.id}`} className="btn secondary">
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="btn danger"
                >
                  🗑 Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteList;

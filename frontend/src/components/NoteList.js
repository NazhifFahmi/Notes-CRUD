import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from "../utils";

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        setLoading(true);
        try {
        const response = await axios.get(`${BASE_URL}/notes`);
        setNotes(response.data);
        } catch (error) {
        console.error('Gagal mengambil data:', error);
        } finally {
        setLoading(false);
        }
    };

    const deleteNote = async (id) => {
        const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus catatan ini?');
        if (confirmDelete) {
        try {
            await axios.delete(`${BASE_URL}/notes/${id}`);
            getNotes();
        } catch (error) {
            console.error('Gagal menghapus catatan:', error);
        }
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <div className="card">
        <h1>📌Catatan</h1>
        <Link to="add" className="btn primary">
            <span>+</span> Tambah Catatan
        </Link>

        {loading ? (
            <p className="loading-text">Memuat catatan...</p>
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
                    <Link to={`edit/${note.id}`} className="btn secondary">✏️ Edit</Link>
                    <button onClick={() => deleteNote(note.id)} className="btn danger">🗑 Hapus</button>
                </div>
                </div>
            ))}
            </div>
        )}
        </div>
    );
};


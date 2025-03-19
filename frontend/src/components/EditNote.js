import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from "../utils";

const EditNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getNoteById();
    }, []);

    const getNoteById = async () => {
        setFetchLoading(true);
        try {
        const response = await axios.get(`${BASE_URL}/notes/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
        } catch (error) {
        setError('Gagal memuat catatan.');
        } finally {
        setFetchLoading(false);
        }
    };

    const updateNote = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
        await axios.patch(`http://localhost:5000/notes/${id}`, { 
            title, 
            content,
            updatedAt: new Date().toISOString()
        });
        navigate('/');
        } catch (error) {
        setError('Gagal memperbarui catatan. Coba lagi nanti.');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="card">
        <h1>✏️ Edit Catatan</h1>
        {error && <p className="error-text">{error}</p>}
        {fetchLoading ? (
            <p className="loading-text">Memuat catatan...</p>
        ) : (
            <form onSubmit={updateNote}>
            <label htmlFor="title">Judul</label>
            <input
                id="title"
                type="text"
                placeholder="Edit judul catatan..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <label htmlFor="content">Isi Catatan</label>
            <textarea
                id="content"
                placeholder="Edit isi catatan..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            ></textarea>

            <div className="form-actions">
                <button type="button" className="btn secondary" onClick={() => navigate('/')}>
                Kembali
                </button>
                <button type="submit" className="btn primary" disabled={loading}>
                {loading ? 'Memperbarui...' : '✓ Update Catatan'}
                </button>
            </div>
            </form>
        )}
        </div>
    );
};

export default EditNote;
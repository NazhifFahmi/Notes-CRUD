import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const saveNote = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
        await axios.post('http://localhost:5000/notes', { 
            title, 
            content,
            createdAt: new Date().toISOString()
        });
        navigate('/');
        } catch (error) {
        setError('Gagal menyimpan catatan. Coba lagi nanti.');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="card">
        <h1>📝 Tambah Catatan</h1>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={saveNote}>
            <label htmlFor="title">Judul</label>
            <input
            id="title"
            type="text"
            placeholder="Masukkan judul catatan..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />

            <label htmlFor="content">Isi Catatan</label>
            <textarea
            id="content"
            placeholder="Tulis catatan Anda di sini..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            ></textarea>

            <div className="form-actions">
            <button type="button" className="btn secondary" onClick={() => navigate('/')}>
                Kembali
            </button>
            <button type="submit" className="btn primary" disabled={loading}>
                {loading ? 'Menyimpan...' : 'Simpan Catatan'}
            </button>
            </div>
        </form>
        </div>
    );
};

export default AddNote;
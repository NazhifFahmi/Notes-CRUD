import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NoteList from './components/NoteList';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<NoteList />} />
        <Route path="/notes/add" element={<AddNote />} />
        <Route path="/notes/edit/:id" element={<EditNote />} />
      </Routes>
    </div>
  );
}

export default App;

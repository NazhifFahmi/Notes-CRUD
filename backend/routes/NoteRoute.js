import express from "express";
import {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
} from "../controllers/NoteController.js";
import { login, register, logout } from '../controllers/UserController.js';
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from '../controllers/RefreshToken.js';

const router = express.Router();

router.get('/notes', verifyToken, getNotes);
router.get('/notes/:id', verifyToken, getNoteById);
router.post('/notes', verifyToken, createNote);
router.patch('/notes/:id', verifyToken, updateNote);
router.delete('/notes/:id', verifyToken, deleteNote);

router.get("/token", refreshToken);
router.post("/login", login);
router.post("/register", register);
router.get("/logout", verifyToken, logout);


export default router;
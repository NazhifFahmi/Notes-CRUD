import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import NoteRoute from "./routes/NoteRoute.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000", // ganti dengan URL frontend kamu
    credentials: true // agar bisa mengirim cookie
}));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use(NoteRoute);

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});

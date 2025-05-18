import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import NoteRoute from "./routes/NoteRoute.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || "https://b-05-450916.uc.r.appspot.com", 
    credentials: true 
}));
app.use(cookieParser());
app.use(express.json());

app.use(NoteRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});

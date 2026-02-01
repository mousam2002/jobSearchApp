import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './utils/db.js';
dotenv.config({});
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const corsOptions = {
   origin: ["http://localhost:4040"],
   credentials: true,
}

app.use(cors(corsOptions));

const PORT = process.env.POST || 3001;
app.listen(PORT, () => {
   connectDB();
   console.log(`Server is running on port ${PORT}`);
});
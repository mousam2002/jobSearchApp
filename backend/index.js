import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './utils/db.js';
import userRoute from './routes/userRoutes.js';
import companyRoute from './routes/companyRoutes.js';
import jobRoute from './routes/jobRoutes.js';
import applicationRoute from './routes/applicationRoutes.js';
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

const PORT = process.env.PORT || 3001;

app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);

app.listen(PORT, () => {
   connectDB();
   console.log(`Server is running on port ${PORT}`);
});
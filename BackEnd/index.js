import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./Routes/usera.route.js";
import companyRoutes from "./Routes/company.route.js";
import jobRoutes from "./Routes/job.route.js";

dotenv.config({});

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//api routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/company', companyRoutes);
app.use('/api/v1/job', jobRoutes);

app.listen(PORT, async () => {
    connectDB();
    console.log(`server running on port ${PORT}`);
});


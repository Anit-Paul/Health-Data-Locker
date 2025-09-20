import express from "express";
import connectDB from "./config/database.js";
import authRouter from "./routers/auth.js";
import detailsRouter from "./routers/details.js";
import cookieParser from "cookie-parser";
import recordRouter from "./routers/record.js";
import shareRouter from "./routers/share.js";
import emergencyRouter from "./routers/emergency.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"], // allowed methods
    credentials: true, // allow cookies/auth
  })
);

//urls
app.use("/api/auth", authRouter);
app.use("/api/details", detailsRouter);
app.use("/api/record", recordRouter);
app.use("/api/share", shareRouter);
app.use("/api/emergency", emergencyRouter);

connectDB();
app.listen(3000, () => {
  console.log("server started");
});

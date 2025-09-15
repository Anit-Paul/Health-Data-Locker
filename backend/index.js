import express from 'express';
import connectDB from './config/database.js';
import authRouter from './routers/auth.js';
import cookieParser from 'cookie-parser';
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//urls
app.use("/api/auth",authRouter);

connectDB()
app.listen(3000,()=>{
    console.log("server started")
})
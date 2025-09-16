import express from 'express';
import connectDB from './config/database.js';
import authRouter from './routers/auth.js';
import detailsRouter from './routers/details.js';
import cookieParser from 'cookie-parser';
import recordRouter from './routers/record.js';
import shareRouter from './routers/share.js';
import emergencyRouter from './routers/emergency.js';
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



//urls
app.use("/api/auth",authRouter);
app.use("/api/details",detailsRouter);
app.use("/api/record",recordRouter);
app.use("/api/share",shareRouter);
app.use("/api/emergency",emergencyRouter);

connectDB()
app.listen(3000,()=>{
    console.log("server started")
})
import express from 'express';
import connectDB from './config/database.js';
import authRouter from './routers/auth.js';
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//urls
app.use("/api/auth",authRouter);

connectDB()
app.listen(3000,()=>{
    console.log("server started")
})
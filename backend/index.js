import express from 'express';
import connectDB from './config/database.js';

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

connectDB()
app.listen(3000,()=>{
    console.log("server started")
})
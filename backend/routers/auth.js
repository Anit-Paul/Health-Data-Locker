import express from 'express';
import { registerAPI,loginAPI } from '../controller/auth.js';

const authRouter=express.Router()

authRouter.post("/register",registerAPI);
authRouter.post("/login",loginAPI);
export default authRouter;
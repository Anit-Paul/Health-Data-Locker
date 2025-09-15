import express from 'express';
import { registerAPI,loginAPI,logoutAPI } from '../controller/auth.js';

const authRouter=express.Router()

authRouter.post("/register",registerAPI);
authRouter.post("/login",loginAPI);
authRouter.post("/logout",logoutAPI);
export default authRouter;
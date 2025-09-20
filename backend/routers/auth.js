import express from 'express';
import { registerAPI,loginAPI,logoutAPI,getUserAPI } from '../controller/auth.js';

const authRouter=express.Router()

authRouter.post("/register",registerAPI);
authRouter.get("/user",getUserAPI);
authRouter.post("/login",loginAPI);
authRouter.post("/logout",logoutAPI);
export default authRouter;
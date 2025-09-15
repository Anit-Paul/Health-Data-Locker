import express from 'express';
import { registerAPI } from '../controller/auth.js';

const authRouter=express.Router()

authRouter.post("/register",registerAPI);

export default authRouter;
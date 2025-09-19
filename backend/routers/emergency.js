import express from 'express';
import { getLinkDataAPI,getQRcode } from '../controller/emergency.js';
import authMiddleware from '../middleware/authUser.js';
const emergencyRouter=express.Router()


emergencyRouter.get("/",authMiddleware,getQRcode);
emergencyRouter.get("/:token",getLinkDataAPI);


export default emergencyRouter;
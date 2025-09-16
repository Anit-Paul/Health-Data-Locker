import express from 'express';
import { getLinkAPI,getLinkDataAPI } from '../controller/emergency.js';
import authMiddleware from '../middleware/authUser.js';
const emergencyRouter=express.Router()

emergencyRouter.post("",authMiddleware,getLinkAPI);
emergencyRouter.get("/:token",getLinkDataAPI);

export default emergencyRouter;
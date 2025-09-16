import express from 'express';
import { saveRecordAPI,fetchRecordAPI } from '../controller/record.js';
import authMiddleware from '../middleware/authUser.js';
import upload from '../config/cloudinary.js'
const recordRouter=express.Router()

recordRouter.post("",authMiddleware,upload.single("filePath"),saveRecordAPI);
recordRouter.get("",authMiddleware,fetchRecordAPI);

export default recordRouter;
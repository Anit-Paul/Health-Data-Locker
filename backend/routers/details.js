import express from 'express';
import { saveAPI,fetchAPI } from '../controller/details.js';
import authMiddleware from '../middleware/authUser.js';
const detailsRouter=express.Router()

detailsRouter.post("/save",authMiddleware,saveAPI);
detailsRouter.post("/get",fetchAPI);

export default detailsRouter;
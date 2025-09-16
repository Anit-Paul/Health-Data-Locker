import express from 'express'
import { shareAPI,fetchDataFromLinkAPI } from '../controller/share.js';
const shareRouter=express.Router()

shareRouter.post("",shareAPI);
shareRouter.get("/:token",fetchDataFromLinkAPI);
export default shareRouter;
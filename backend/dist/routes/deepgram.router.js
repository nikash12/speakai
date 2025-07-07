import { Router } from "express";
import { speechToText } from "../controllers/api.controller.js";
import upload from "../utils/multer.js";
const deepgramRoute = Router();
deepgramRoute.route('/analyze-speech').post(upload.single("file"), speechToText);
export default deepgramRoute;

import { Router } from "express";
import { generateQuestions } from "../controllers/interviewApi.controller.js";

const interviewRoute = Router()

interviewRoute.route('/questions').post(
    generateQuestions
)


export default interviewRoute
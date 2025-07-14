import { Router } from "express";
import { generateQuestions, generateReport } from "../controllers/interviewApi.controller.js";

const interviewRoute = Router()

interviewRoute.route('/questions').post(
    generateQuestions
)

interviewRoute.route('/generateReport').post(
    generateReport
)

export default interviewRoute
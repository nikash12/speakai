import { Router } from "express";
import { generateQuestions, generateReport,dynamicChatHandler, generateGameQuestions } from "../controllers/interviewApi.controller.js";
import { endSession } from "../controllers/session.controller.js";

const interviewRoute = Router()

interviewRoute.route('/questions').post(
    generateQuestions
)

interviewRoute.route('/generateReport').post(
    generateReport
)

interviewRoute.route('/dynamic/questions').post(
    dynamicChatHandler
)

interviewRoute.route('/game/questions').post(
    generateGameQuestions
)

interviewRoute.route('/end').post(
    endSession
)

export default interviewRoute
import { Router } from "express";
import { userAll, userLogin, userRegister } from "../controllers/user.controller.js";
const route = Router()

route.route('/register').post(
    userRegister
)
route.route('/login').post(
    userLogin
)
route.route('/all').get(
    userAll
)

export default route
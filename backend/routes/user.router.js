import { Router } from "express";
import { userAll, userLogin, userRegister, userUpdate } from "../controllers/user.controller.js";
import {userMiddleware,userUpdateMiddleware} from '../middleware/user.middleware.js'
const route = Router()

route.route('/Register').post(
    userMiddleware,
    userRegister
)
route.route('/Update').post(
    userUpdateMiddleware,
    userUpdate
)
route.route('/Login').post(
    userMiddleware,
    userLogin
)
route.route('/All').get(
    userAll
)

export default route
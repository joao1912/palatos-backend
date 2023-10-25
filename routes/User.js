import express from "express"
const router = express.Router()
import UserController from "../database/controllers/userController.js"
const userController = new UserController()

import AuthToken from "../Middlewares/AuthToken.js"
const authToken = new AuthToken()

router.get("/", authToken.execute, userController.getUsers)

router.get("/auth", authToken.execute, userController.auth)

router.get('/getUser', authToken.execute, userController.getUser)

router.post("/newUser", authToken.execute ,userController.createUser)

export default router
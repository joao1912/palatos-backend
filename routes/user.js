import express from "express"
const router = express.Router()
import UserController from "../database/controllers/userController.js"
const userController = new UserController()

import AuthToken from "../Middlewares/AuthToken.js"
const authTokenAccess = new AuthToken()

router.get("/", authTokenAccess.execute , userController.getUser)

router.post("/newUser", userController.createUser)

export default router
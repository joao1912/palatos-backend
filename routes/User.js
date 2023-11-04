import express from "express"
import UserController from "../database/controllers/userController.js"
import AuthToken from "../Middlewares/AuthToken.js"

const authToken = new AuthToken()
const userController = new UserController()
const router = express.Router()

router.get("/", authToken.execute, userController.getUsers)

router.get("/auth", authToken.execute, userController.auth)

router.get('/getUser/:id', authToken.execute, userController.getUser)

router.post("/newUser", userController.createUser)



export default router
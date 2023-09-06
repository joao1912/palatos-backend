const express = require("express")
const router = express.Router()
import UserController from "../controllers/userController"
const userController = new UserController()

router.get("/", userController.getUser)

router.post("/newUser", userController.createUser)

module.exports = router
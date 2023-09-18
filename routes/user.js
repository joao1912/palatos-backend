import express from "express"
const router = express.Router()
import UserController from "../controllers/userController.js"
const userController = new UserController()

import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../index.js"

//esta função é um middleware que verifica se o usuario está autenticado
function validateJwt(req, res, next) {
    const token = req.header("Authorization")

    if (!token) {
        res.status(401).json({
            status: 'failed',
            erro: "Token ausente"
        })
    }
    
    jwt.verify(token, SECRET_KEY, async (err, decode) => {
        if (err) return res.status(401)

        req.id = decode.userId
        next()
    })     
}

router.get("/", validateJwt , userController.getUser)

router.post("/newUser", userController.createUser)

export default router
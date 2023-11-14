import express from "express";
import mesaController from "../database/controllers/mesaController.js";
import AuthToken  from "../Middlewares/AuthToken.js"
const authToken = new AuthToken()

const MesaController = new mesaController()

const router = express.Router()

router.get("/add/:idRestaurante", authToken.execute, MesaController.criarMesa) //precisa do multer

export default router
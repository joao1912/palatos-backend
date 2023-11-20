import express from "express";
import mesaController from "../database/controllers/mesaController.js";
import AuthToken  from "../Middlewares/AuthToken.js"
import multer from "multer"
import { storage } from "../Middlewares/MulterConfig.js"

const authToken = new AuthToken()

const upload = multer({storage})

const MesaController = new mesaController()

const router = express.Router()

router.get("/:idRestaurante", authToken.execute, MesaController.pegarMesas)

router.post("/add/:idRestaurante", authToken.execute, MesaController.criarMesa)

router.put("/addQrCode/:idMesa", authToken.execute, MesaController.adicionarQrCode)

router.put("/toggleOccupied/:idMesa", authToken.execute, MesaController.trocarOcupado)

router.delete("/delete/:idMesa", authToken.execute, MesaController.deletarMesa)


export default router
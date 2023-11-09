import express from "express";
import comandaController from "../database/controllers/comandaController.js"
import AuthToken from "../Middlewares/AuthToken.js";

const authToken = new AuthToken()
const ComandaController = new comandaController()

const router = express.Router()


router.get("/", authToken.execute, ComandaController.getComandas)

router.post("/createComanda", ComandaController.criarComandas)

router.post("/createComanda/reserva",authToken.execute, ComandaController.criarComandas)

router.delete("/delete/:id", authToken.execute, ComandaController.deleteComanda)



export default router
import express from "express";
import comandaController from "../database/controllers/comandaController.js"
import AuthToken from "../Middlewares/AuthToken.js";

const authToken = new AuthToken()
const ComandaController = new comandaController()

const router = express.Router()


router.get("/", authToken.execute, ComandaController.getComandas)
router.delete("/delete/:id", ComandaController.deleteComanda)



export default router
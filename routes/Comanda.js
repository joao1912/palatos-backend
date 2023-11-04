import express from "express";
import comandaController from "../database/controllers/comandaController.js"
import AuthToken from "../Middlewares/AuthToken.js";

const authToken = new AuthToken()
const ComandaController = new comandaController()

const router = express.Router()


router.get("/", ComandaController.getComandas)
router.delete("/delete/:id", authToken.execute,ComandaController.deleteComanda)



export default router
import express from "express";
import ComandaController from "../database/controllers/comandaController"
import AuthToken from "../Middlewares/AuthToken";

const authToken = new AuthToken()
const ComandaController = new comandaController()

const router = express.Router()

router.get("/comandas", comandaController.getComandas)
router.delete("/comandas/delete/:id", comandaController.deleteComanda)
import express from "express";
import CarrinhoMesaController from "../database/controllers/carrinhoMesaController.js";

const carrinhoMesaController = new CarrinhoMesaController()

const router = express.Router()



router.post("/addItem", carrinhoMesaController.addItem)



export default router
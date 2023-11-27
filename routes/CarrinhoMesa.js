import express from "express";
import CarrinhoMesaController from "../database/controllers/carrinhoMesaController.js";

const carrinhoMesaController = new CarrinhoMesaController()

const router = express.Router()



router.post("/addItem", carrinhoMesaController.addItem)

router.get("/getAll/:idMesa",carrinhoMesaController.getAll)

router.delete("/deleteItem/:idMesa/:idProduto",carrinhoMesaController.deleteItem)


export default router
import express from "express";
import CarrinhoReservaController from "../database/controllers/carrinhoReservaController.js";
import AuthToken  from "../Middlewares/AuthToken.js"
const authToken = new AuthToken()

const carrinhoMesaController= new CarrinhoReservaController();

const router = express.Router()

router.get("/:id", carrinhoMesaController.getCarrinho)


router.post("/addItem", authToken.execute, carrinhoMesaController.addItem)




export default router
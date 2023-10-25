import financeiroController from "../database/controllers/financeiroController.js"
import AuthToken from "../Middlewares/AuthToken.js";
import express from "express";

const router = express.Router()
const FinanceiroController = new financeiroController()
const authToken = new AuthToken()

router.get("/getAll", authToken.execute ,FinanceiroController.getAllPurchases)

export default router

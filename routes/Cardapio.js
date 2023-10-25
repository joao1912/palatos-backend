import express from 'express';
import cardapioController from '../database/controllers/cardapioController.js';
import AuthToken from "../Middlewares/AuthToken.js"
import multer from "multer"
import { storage } from "../Middlewares/MulterConfig.js"

const router = express.Router();
const authToken = new AuthToken()
const upload = multer({storage})

const CardapioController = new cardapioController()

router.get("/:idRestautante", CardapioController.getCardapio)

router.post("/add", authToken.execute, upload.single("file") ,CardapioController.createCardapio)

router.delete("/delete", authToken.execute, CardapioController.deleteCardapio)

export default router
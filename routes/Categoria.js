import express from "express";
import CategoriaController from "../database/controllers/categoriaController.js";
import AuthToken from "../Middlewares/AuthToken.js";

const authToken = new AuthToken()
const categoriaController = new CategoriaController()

const router = express.Router()


router.get("/", categoriaController.getAllCategorias)


export default router
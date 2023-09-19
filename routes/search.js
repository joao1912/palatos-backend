import express from "express"
import listaCategoriaController from "../database/controllers/ListaCategoriaController.js"
const ListaCategoriaController = new listaCategoriaController()

const router = express.Router()


router.get("/categorias", ListaCategoriaController.getCategorias)


export default router
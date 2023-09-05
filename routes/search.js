const express = require("express")
import listaCategoriaController from "../controllers/listaCategoriaController"
const ListaCategoriaController = new listaCategoriaController()

const router = express.Router()


router.get("/search/categorias", ListaCategoriaController.getCategorias)


module.exports = router
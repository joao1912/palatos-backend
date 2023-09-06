const express = require("express")
import restauranteController from "../controllers/restauranteController"
const RestauranteController = new restauranteController()

const router = express.Router()

router.get("/restaurante", RestauranteController.getRestaurant)

router.get("/restaurante/:id", RestauranteController.getRestaurant)

router.post("/restaurante/add" , RestauranteController.createRestaurant)

router.put("/restaurante/edit/:id", RestauranteController.editRestaurant)

router.delete("/restaurante/delete/:id", RestauranteController.deleteRestaurant)

module.exports = router
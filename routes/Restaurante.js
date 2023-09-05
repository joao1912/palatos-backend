const express = require("express")
import restauranteController from "../controllers/restauranteController"
const RestauranteController = new restauranteController()

const router = express.Router()


router.get("/restaurante", RestauranteController.getRestaurant)

router.get("/restaurante/:id", RestauranteController.getRestaurant)

router.post("/addRestaurante" , RestauranteController.createRestaurant)

router.put("/editRestaurante", RestauranteController)

router.delete("/deleteRestaurante/:id", RestauranteController)



module.exports = router
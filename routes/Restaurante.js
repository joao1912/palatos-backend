import express from "express"
import restauranteController from "../controllers/restauranteController.js"


const RestauranteController = new restauranteController()

const router = express.Router()

router.get("/", RestauranteController.getRestaurant)

router.get("/:id", RestauranteController.getRestaurant)

router.post("/add" , RestauranteController.createRestaurant)

router.put("/edit/:id", RestauranteController.editRestaurant)

router.delete("/delete/:id", RestauranteController.deleteRestaurant)

export default router
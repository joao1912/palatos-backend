import express from "express"
import restauranteController from "../database/controllers/restauranteController.js"
import { AuthToken } from "../Middlewares/AuthToken.js"
const authToken = new AuthToken()


const RestauranteController = new restauranteController()

const router = express.Router()

router.get("/", RestauranteController.getRestaurant)

router.get("/:id", RestauranteController.getRestaurant)

router.post("/add" , authToken , RestauranteController.createRestaurant)

router.put("/edit/:id", RestauranteController.editRestaurant)

router.delete("/delete/:id", RestauranteController.deleteRestaurant)

export default router
import express from "express"
import multer from "multer"
import restauranteController from "../database/controllers/restauranteController.js"

import { storage } from "../Middlewares/MulterConfig.js"
const upload = multer({storage: storage})

const RestauranteController = new restauranteController()

const router = express.Router()

router.get("/", RestauranteController.getRestaurant)

router.get("/:id", RestauranteController.getRestaurant)

router.post("/add" , upload.array("foto") ,RestauranteController.createRestaurant)

router.put("/edit/:id", RestauranteController.editRestaurant)

router.delete("/delete/:id", RestauranteController.deleteRestaurant)

export default router
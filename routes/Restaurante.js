import express from "express"
import multer from "multer"
import restauranteController from "../database/controllers/restauranteController.js"
import AuthToken  from "../Middlewares/AuthToken.js"
const authToken = new AuthToken()

import { storage } from "../Middlewares/MulterConfig.js"
const upload = multer({storage: storage})

const RestauranteController = new restauranteController()

const router = express.Router()

router.get("/", RestauranteController.getRestaurant)

router.get("/:id", RestauranteController.getRestaurant)

router.post("/add", authToken.execute, upload.single("file") ,RestauranteController.createRestaurant)

router.put("/edit/:id", authToken.execute, RestauranteController.editRestaurant)

router.delete("/delete/:id",authToken.execute, RestauranteController.deleteRestaurant)

export default router
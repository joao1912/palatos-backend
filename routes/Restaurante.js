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

router.get("/search/:id", RestauranteController.getRestaurant)

router.post("/add", authToken.execute, upload.single("file") ,RestauranteController.createRestaurant)

router.post("/login",  RestauranteController.loginRestaurant)

router.put("/edit/:idRestaurante", authToken.execute, RestauranteController.editRestaurant)

router.delete("/delete/:idRestaurante",authToken.execute, RestauranteController.deleteRestaurant)


export default router
import express from "express";
import reservaController from "../database/controllers/reservaController.js";
import AuthToken  from "../Middlewares/AuthToken.js"
const authToken = new AuthToken()

const ReservaController = new reservaController()

const router = express.Router()

router.get("/", authToken.execute, ReservaController.getReservas)
router.get("/:id", authToken.execute, ReservaController.getReservas)

router.post("/add/", ReservaController.addReserva)

router.put("/completed/:cod", authToken.execute, ReservaController.editReserva)

export default router
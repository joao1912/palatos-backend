import express from "express";
import reservaController from "../database/controllers/reservaController.js";
import AuthToken  from "../Middlewares/AuthToken.js"
const authToken = new AuthToken()

const ReservaController = new reservaController()

const router = express.Router()

router.get("/reservas", authToken.execute, ReservaController.getReservas)
router.get("/reserva/:id", authToken.execute, ReservaController.getReservas)

router.post("/reserva/add/", ReservaController.addReserva)

router.put("/reserva/completed/:cod", authToken.execute, ReservaController.editReserva)

export default router
import express from "express";
import reservaController from "../controllers/reservaController.js";

const ReservaController = new reservaController()

const router = express.Router()

router.get("/reservas", ReservaController.getReservas)
router.get("/reserva/:id", ReservaController.getReservas)

router.post("/reserva/add/", ReservaController.addReserva)

router.put("/reserva/completed/:cod", ReservaController.editReserva)

export default router
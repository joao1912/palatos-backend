import express from "express";
import reservaController from "../controllers/reservaController";

const ReservaController = new reservaController()

const router = express.Router()

router.get("/reservas", ReservaController.getReservas)
router.get("/reserva/:id", ReservaController.getReservas)

export default router
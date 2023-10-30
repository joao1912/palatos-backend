import Reserva from "../models/Reserva.js"
import Usuario from "../models/Usuario.js";

class reservaController {

    async getReservas(req, res) {

        const idUser = req.params.id;

        if (typeof idUser === "number") {

            const reserva = await Reserva.findOne({where: {fk_usuario: idUser}})

            if (reserva == null) {

                res.status(404).json({
                    status: 'failed',
                    erro: "O usuário não foi encontrado."
                })

            } else {

                res.status(200).json({
                    status: 'success',
                    reserva
                })
            }
            
        } else {

            const reservas = await Reserva.findAll()
            if (!reservas) {
                throw new Error("O servidor falhou em buscar as reservas.")
            }
            res.status(200).json({
                status: 'success',
                reservas
            })
        }
    }

    async addReserva(req,res) {
        const { userId, dataEntrada } = req.body; //falta o pedido do cliente
        // a data tera que vir completa com horario

        if ( typeof userId === "number") {

            const usuario = await Usuario.findByPk(userId);
            if (!usuario) {
                return res.status(404).json({
                    status: 'failed',
                    error: 'Usuário não encontrado' 
                });
            }

        } else {

            throw new Error("typeof error")

        }

        const novaReserva = await Reserva.create({
            data_entrada: dataEntrada,
            fk_usuario: userId
        })

        if (!novaReserva) {
            throw new Error("O servidor falhou em criar a reserva.")
        }

        res.status(200).json({
            status: 'success',
            novaReserva
        })
    }

    async editReserva(req, res) {

        const cod = req.params.cod;

        if (typeof cod != "number") {

            throw new Error("typeof error")

        }

        const reserva = await Reserva.findByPk(cod)

        if (!reserva) {
            throw new Error("falhou em buscar a reserva")
        }

        const completedOrNot = reserva.isCompleted

        if (completedOrNot) {
            throw new Error("A reserva ja foi completada.")
        }

        reserva.set({
            isCompleted: true
        })

        reserva.save()

        res.status(200).json({
            status: 'success',
            message: "A reserva foi completada."
        })
            
    }
}

export default reservaController
import { CustomError } from "../../Middlewares/erros.js";
import { random } from "../../utils/functions.js"
import PedidoReserva from "../models/PedidoReserva.js";
import Reserva from "../models/Reserva.js"
import Usuario from "../models/Usuario.js";

class reservaController {

    async getReservas(req, res) {

        const idUser = req.params.id;

        if (typeof idUser === "number") {

            const reserva = await Reserva.findOne({where: {fk_usuario: idUser}})

            if (reserva == null) {
                throw new CustomError("O usuário não foi encontrado", 404)
            }

            res.status(200).json({
                status: 'success',
                reserva
            })
            
        } else {

            const reservas = await Reserva.findAll()
            if (!reservas) {
                throw new CustomError("O servidor falhou em buscar as reservas.", 500)
            }
            res.status(200).json({
                status: 'success',
                reservas
            })
        }
    }

    async addReserva(req,res) {
        const { id, dataEntrada, idRestaurante, pedido} = req.body; 
        // a data tera que vir completa com horario

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            throw new CustomError("Usuário não encontrado", 404)
        }
        
        let num = 0
        while(true) {
            num = random(10000000, 99999999)
            const reserva = await Reserva.findOne({
                where: {
                    cod: num
                }
            })
            if(!reserva) break
        }

        const novaReserva = await Reserva.create({
            cod: num,
            data_entrada: dataEntrada,
            fk_usuario: id,
            fk_restaurante: idRestaurante
        })

        if (!novaReserva) {
            throw new CustomError("O servidor falhou em criar a reserva.", 500)
        }

        for(let produto of pedido){
           await PedidoReserva.create({
                observacoes:produto.observacoes,
                quantidade:produto.quantidade,
                fk_reserva: novaReserva.cod,
                fk_cardapio: produto.codigo
           }) 
        }

        res.status(200).json({
            status: 'success',
            novaReserva
        })

    }

    async editReserva(req, res) {

        const {cod} = req.params;

        const reserva = await Reserva.findByPk(cod)

        if (!reserva) {
            throw new CustomError("falhou em buscar a reserva", 400)
        }

        const completedOrNot = reserva.isCompleted

        if (completedOrNot) {
            throw new CustomError("A reserva ja foi completada.", 400)
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
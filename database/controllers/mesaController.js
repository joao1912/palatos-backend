import Mesa from "../models/Mesa.js"
import ListaMesa from "../models/ListaMesa.js"
import { CustomError } from "../../Middlewares/erros.js"


class mesaController {

    async pegarMesas(req, res) {

        const { idRestaurante } = req.params

        const listaMesas = await ListaMesa.findAll({
            where: {
                fk_restaurante: idRestaurante
            }
        })

        if (!listaMesas || listaMesas.length == 0) {
            throw new CustomError("Este restaurante não possui mesas.", 404)
        }

        const mesas = []

        for (let obj of listaMesas) {

            const mesa = await Mesa.findByPk(obj.fk_mesa)
            mesas.push(mesa)

        }

        res.status(200).json({
            status: 'success',
            mesas: mesas
        })

    }

    async criarMesa(req, res) {
        const { idRestaurante } = req.params
        console.log(req.header)
        console.log(req)

        let mesa

        try {
            mesa = await Mesa.create({
                conta: 0
            })
            
            const jsonMesa = JSON.stringify({
                idRestaurante: idRestaurante,
                idMesa: mesa.id
            })

            mesa.set({
                qr_code: jsonMesa
            })

            mesa.save()

            await ListaMesa.create({
                fk_restaurante: idRestaurante,
                fk_mesa: mesa.id,
            })

        } catch (error) {
            console.log(error)
            throw new CustomError("O servidor falhou em criar a mesa", 500)
        }


        res.status(200).json({
            status: "success",
            mesa:mesa
        })
    }

    async adicionarQrCode(req, res) {

        const { idMesa } = req.params;
        const {jsonMesa} = req.body;
        let mesa

        try {
            mesa = Mesa.findByPk(idMesa)
            mesa.set({
                qr_code: jsonMesa,
            })
            mesa.save()

        } catch (error) {
            throw new CustomError("Erro ao adicionar os qrcodes", 500)            
        }
        
        res.status(200).json({
            status: "success",
            mesa: mesa
        })

    }

    async trocarOcupado(req,res){
        const {idMesa} = req.params
        const {isOccupied} = req.body

        const mesa = await Mesa.findByPk(idMesa)

        if(!mesa){
            throw new CustomError("Esta mesa não foi encontrada", 404)
        }

        if (mesa.ocupada != isOccupied) {

            mesa.set({
                ocupada: isOccupied
            })

            mesa.save()

            res.status(200).json({
                status:'success',
                message: "Troca efetuada"
            })

        }

        let message = isOccupied ? "Já está ocupada." : "Já está livre."

        res.status(200).json({
            status:'success',
            message: message
        })

    }

    async deletarMesa(req,res){
        const {idMesa} = req.params

        if (!idMesa) {
            throw new CustomError("Id inválido", 400)
        }

        try {
            await ListaMesa.destroy({
                where: {
                    fk_mesa: idMesa
                }
            })

            await Mesa.destroy({
                where:{
                   id:idMesa 
                }
            })
        } catch (error) {
            throw new CustomError("A mesa não pode ser deletada", 500)
        }

        res.status(200).json({
            status:'success',
            message:'Mesa deletada com sucesso!'
        })

    }    

}

export default mesaController
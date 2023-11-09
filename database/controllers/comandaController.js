import Comanda from "../models/Comanda.js"
import ProdutoComanda from "../models/ProdutoComanda.js"
import Mesa from "../models/Mesa.js"
import { CustomError } from "../../Middlewares/erros.js"
import Cardapio from "../models/Cardapio.js"
import { Op } from "sequelize"
import ProdutoCarrinho from "../models/ProdutoCarrinho.js"
import PedidoReserva from "../models/PedidoReserva.js"
import ReservaCarrinho from "../models/ReservaCarrinho.js"
import Reserva from "../models/Reserva.js"

class comandaController {
    async getComandas(req, res) {

        // const { idRestaurante } = req.params
        // if (!idRestaurante) {
        //     throw new CustomError("Id do restaurante ausente", 400)
        // }

        let listComandas
        try {

            let inicioDia = new Date()
            inicioDia.setHours(0, 0, 0, 0)
            let fimDia = new Date(inicioDia)
            fimDia.setHours(23, 59, 59, 999)

            listComandas = await Comanda.findAll({
                where: {
                    data_entrada: {
                        [Op.between]: [inicioDia, fimDia]
                    }
                },
                include: [{
                    model: ProdutoComanda,
                    include: [{
                        model: Cardapio,
                        attributes: ['nome_produto']
                    }]
                }]
            })

            if (!listComandas) {
                return res.status(200).json({
                    status: "success",
                    message: "Não há comandas cadastradas.",
                    ListaComandas: []
                })
            }


            listComandas.forEach((comanda => {
                comanda.ProdutoComandas.forEach((produto => {
                    produto.dataValues.nome_produto = produto.Cardapio.nome_produto
                    delete produto.dataValues.Cardapio
                }))
            }))


            res.status(200).json({
                status: "success",
                message: "Lista de comandas",
                ListaComandas: listComandas
            })
        }


        catch (err) {
            throw new CustomError(`Erro ao obter comandas: ${err}`, 400)
        }
    }

    async criarComandas(req,res){

        const id=req.id
        const {
            idMesa,
            data_entrada,
            idRestaurante
        }=req.body

        if(id){

            let reserva

            try {
                
                const comanda= await Comanda.create({
                    is_reserva:true
                })

                reserva= await Reserva.create({
                    data_entrada:data_entrada,
                    fk_usuario:id,
                    fk_restaurante:idRestaurante
                })

                const produtos= await ReservaCarrinho.findAll({
                    where:{
                       fk_usuario:id
                    }
                })

                for(let obj of produtos){

                    await PedidoReserva.create({
                        observacoes:obj.observacoes,
                        quantidade:obj.quantidade,
                        fk_reserva:reserva.cod,
                        fk_comanda:comanda.id
                    })

                }

                await ReservaCarrinho.destroy({
                    where:{
                        fk_usuario:id
                    }
                })

            } catch (error) {
                    throw new CustomError('O servidor falhou em criar a comanda',500)
            }

            res.status(200).json({
                status:'success',
                message:'Reserva criada :)',
                reserva:reserva
            })

        }else{

            try {
                
                const comandaMesa= await Comanda.create({
                    is_reserva:false
                })

                const produtos= await ProdutoCarrinho.findAll({
                    where:{
                        fk_mesa:idMesa
                    }
                })

                for(let obj of produtos){

                    await ProdutoComanda.create({
                        observacoes:obj.observacoes,
                        quantidade:obj.quantidade,
                        fk_cardapio:obj.fk_cardapio,
                        fk_comanda:comandaMesa.id
                    })

                }

                await ProdutoCarrinho.destroy({
                    where:{
                        fk_mesa:idMesa
                    }
                })

            } catch (error) {
                    throw new CustomError('O servidor falhou em criar a comanda',500)
            }

            res.status(200).json({
                status:'success',
                message:'Pedido Finalizado :) '
            })
        }
    }

    async deleteComanda(req, res) {

        const { id } = req.params;

        if(!id) {
            throw new CustomError("Id não especificado.", 400)
        }
        
        try {
            Comanda.destroy({
                where: {
                    id: id
                }
            })

            ProdutoComanda.destroy({
                where: {
                    fk_comanda: id
                }
            })

            res.status(200).json({
                status: "success",
                message: "Comanda removida."

            })
        } catch (err) {
            throw new CustomError("Erro ao deletar comanda.", 500)
        }
    }
}

export default comandaController
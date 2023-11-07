import Comanda from "../models/Comanda.js"
import ProdutoComanda from "../models/ProdutoComanda.js"
import Mesa from "../models/Mesa.js"
import { CustomError } from "../../Middlewares/erros.js"
import Cardapio from "../models/Cardapio.js"
import database from "../db.js"

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
                        [database.between]: [inicioDia, fimDia]
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

    async deleteComanda(req, res) {

        const { id } = req.params;
        try {
            Comanda.destroy({
                where: {
                    id: id
                }
            })

            res.status(200).json({
                status: "success",
                message: "Comanda removida."

            })
        } catch (err) {
            throw new CustomError("Erro ao deletar comanda.", 400)
        }
    }
}

export default comandaController
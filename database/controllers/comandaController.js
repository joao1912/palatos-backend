import Comanda from "../models/Comanda.js"
import ProdutoComanda from "../models/ProdutoCarrinho.js"
import Mesa from "../models/Mesa.js"
import { CustomError } from "../../Middlewares/erros.js"

class comandaController {
    async getComandas(req, res) {

        // const { idRestaurante } = req.params
        // if (!idRestaurante) {
        //     throw new CustomError("Id do restaurante ausente", 400)
        // }

        try {
            const listComandas = await Comanda.findAll({
                include: [{
                    model: ProdutoComanda
                }]
            })

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
import Comanda from "../models/Comanda.js"
import ProdutoCarrinho from "../models/ProdutoCarrinho.js"
import Mesa from "../models/Mesa.js"
import { CustomError } from "../../Middlewares/erros.js"

class comandaController {
    async getComandas(req, res) {
       
        const { idRestaurante } = req.params
        if(!idRestaurante) {
            throw new CustomError("Id do restaurante ausente", 400)
        }

        try {
            const listComandas = await Comanda.findAll()

            for (let obj of listComandas) {

                let id = -1
               

                let result = await ProdutoCarrinho.findByPk(obj.fk_produto_carrinho)

                console.log(`Id retornado do produto carrinho: ${result.id}`)
                console.log(`Id do objeto percorrido: ${obj.id}`)
                
                if(!result) {
                    console.log("Resultado nulo")
                    console.log(result)
                }
                if (result.id) {
                    id = result.fk_mesa
                    console.log("Primeiro passo")

                    result = await Mesa.findByPk(id)
                    if (result.id) {
                        console.log("segundo passo")
                        obj.identificacao_mesa = result.identificacao_mesa
                    }
                }
            }

            res.status(200).json({
                status: "success",
                message: "Lista de comandas",
                ListaComandas: listComandas
            })
        }

        
     catch(err) {
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
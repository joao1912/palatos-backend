import Comanda from "../models/Comanda.js"
import ProdutoCarrinho from "../models/ProdutoCarrinho.js"
import Mesa from "../models/Mesa.js"
import e from "cors"

class comandaController {
    async getComandas(req, res) {
       
        try {
            const listComandas = await Comanda.findAll()

            console.log(listComandas[0].id)

            for (let obj of listComandas) {

                let id = -1

                let result = await ProdutoCarrinho.findOne({
                    where: {
                        fk_mesa: obj.id
                    }
                })

                console.log(`Id retornado do produto carrinho: ${result.id}`)
                console.log(`Id do objeto percorrido: ${obj.id}`)
                
                if(!result) {
                    console.log("Resultado nulo")
                    console.log(result)
                }
                if (result.id) {
                    id = result.id
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
        throw new Error(`Erro ao obter comandas: ${err}`)
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
        throw new Error("Erro ao deletar comanda.")
    }
}
}

export default comandaController
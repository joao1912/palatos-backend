import Cardapio from "../models/Cardapio.js";
import Financeiro from "../models/Financeiro.js"

class financeiroController {

    async getAllPurchases(req, res) {

        const { idRestaurante } = req.body;

        const allPurchases = await Financeiro.findAll({
            where: {
                fk_restaurante: idRestaurante
            }
        })

        const allProducts = []
        for (let i = 0 ; i < allPurchases.length ; i++) {

            const product = await Cardapio.findByPk(allPurchases.fk_cardapio)
            allProducts.push(product)

        }

        const filteredPurchases = {
            pratos: [],
            bebidas: [],
            sobremesas: []
        }

        const porcentPurchases = {
            pratos: 0,
            bebidas: 0,
            sobremesas: 0
        }

        if (!allPurchases) {
            res.status(200).json({
                status: 'success',
                allProducts,
                filteredPurchases,
                porcentPurchases
            })
        }

        for (let i = 0 ; i < allPurchases.length; i++) {

            //AQUI DEVE SER FEITO UM FILTRO PARA NAO TEAR REPITIDOS E SOMAR A QUANTIDADE DE CADA PRODUTO

            const idPrato = allPurchases[i].fk_cardapio
            const produto = await Cardapio.findByPk(idPrato)

            switch(produto.tipo) {

                case "Prato":
                    filteredPurchases.pratos.push(produto)
                    break
                case "Bebidas":
                    filteredPurchases.bebidas.push(produto)
                    break
                case "Sobremesas":
                    filteredPurchases.sobremesas.push(produto)
                    break
            }

        }

        const totPurchases = allPurchases.length

        porcentPurchases.pratos = (filteredPurchases.length / totPurchases) * 100;
        porcentPurchases.bebidas = (filteredPurchases.length / totPurchases) * 100;
        porcentPurchases.sobremesas = (filteredPurchases.length / totPurchases) * 100;

        res.status(200).json({
            status: 'success',
            allPurchases,
            filteredPurchases,
            porcentPurchases
        })
    }

}

export default financeiroController

//rota -> baseURL/financeiro/getAll (precisa do token)
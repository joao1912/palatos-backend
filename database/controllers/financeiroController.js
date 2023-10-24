import Cardapio from "../models/Cardapio.js";
import Financeiro from "../models/Financeiro.js"

class financeiroController {

    async getAllPurchases(req, res) {

        const { idRestaurante } = req.body;

        if (!idRestaurante) {
            throw new Error("token ausente")
        }

        const allPurchases = await Financeiro.findAll({
            where: {
                fk_restaurante: idRestaurante
            }
        })

        const filteredPurchases = {
            pratos: 0,
            bebidas: 0,
            sobremesas: 0
        }

        const porcentPurchases = {
            pratos: 0,
            bebidas: 0,
            sobremesas: 0
        }

        if (!allPurchases) {
            res.status(200).json({
                status: 'success',
                allPurchases,
                filteredPurchases,
                porcentPurchases
            })
        }

        for (let i = 0 ; i < allPurchases.length; i++) {

            const idPrato = allPurchases[i].fk_cardapio
            const produto = await Cardapio.findByPk(idPrato)

            switch(produto.tipo) {

                case "Prato":
                    filteredPurchases.pratos += 1
                    break
                case "Bebidas":
                    filteredPurchases.bebidas += 1
                    break
                case "Sobremesas":
                    filteredPurchases.sobremesas += 1
                    break
            }

        }

        const totPurchases = allPurchases.length

        porcentPurchases.pratos = (filteredPurchases.pratos / totPurchases) * 100;
        porcentPurchases.bebidas = (filteredPurchases.bebidas / totPurchases) * 100;
        porcentPurchases.sobremesas = (filteredPurchases.sobremesas / totPurchases) * 100;

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
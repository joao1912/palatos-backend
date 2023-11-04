import Cardapio from "../models/Cardapio.js";
import Financeiro from "../models/Financeiro.js"
import { CustomError } from "../../Middlewares/erros.js";

class financeiroController {

    async getAllPurchases(req, res) {

        const { idRestaurante } = req.body;

        if (!idRestaurante) {
            throw new CustomError("Token Inválido", 401)
        }

        const allPurchases = await Financeiro.findAll({
            where: {
                fk_restaurante: idRestaurante
            }
        })

        const allProducts = []
        for (let i = 0; i < allPurchases.length; i++) {

            const product = await Cardapio.findByPk(allPurchases.fk_cardapio)

            let found = false;

            for (let obj of allProducts) {
                if (product.fk_cardapio === obj.fk_cardapio) {
                    obj.quantidade = (obj.quantidade || 0) + 1
                    found = true
                    break
                }
            }

            if (!found) {
                product.quantidade = 1;
                allProducts.push(product);
            }
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

        for (let i = 0; i < allProducts.length; i++) {

            const produto = allProducts[i]

            switch (produto.tipo) {

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
import Cardapio from "../models/Cardapio.js";

class cardapioController {

    async getCardapio(req, res) {

        const { idRestautante } = req.params;

        const menu = await Cardapio.findAll({
            where: {
                fk_restaurante: idRestautante
            }
        })

        if (menu) {

            res.status(200).json({
                status: "success",
                menu: menu
            })

        } else {
            throw new Error("Menu não pode ser encontrado")
        }
    }

    async createCardapio(req, res) {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAA")
        const foto = req.file;
        const {
            nome,
            descricao,
            preco
        } = req.body;
        const idRestautante = req.idRestaurante;
        console.log("teste1")
        console.log(idRestautante)
        if (idRestautante == null) {
            console.log("teste2")
            throw new Error("token inválido")
        }
        console.log("teste 3")
        const path = `http://45.224.129.126:8085/files/${foto.filename}`
       
        console.log("só pra ver né")
        const newProduct = {
            nome_produto: nome,
            preco: preco,
            descricao: descricao,
            foto: path,
            fk_restaurante: idRestautante
        }
        console.log("teste 4")
        console.log(newProduct)

        let produto

        try {
            console.log("teste 5")
            produto = await Cardapio.create(newProduct)
            console.log("teste 6")

        } catch (err) {

            console.log("teste 7")
            throw new Error("O servidor falhou em criar o menu.")
        }

        res.status(200).json({
            status: "success",
            message: "Menu criado com sucesso.",
            menu: produto
        })

    }

    async deleteCardapio(req,res) {

        const idPratos = req.body;

        for (let i = 0 ; i < idPratos.length ; i++) {

            await Cardapio.destroy({
                where: {
                    codigo: idPratos[i]
                }
            })

        }

        res.status(200).json({
            status: "success",
            message: "Pratos deletados"
        })
    }
}

export default cardapioController


import { json } from "sequelize";
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

        const fotos = req.files;
        const [produtos] = req.body;
        const idRestautante = req.idRestaurante;

        if (!idRestautante) {
            throw new Error("token inválido")
        }
        console.log("===============================")
        console.log("Fotos: "+JSON.stringify(fotos))
        console.log("===============================")
        console.log("Prodtos: "+ JSON.stringify(produtos))
        console.log("===============================")

        compareAndSetPath(produtos, fotos)

        console.log("===============================")
        console.log("NewProdtos: "+ JSON.stringify(produtos))
        console.log("===============================")

        const menu = []
        
        console.log(produtos.length)
        for (let i = 0; i < produtos.length ; i++) {
            console.log("teste")
            const newProduct = {
                nome_produto: produtos[i].nome,
                preco: Number(produtos[i].preco),
                descricao: produtos[i].descricao,
                foto: produtos[i].path,
                fk_restaurante: idRestautante
            }

            let product
            try {
                product = await Cardapio.create(newProduct)
                console.log(product)
            } catch(err) {
                console.log(err)
                throw new Error("O servidor falhou em criar o menu")
            }

            menu.push(product)
            
        }

        res.status(200).json({
            status: "success",
            message: "Menu criado com sucesso.",
            menu: menu
        })

    }

}

function compareAndSetPath(produtos, fotos) {

    for(let i = 0; i < produtos.length ; i++) {

        let imageNotExists = true;

        for (let j = 0; j < fotos.length; j++) {
            const nomeOriginal = fotos[j].originalname
            const indexPoint = nomeOriginal.indexOf(".")
            let nomeOrigialFiltrado

            if (indexPoint !== -1) {
                nomeOrigialFiltrado = nomeOriginal.slice(indexPoint)
            } else {
                nomeOrigialFiltrado = nomeOriginal
            }
            
            if (produtos[i].nomeImagem == nomeOrigialFiltrado) {
                imageNotExists = false
                produtos[i].path = `http://45.224.129.126:8085/files/${fotos[j].filename}`
            }

            if (fotos.length == (j + 1) && imageNotExists) {
                produtos[i].path = `http://45.224.129.126:8085/files/foto-padrao.png` //colocar aqui a foto padrão
            }
        }
    }
}

export default cardapioController


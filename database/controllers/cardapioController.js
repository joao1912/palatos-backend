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

        const foto = req.file;
        const {
            nome,
            descricao,
            preco
        } = req.body;
        const idRestautante = req.idRestaurante;

        if (!idRestautante) {
            throw new Error("token inválido")
        }

        const path = `http://45.224.129.126:8085/files/${foto.filename}`
       
        const newProduct = {
            nome_produto: nome,
            preco: preco,
            descricao: descricao,
            foto: path,
            fk_restaurante: idRestautante
        }

        let produto

        try {

            produto = await Cardapio.create(newProduct)

        } catch (err) {
            console.log(err)
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

function compareAndSetPath(produtos, fotos) {

    for(let prop in produtos) {

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

            const nomeImagem = produtos[prop].get('nomeImagem')
            
            if (nomeImagem == nomeOrigialFiltrado) {
                imageNotExists = false
                produtos[prop].append('path', )
            }

            if (fotos.length == (j + 1) && imageNotExists) {
                produtos[prop].append('path', `http://45.224.129.126:8085/files/foto-padrao.png`)  //colocar aqui a foto padrão
            }
        }
    }
}

export default cardapioController


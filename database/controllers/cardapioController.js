import Cardapio from "../models/Cardapio.js";
import { CustomError } from "../../Middlewares/erros.js";

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
            throw new CustomError("Menu não pode ser encontrado", 404)
        }
    }

     async getProdutoIndividual(req, res){
        const {codigo}=req.params 

        const produto= await Cardapio.findByPk(codigo)
        
        if(!produto){
           throw new CustomError("Produto não encontrado",404)
        }
         res.status(200).json({
            status:"success",
            produto:produto
         })

     }




    async createCardapio(req, res) {
        
        const foto = req.file;
        
        const {
            nome,
            descricao,
            preco,
            tipo
        } = req.body;

        const idRestautante = req.idRestaurante;
      
        if (idRestautante == null) {
            throw new CustomError("token inválido", 401)
        }
        
        const path = `http://45.224.129.126:8085/files/${foto.filename}`
        
        const newProduct = {
            nome_produto: nome,
            preco: preco,
            descricao: descricao,
            foto: path,
            tipo: tipo,
            fk_restaurante: idRestautante
        }
        
        let produto

        try {

            produto = await Cardapio.create(newProduct)
        
        } catch (err) {

            throw new CustomError("O servidor falhou em criar o menu.", 500)
        }

        res.status(200).json({
            status: "success",
            message: "Produto criado com sucesso.",
            produto: produto
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

    async editCardapio(req, res) {

        const {
            nome,
            descricao,
            preco,
            tipo
        } = req.body;

        const {id} = req.params;

        const image = req.file;

        try {
            
            const produto = await Cardapio.findByPk(id)

            await produto.update({
                nome_produto: nome,
                descricao: descricao,
                preco: preco,
                tipo: tipo
            })

            if (image) {

                await produto.update({
                    foto: `http://45.224.129.126:8085/files/${image.filename}`
                })

            }

            res.status(200).json({
                status: 'success',
                message: "Produto editado"
            })

        } catch (error) {
            
            throw new CustomError("O servidor falhou em editar o produto: " + error)

        }

    }
}

export default cardapioController


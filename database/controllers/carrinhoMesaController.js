import { CustomError } from "../../Middlewares/erros.js";
import ProdutoCarrinho from "../models/ProdutoCarrinho.js";

class CarrinhoMesaController {

    async addItem(req,res){
        const {observacoes,quantidade,idProduto,idMesa}=req.body

        try {
            await ProdutoCarrinho.create({
                observacoes,
                quantidade,
                fk_mesa:idMesa,
                fk_cardapio:idProduto
            })
        } catch (error) {
            throw new CustomError("O servidor falhou em adicionar o produto ao carrinho",500)
        }

        res.status(200).json({
            status:'success',
            message: 'Produto adicionado ao carrinho'
        })
    }

    async getAll(req,res){
        const{idMesa}=req.params

        const pratos= await ProdutoCarrinho.findAll({
            where:{
                fk_mesa:idMesa,
            }
        }) 

        res.status(200).json({
            status:'success',
            pratos
        })
    }

    async deleteItem(req,res){
        const{idMesa}=req.params
        const{idProduto}=req.body

        try {
            await ProdutoCarrinho.destroy({
                where:{
                    id:idProduto,
                    fk_mesa:idMesa
                }
            })
        } catch (error) {
            throw new CustomError("O servidor não conseguiu excluir o produto",500)
        }

        res.status(200).json({
            status:'success',
            message:'Produto removido do carrinho'
        })
    }

}

export default CarrinhoMesaController
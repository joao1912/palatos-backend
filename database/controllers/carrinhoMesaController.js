import { CustomError } from "../../Middlewares/erros.js";
import Cardapio from "../models/Cardapio.js";
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

        const carrinho=[]

        for(let obj of pratos){
            const produto = await Cardapio.findByPk(obj.fk_cardapio)
            const {nome_produto,preco}=produto
            obj.nome_produto=nome_produto
            obj.preco=preco
            carrinho.push(obj)
        }

        res.status(200).json({
            status:'success',
            carrinho
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
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
        let pratos

        try {
            pratos= await ProdutoCarrinho.findAll({
                where:{
                    fk_mesa:idMesa,
                }
            }) 
        } catch (error) {
            console.log(error)
        }

        const carrinho=[]

        for(let obj of pratos){
            const produto = await Cardapio.findByPk(obj.fk_cardapio)
            const {nome_produto,preco, codigo}=produto
            const objProd = {}

            objProd.nome_produto= nome_produto
            objProd.preco= preco
            objProd.id = codigo
            objProd.observacoes = obj.observacoes
            objProd.quantidade = obj.quantidade
            objProd.fk_restaurante = produto.fk_restaurante

            carrinho.push(objProd)
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
                    fk_cardapio:idProduto,
                    fk_mesa:idMesa
                }
            })
        } catch (error) {
            console.log(error)
            throw new CustomError("O servidor não conseguiu excluir o produto",500)
        }

        res.status(200).json({
            status:'success',
            message:'Produto removido do carrinho'
        })
    }

}

export default CarrinhoMesaController
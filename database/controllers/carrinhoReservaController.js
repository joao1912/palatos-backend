import { CustomError } from "../../Middlewares/erros"
import Cardapio from "../models/Cardapio"
import ReservaCarrinho from "../models/ReservaCarrinho"


class CarrinhoReservaController{
    async addItem(req,res){
        const {observacoes,quantidade,idProduto}=req.body
        const id=req.id

        try {
            
            await ReservaCarrinho.create({
                observacoes,
                quantidade,
                fk_cardapio:idProduto,
                fk_usuario:id
            })
        } catch (error) { 
            console.log(error)

            throw new CustomError(
                'O servidor falhou em adicionar o produto ao carrinho',
                500
            )
          
        }
       res.status(200).json({
        status: 'success',
        message:"Produto enviado ao carrinho"
       })
    }

    async getCarrinho(req,res){
        const id=req.params.id
        const carrinhoRes=await ReservaCarrinho.findAll({
            where:{
                fk_usuario:id
            }

        })

        const carrinho=[]

        for(let obj of carrinhoRes){
            const produto = await Cardapio.findByPk(obj.fk_cardapio)
            const {nome_produto,preco}=produto
            obj.nome_produto=nome_produto
            obj.preco=preco
            carrinho.push(obj)
        }

        res.status(200).json({status:'success', carrinho}) 
    }
}

export default CarrinhoReservaController
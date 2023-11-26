import { CustomError } from "../../Middlewares/erros.js"
import Cardapio from "../models/Cardapio.js"
import ReservaCarrinho from "../models/ReservaCarrinho.js"
import Restaurante from "../models/Restaurante.js"


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

        const idRest = req.params.idRestaurante
        const id = req.id

        let carrinhoRes

        try {
            carrinhoRes=await ReservaCarrinho.findAll({
                where:{
                    fk_usuario:id
                }
    
            })
        } catch (error) {
            console.log(error)
        }

        if (!carrinhoRes) {

            return res.status(200).json({status:'success', carrinho: []}) 

        }

        const carrinho=[]

        for(let obj of carrinhoRes){
            const produto = await Cardapio.findByPk(obj.fk_cardapio)

            const restauranteProduto = await Restaurante.findByPk(produto.fk_restaurante)
            
            if (restauranteProduto.id != idRest) {
                continue
            }
            
            const {nome_produto,preco}=produto
            obj.nome_produto=nome_produto
            obj.preco=preco
            console.log(obj)
            carrinho.push(obj)
        }

        res.status(200).json({status:'success', carrinho}) 
    }

    async deleteItem(req, res) {

        const {idItem} = req.params;
        const userId = req.id



        try {

            const item = ReservaCarrinho.findOne({
                where: {
                    fk_usuario: userId,
                    fk_cardapio: idItem
                }
            })

            if (!item) {
                throw new CustomError("O item não foi encontrado no carrinho", 404)
            }

            await ReservaCarrinho.destroy({
                where: {
                    fk_usuario: userId,
                    fk_cardapio: idItem
                }
            })


        } catch (error) {

            throw new CustomError("O servidor falhou em deletar o item", 500)
            
        }

        res.status(200).json({
            status: 'success',
            message: 'Item excluido do carrinho com sucesso.'
        })

    }
}

export default CarrinhoReservaController
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

}

export default CarrinhoMesaController
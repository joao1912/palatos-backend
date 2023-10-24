import { Sequelize } from "sequelize";
import database from "../database/db.js"
import Cardapio from "../database/models/Cardapio.js"
import Mesa from "../database/models/Mesa.js"
import ProdutoCarrinho from "../database/models/ProdutoCarrinho.js"
import PedidoReserva from "../database/models/PedidoReserva.js"
import Reserva from "../database/models/Reserva.js"
import Comanda from "../database/models/Comanda.js"

const userId = 10
const idRestaurante = 43

async function create_comandas() {
    const idPedidoReserva = 1

    let result = await Mesa.create({
        qr_code: "vich",
        ocupada: false,
        conta: 154.55,
        identificacao_mesa: "Mesa 90",
    })
console.log(result)

const idMesa = result.id

result = await ProdutoCarrinho.create({
    fk_cardapio: 3000,
    fk_mesa: idMesa,

})
console.log(result)

const idProdutoCarrinho = result.id

result = await Comanda.create({
    is_reserva: false,
    data_entrada: new Date().getTime() + 7,
    chegou: false,
    fk_produto_carrinho: idProdutoCarrinho,
    fk_pedido_reserva: idPedidoReserva
})


result = await Comanda.create({
    is_reserva: true,
    data_entrada: new Date().getTime() + 3,
    chegou: true,
    fk_produto_carrinho: idProdutoCarrinho,
    fk_pedido_reserva: idPedidoReserva
})



}


export default create_comandas
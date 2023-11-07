import { Sequelize } from "sequelize";
import database from "../database/db.js"
import Comanda from "../database/models/Comanda.js"
import Restaurante from "../database/models/Restaurante.js";
import ProdutoComanda from "../database/models/ProdutoComanda.js"

const userId = 10
const idRestaurante = 2

async function create_comandas() {


    let result = await Comanda.create({
        is_reserva: false,
        data_entrada: new Date().getTime() + 7,
        chegou: false,
    }, {
        logging: true
    })

    const idComanda = result.id

    console.log(`Id criado para comanda: ${result.id}`)

    result = await ProdutoComanda.create({
        fk_cardapio: 4,
        quantidade: 2,
        observacoes: "Bem fritinho!",
        fk_comanda: idComanda
    }, {
        logging: true
    })

    console.log(result)
}


export default create_comandas
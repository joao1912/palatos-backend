import { Sequelize } from "sequelize";
import database from "../database/db.js"
import Comanda from "../database/models/Comanda.js"
import Restaurante from "../database/models/Restaurante.js";
import ProdutoComanda from "../database/models/ProdutoComanda.js"

const userId = 10
const idRestaurante = 2

async function create_comandas() {


    const data_entrada = new Date().getTime() + 3

    let result = await Comanda.create({
        is_reserva: true,
        data_entrada: data_entrada,
        numeroMesa: 3,
    }, {
    })

    let idComanda = result.id

    if(!idComanda) {
        throw new Error("Não foi possível criar id para comanda")
    }

    result = await ProdutoComanda.create({
        quantidade: 2,
        observacoes: "Bem fritinho!",
        fk_cardapio: 4,
        fk_comanda: idComanda
    }, {
    })

//Criando outra

result = await Comanda.create({
    is_reserva: true,
    data_entrada: data_entrada,
}, {
})

idComanda = result.id

if(!idComanda) {
    throw new Error("Não foi possível criar id para comanda")
}

result = await ProdutoComanda.create({
    quantidade: 2,
    observacoes: "Bem fritinho!",
    fk_cardapio: 4,
    fk_comanda: idComanda
}, {
})

//Mais uma

result = await Comanda.create({
    is_reserva: false,
    data_entrada: data_entrada,
    numeroMesa: 2,
}, {
})

idComanda = result.id

if(!idComanda) {
    throw new Error("Não foi possível criar id para comanda")
}

result = await ProdutoComanda.create({
    quantidade: 1,
    observacoes: "Bem fritinho sim!",
    fk_cardapio: 3,
    fk_comanda: idComanda
}, {
})




}


export default create_comandas
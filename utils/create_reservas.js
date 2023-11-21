import database from "../database/db.js";
import Reserva from "../database/models/Reserva.js";

async function setReservas() {

    const result = await Reserva.create({
        cod: 5543,
        data_entrada: new Date().getTime() + 20,
        is_completed: false,
        fk_usuario: 10,
        fk_restaurante: 54,
})

    console.log(result? "Criado com sucesso": "Erro ao criar")
}

export default setReservas
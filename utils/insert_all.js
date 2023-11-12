import database from "../database/db.js";
import Usuario from "../database/models/Usuario.js";
import Contato from "../database/models/Contato.js";
import Restaurante from "../database/models/Restaurante.js";

async function insert_all() {

    await database.sync()

    let result = await Contato.create({
        telefone_fixo: "999999999",
        celular: "999999999",
    })
    const idContato = result.id

    result = await Usuario.create({
        nome_completo: "João",
        senha: "aaaaaaaa11122",
        email: "joao2@gmail.com",
        foto: "www.com.net",
        fk_contato: idContato
    })

    result = await Restaurante.create({
        nome: "Restaurante do João2",
        descricao: "Restaurante do João",
        foto: "www.com.net",
        plano: 1,
        endereco: "Rua do João",
        rua: "João",
        cep: "99999-99",
        fk_contato: idContato,
        fk_usuario: 1,

    })



    

}

insert_all()
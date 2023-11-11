import database from "../database/db.js";
import Categorias from "../models/Categorias.js";
import ListaCategorias from "../models/ListaCategorias.js";

async function acign_categorias() {

    const lista = await Categorias.findAll()

    if(!lista) {
        throw new Error("Erro ao listar categorias do banco")
    }

    let result = await ListaCategorias.create({
        fk_restaurante: 1,
        fk_categoria: lista[0].id
    })
    if(result) {
        console.log("Categoria criada")
    }

    result = await ListaCategorias.create({
        fk_restaurante: 1,
        fk_categoria: lista[2].id
    })
    if(result) {
        console.log("Categoria criada")
    }


}

export default acygn_categorias
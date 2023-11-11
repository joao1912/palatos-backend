import database from "../database/db.js";
import Categoria from "../models/Categoria.js";
import ListaCategoria from "../models/ListaCategorias.js";

async function acign_categorias() {

    const lista = await Categoria.findAll()

    if(!lista) {
        throw new Error("Erro ao listar categorias do banco")
    }

    let result = await ListaCategoria.create({
        fk_restaurante: 1,
        fk_categoria: lista[0].id
    })
    if(result) {
        console.log("Categoria criada")
    }

    result = await ListaCategoria.create({
        fk_restaurante: 1,
        fk_categoria: lista[2].id
    })
    if(result) {
        console.log("Categoria criada")
    }


}

export default acygn_categorias
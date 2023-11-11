import database from "../database/db.js";
import Categoria from "../database/models/Categoria.js";

async function setCategorias() {

    Categoria.create({
        nome: "Massas"
    })

    Categoria.create({
        nome: "Doces"
    })

    Categoria.create({
        nome: "Pizzas"
    })

    Categoria.create({
        nome: "Carnes"
    })

    Categoria.create({
        nome: "Vegetariano"
    })

    Categoria.create({
        nome: "Sopas"
    })

    Categoria.create({
        nome: "Frutos do mar"
    })

    Categoria.create({
        nome: "Saladas"
    })

    Categoria.create({
        nome: "Sanduíches"
    })

}

export default setCategorias
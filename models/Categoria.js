import { DataTypes } from "sequelize"
import Sequelize from "sequelize"

import database from "../db.js"

import ListaCategoria from './listaCategoria.js'

class Categoria extends Sequelize.Model { }


Categoria.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING(25)
        }
    },
    {
        database,
        timestamps: false,
        modelName: "Categoria",
        tableName: "Categorias"
    }
)

Categoria.belongsToMany(
    ListaCategoria,
    {
        through: 'Lista_categoria'
    }
)

export default Categoria
const { DataTypes } = require("sequelize")
const Sequelize = require("sequelize")

import sequelize from "../db"

import ListaCategoria from './ListaCategoria'

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
        sequelize,
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
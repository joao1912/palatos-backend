const { DataTypes } = require("sequelize")
const Sequelize = require("sequelize")

import sequelize from "../db.js"
import Categoria from "./Categoria.js"

class ListaCategoria extends Sequelize.Model { }

ListaCategoria.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: false,
            autoIncrement: true
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: "ListaCategoria",
        tableName: "Lista_categorias"
    }
)

ListaCategoria.belongsToMany(
    Categoria,
    {
        through: 'categoria'
    }
)


export default ListaCategoria
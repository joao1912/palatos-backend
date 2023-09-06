import { DataTypes } from "sequelize"
import Sequelize from "sequelize"

import database from "../db.js"
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
        sequelize: database,
        timestamps: false,
        modelName: "ListaCategoria",
        tableName: "Lista_categorias"
    }
)


export default ListaCategoria
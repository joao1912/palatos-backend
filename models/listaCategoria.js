const {DataTypes} = require("sequelize")
const Sequelize = require("sequelize")

import sequelize from "../db"

class listaCategoria extends Sequelize.Model { }

listaCategoria.init(
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

export default listaCategoria
const { DataTypes} = require("sequelize")
const Sequelize = require("sequelize")

import sequelize from "../db"

class Categoria extends Sequelize.Model{ }


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

export default Categoria
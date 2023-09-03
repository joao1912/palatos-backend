const { DataTypes } = require("sequelize")
const Sequelize = require("sequelize")
import sequelize from "../db"
import Usuario from "./Usuario"

class Favorito extends Sequelize.Model {}

Favorito.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: "Favoritos",
        tableName: "Favoritos"
    }
)

Favorito.belongsTo( Usuario, {
    constraints: true,
    foreignKey: "fk_usuario"
})

Favorito.belongsTo( Restaurante, {
    constraints: true,
    foreignKey: "fk_restaurante"
})

export default Favorito
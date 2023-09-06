import { DataTypes } from "sequelize"
import Sequelize from "sequelize"
import database from "../db"
import Usuario from "./Usuario"
import Restaurante from "./Restaurante"

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
        database,
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
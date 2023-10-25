import { DataTypes } from "sequelize"
import Sequelize from "sequelize"
import database from "../db.js"
import Usuario from "./Usuario.js"
import Restaurante from "./Restaurante.js"

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
        sequelize: database,
        timestamps: false,
        modelName: "Favoritos",
        tableName: "Favoritos"
    }
)

Favorito.belongsTo( Usuario, {
    constraints: true,
    foreignKey: "fk_usuario"
})

Favorito.hasOne( Restaurante, {
    constraints: true,
    foreignKey: "fk_restaurante"
})


export default Favorito
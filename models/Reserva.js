import { DataTypes } from "sequelize"
import Sequelize from "sequelize"
import database from "../db"
import Usuario from "./Usuario"

class Reserva extends Sequelize.Model {}

Reserva.init(
    {
        cod: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
            data_entrada: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        database,
        modelName: "Reserva",
        tableName: "Reservas"
    }
)

Reserva.belongsTo( Usuario, {
    constraints: true,
    foreignKey: "fk_usuario"
})


export default Reserva
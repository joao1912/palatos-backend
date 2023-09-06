const { DataTypes } = require("sequelize")
const Sequelize = require("sequelize")
import sequelize from "../db"
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
        sequelize,
        modelName: "Reserva",
        tableName: "Reservas"
    }
)

Reserva.belongsTo( Usuario, {
    constraints: true,
    foreignKey: "fk_usuario"
})


export default Reserva
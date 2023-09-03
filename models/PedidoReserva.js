const { DataTypes } = require("sequelize")
const Sequelize = require("sequelize")
import sequelize from "../db"
import Cardapio from "./Cardapio"
import Reserva from "./Reserva"

class PedidoReserva extends Sequelize.Model {}

PedidoReserva.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
    },
    {
        sequelize,
        modelName: "PedidoReserva",
        tableName: "Pedidos_reserva"
    }
)

PedidoReserva.belongsTo( Reserva , {
    constraints: true,
    foreignKey: "fk_reserva"
})

PedidoReserva.belongsTo( Cardapio ,{
    constraints: true,
    foreignKey: "fk_cardapio"
})

export default PedidoReserva
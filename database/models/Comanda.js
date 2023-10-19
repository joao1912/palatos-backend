import { DataTypes } from "sequelize";
import Sequelize from "sequelize";
import database from "../db";
import ProdutoCarrinho from "./ProdutoCarrinho"
import PedidoReserva from "./PedidoReserva"

class Comanda extends Sequelize.Model { }

Comanda.init({
    is_reserva: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    data_entrada: {
        type: DataTypes.DATE,
        allowNull: false
    },
    chegou: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize: database,
    timestamps: false,
    modelName: "Comandas",
    tableName: "Comandas"
}
)


Comanda.belongsTo(ProdutoCarrinho, {
    constraints: true,
    foreignKey: "fk_produto_carrinho",
})

Comanda.belongsTo(PedidoReserva, {
    constraints: true,
    foreignKey: "fk_pedido_reserva"
})

export default Comanda
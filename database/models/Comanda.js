import { DataTypes } from "sequelize";
import Sequelize from "sequelize";
import database from "../db.js";
import ProdutoCarrinho from "./ProdutoCarrinho.js"
import PedidoReserva from "./PedidoReserva.js"
import Financeiro from "./Financeiro.js";

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
    },
}, {
    sequelize: database,
    timestamps: false,
    modelName: "Comandas",
    tableName: "Comandas"
}
)

// Comanda.hasMany(Financeiro, {
//     constraints: true,
//     foreignKey: "fk_comanda"
// })




export default Comanda
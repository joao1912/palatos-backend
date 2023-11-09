import { DataTypes } from "sequelize";
import Sequelize from "sequelize";
import database from "../db.js";
import ProdutoComanda from "./ProdutoComanda.js"

class Comanda extends Sequelize.Model { }

Comanda.init({
    is_reserva: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    data_entrada: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
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


export default Comanda
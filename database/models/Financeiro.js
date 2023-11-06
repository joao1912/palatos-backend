import { DataTypes } from "sequelize"
import Sequelize from "sequelize"
import database from "../db.js"
import Usuario from "./Usuario.js"
import Cardapio from "./Cardapio.js"
import Restaurante from "./Restaurante.js"
import Comanda from "./Comanda.js"


class Financeiro extends Sequelize.Model { }

Financeiro.init(
    {

        data_compra: {
            type: DataTypes.DATE,
            allowNull:false,
        },


    },
    {
        sequelize:database,
        modelName: "Financeiro",
        tableName: "Financeiros"
    }
)

Financeiro.belongsTo(
    Usuario,
    {
        constraints: true,
        foreignKey:'fk_usuario'
    }
)
Financeiro.belongsTo(
    Cardapio,
    {
        constraints: true,
        foreignKey:'fk_cardapio'
    }
)
Financeiro.belongsTo(
    Restaurante,
    {
        constraints: true,
        foreignKey:'fk_restaurante'
    }
)

export default Financeiro



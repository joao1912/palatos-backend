import database from "../db.js";
import { DataTypes } from "sequelize";
import Sequelize from "sequelize";
import PedidoReserva from "./PedidoReserva.js";
import Cardapio from "./Cardapio.js";
import Usuario from "./Usuario.js";

class ReservaCarrinho extends Sequelize.Model{}

ReservaCarrinho.init(
    {
       
        observacoes:{
            type:DataTypes.STRING,
            defaultValue: "",
        },
        quantidade:{
            type:DataTypes.INTEGER,
            defaultValue:1,
        }
    },
    {
        sequelize: database,
        modelName: "ReservaCarrinho",
        tableName: "Reservas_carrinho"
    }
)
PedidoReserva.belongsTo( Cardapio ,{
    constraints: true,
    foreignKey: "fk_cardapio"
})

PedidoReserva.belongsTo( Usuario , {
    constraints: true,
    foreignKey: "fk_usuario"
})

export default ReservaCarrinho ;
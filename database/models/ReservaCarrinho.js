import database from "../db.js";
import { DataTypes } from "sequelize";
import Sequelize from "sequelize";
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
ReservaCarrinho.belongsTo( Cardapio ,{
    constraints: true,
    foreignKey: "fk_cardapio"
})

ReservaCarrinho.belongsTo( Usuario , {
    constraints: true,
    foreignKey: "fk_usuario"
})

export default ReservaCarrinho ;
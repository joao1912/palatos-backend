import { DataTypes } from "sequelize"
import Sequelize from "sequelize"
import database from "../db"
import Usuario from "./Usuario"

class Avaliacao extends Sequelize.Model {}

Avaliacao.init(
    {
        quant_estrelas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        data: {
            type: DataTypes.DATE
        },
        cod_restaurante: {
            type: DataTypes.INTEGER
        },
        cod_produto: {
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize: database,
        modelName: "Avaliacao",
        tableName: "Avaliacoes"
    }
)

Avaliacao.belongsTo( Usuario , {
    constraints: true,
    foreignKey: "fk_usuario"
})


export default Avaliacao
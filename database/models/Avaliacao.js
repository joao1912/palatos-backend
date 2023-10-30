import { DataTypes } from "sequelize"
import Sequelize from "sequelize"
import database from "../db.js"
import Usuario from "./Usuario.js"
import Restaurante from "./Restaurante.js"

class Avaliacao extends Sequelize.Model {}

Avaliacao.init(
    {
        quant_estrelas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        data: {
            type: DataTypes.DATE
        }
    },
    {
        sequelize: database,
        modelName: "Avaliacao",
        tableName: "Avaliacoes"
    }
)

Avaliacao.belongsTo(Restaurante, {
    constraints: true,
    foreignKey: "fk_restaurante"
})

Avaliacao.belongsTo( Usuario , {
    constraints: true,
    foreignKey: "fk_usuario"
})


export default Avaliacao
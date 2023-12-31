import { DataTypes } from "sequelize"
import Sequelize from "sequelize"
import database from "../db.js"
import Restaurante from "./Restaurante.js"

class ConfiguracoesRestaurantes extends Sequelize.Model {}

ConfiguracoesRestaurantes.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        reservas_ativas: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        tempo_tolerancia: {
            type: DataTypes.DECIMAL
        },
},
    {
        sequelize: database,
        timestamps: false,
        modelName: "ConfiguracoesRestaurante",
        tableName: "Configuracoes_restaurantes"
    }
)

ConfiguracoesRestaurantes.belongsTo( Restaurante, {
    constraints: true,
    foreignKey: "fk_restaurante"
})


export default ConfiguracoesRestaurantes
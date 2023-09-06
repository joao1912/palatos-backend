import { DataTypes } from "sequelize"
import Sequelize from "sequelize"
import database from "../db"
import Restaurante from "./Restaurante"

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
        },
        tempo_Tolerancia: {
            type: DataTypes.DECIMAL
        },
        avaliacao_comida: {
            type: DataTypes.BOOLEAN
        }
},
    {
        database,
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
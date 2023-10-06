import { DataTypes } from "sequelize"
import Sequelize from "sequelize"
import database from "../db.js"
import Restaurante from "./Restaurante.js"

class Cardapio extends Sequelize.Model {}

Cardapio.init(
    {
        codigo: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        foto: {
            type: DataTypes.STRING,
        },
        nome_produto: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        preco: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            defaultValue: 0.00
        },
        descricao: {
            type: DataTypes.TEXT,
        },
        avaliacao: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        foto: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize: database,
        modelName: "Cardapio",
        tableName: "Cardapios"
    }
)

Cardapio.belongsTo( Restaurante ,{
    constraints: true,
    foreignKey: "fk_restaurante"
})


export default Cardapio
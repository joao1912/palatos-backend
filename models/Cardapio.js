const { DataTypes } = require("sequelize")
const Sequelize = require("sequelize")
import sequelize from "../db"
import Restaurante from "./Restaurante"

class Cardapio extends Sequelize.Model {}

Cardapio.init(
    {
        codigo: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
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
        }
    },
    {
        sequelize,
        modelName: "Cardapio",
        tableName: "Cardapios"
    }
)

Cardapio.belongsTo( Restaurante ,{
    constraints: true,
    foreignKey: "fk_restaurante"
})


export default Cardapio
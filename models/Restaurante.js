import { DataTypes } from "sequelize"
import Sequelize from "sequelize"
import database from "../db"

class Restaurante extends Sequelize.Model {}

Restaurante.init(
    {
        nome: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        descricao: {
            type: DataTypes.TEXT,
        },
        foto: {
            type: DataTypes.TEXT,
            defaultValue: "https://caminho-imagem.com"
        },
        plano: {
            type: DataTypes.INTEGER
        },
        endereco: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        cep: {
            type: DataTypes.STRING(10),
        },
        rua: {
            type: DataTypes.STRING(35),
        }
    },
    {
        database,
        modelName: 'Restaurante',
        tableName: 'Restaurantes'
    }
)

export default Restaurante
import { DataTypes } from "sequelize"
import Sequelize from "sequelize"
import database from "../db.js"
import ListaCategoria from "./listaCategoria.js"
import Categoria from "./Categoria.js"

class Restaurante extends Sequelize.Model { }

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
        sequelize: database,
        modelName: 'Restaurante',
        tableName: 'Restaurantes'
    }
)

Restaurante.belongsToMany(
    Categoria,
    {
        through: {
            model: ListaCategoria
        },
        foreignKey: "fk_categoria",
        constraints: true
    }
)

Categoria.belongsToMany(Restaurante,{
    through: {
        model: ListaCategoria
    },
    foreignKey: "fk_restaurante",
    constraints: true
})

export default Restaurante
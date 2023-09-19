import { DataTypes } from "sequelize"
import Sequelize from "sequelize"
import database from "../db.js"
import ListaCategoria from './listaCategoria.js'
import Restaurante from "./Restaurante.js"

class Categoria extends Sequelize.Model { }


Categoria.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING(25)
        }
    },
    {
        sequelize: database,
        timestamps: false,
        modelName: "Categoria",
        tableName: "Categorias"
    }
)

// relacionamento muitos pra muitos

Categoria.belongsToMany(Restaurante, {
    through: {
        model: ListaCategoria,
    },
    foreignKey: "fk_restaurante",
    constraints: true
})

Restaurante.belongsToMany(Categoria, {
    through: {
        model: ListaCategoria,
    },
    foreignKey: "fk_categoria",
    constraints: true
})

export default Categoria
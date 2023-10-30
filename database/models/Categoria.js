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

export default Categoria
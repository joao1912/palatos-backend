import { DataTypes } from "sequelize"
import Sequelize from "sequelize"
import database from "../db.js"


class ListaCategoria extends Sequelize.Model { }

ListaCategoria.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fk_restaurante: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Restaurantes",
                id: 'id'
            }
        },
        fk_categoria: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Categorias",
                id: 'id'
            }
        }
    },
    {
        sequelize: database,
        timestamps: false,
        modelName: "ListaCategoria",
        tableName: "Lista_categorias"
    }
)


export default ListaCategoria
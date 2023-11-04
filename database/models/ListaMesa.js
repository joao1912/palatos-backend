import { DataTypes } from "sequelize"
import Sequelize from "sequelize"
import database from "../db.js"
import Mesa from "./Mesa"
import Restaurante from "./Restaurante.js"


class ListaMesa extends Sequelize.Model { }

ListaMesa.init(

    {
        id:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        }
    },
    {
        sequelize:database,
        modelName: "ListaMesa",
        tableName: "Lista_mesas",
    },   
)

ListaMesa.belongsTo(
    Restaurante,
    {
        constraints: true,
        foreignKey:'fk_restaurante'
    }
)

Restaurante.belongsToMany(
    Mesa,
    {
        through:{
            model:ListaMesa
        },
        constraints: true,
        foreignKey:'fk_mesa'
    }
)

export default ListaMesa


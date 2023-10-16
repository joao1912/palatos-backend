import { DataTypes } from "sequelize"
import Sequelize from "sequelize"
import database from "../db.js"


class Mesa extends Sequelize.Model { }

Mesa.init(

{
    qr_code: {
        type: DataTypes.TEXT,
        allowNull:false,
    },

    ocupada:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
    },

    conta:{
        type: DataTypes.DECIMAL,
        allowNull:false,
    },
    identificacao_mesa:{
        type: DataTypes.STRING(10),
    }
},

{
    sequelize:database,
    modelName: "Mesa",
    tableName: "Mesas",
}
)

export default Mesa;



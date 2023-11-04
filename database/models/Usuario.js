import { DataTypes } from "sequelize"
import Sequelize from "sequelize"
import database from '../db.js';

class Usuario extends Sequelize.Model {}

Usuario.init(
    {
        nome_completo: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        foto:{
            type: DataTypes.STRING,
            allowNull:false
        }

    },
    {
        sequelize: database,
        modelName: "Usuario",
        tableName: "Usuarios"  
    }
)

export default Usuario
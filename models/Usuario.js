import { DataTypes } from "sequelize"
import Sequelize from "sequelize"
import database from '../db';

class Usuario extends Sequelize.Model {}

Usuario.init(
    {
        nome_completo: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        senha: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(40),
            allowNull: false
        } 
    },
    {
        sequelize: database,
      modelName: "Usuario",
      tableName: "Usuarios"  
    }
)

export default Usuario
const { DataTypes } = require('sequelize');
const Sequelize = require("sequelize")
import sequelize from '../db';

class Usuario extends Sequelize.Model {}

Usuario.init(
    {
        nome_completo: {
            type: DataTypes.STRING(40),
            allowNull: false,
            defaultValue: ""
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
      sequelize,
      modelName: "Usuario",
      tableName: "Usuarios"  
    }
)

export default Usuario
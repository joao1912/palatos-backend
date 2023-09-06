const { DataTypes, Sequelize} = require("sequelize")

import sequelize from "../db"
import Usuario from './Usuario'

class Contato extends Sequelize.Model{ }

Contato.init(
    {
        id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
        },
        telefone_fixo: {
            type: DataTypes.STRING(16)
        },
        celular: {
            type: DataTypes.STRING(16)
        },
        is_whatsapp: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: "Contato",
        tableName: "Contatos"
    }
)

Contato.belongsTo(Usuario, {
    constraints: true,
    foreignKey: "fk_usuario"
})

export default Contato
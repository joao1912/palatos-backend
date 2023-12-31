import { DataTypes } from "sequelize"
import Sequelize from "sequelize"

import database from "../db.js"
import Usuario from './Usuario.js'

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
            type: DataTypes.STRING(16),
            allowNull: false
        },
    },
    {
        sequelize: database,
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
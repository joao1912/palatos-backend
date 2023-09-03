const { DataTypes } = require('sequelize');
import sequelize from '../db';

const Usuario = sequelize.define("Usuario", {
    //construir a tabela
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
    }, {
    timestamps: false
})

export default Usuario
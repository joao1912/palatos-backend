const { DataTypes } = require('sequelize');
import sequelize from '../db';

const Usuarios = sequelize.define("Usuarios", {
    //construir a tabela
    nome: {
        type: DataTypes.STRING(40),
        allowNull: false,
        defaultValue: "João lindo"
    }
})

export default Usuarios
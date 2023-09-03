const { DataTypes } = require("sequelize")
const Sequelize = require("sequelize")
import sequelize from "../db"
import Usuarios from "./Usuario"

class Acesso extends Sequelize.Model {}

Acesso.init(
    {
        data_acesso: {
            type: DataTypes.DATE
        }  
    },
    {
        sequelize,
        timestamps: false,
        modelName: "Acesso",
        tableName: "Acessos"
    }
)

Acesso.belongsTo( ListaCategorias, {
    constraints: true,
    foreignKey: 'fk_lista_categorias'
})

Acesso.belongsTo( Usuarios , {
    constraints: true,
    foreignKey: 'fk_usuario'
})

export default Acesso
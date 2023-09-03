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

const Acessos = sequelize.define("Acessos", {
    
}, {})


Acessos.belongsTo( ListaCategorias, {
    constraints: true,
    foreignKey: 'fk_lista_categorias'
})

Acessos.belongsTo( Usuarios , {
    constraints: true,
    foreignKey: 'fk_usuario'
})

export default Acessos
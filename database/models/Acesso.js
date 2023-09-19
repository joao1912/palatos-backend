import { DataTypes} from "sequelize"
import Sequelize from "sequelize"
import database from "../db.js"
import Usuarios from "./Usuario.js"
import ListaCategoria from "./listaCategoria.js"

class Acesso extends Sequelize.Model {}

Acesso.init(
    {
        data_acesso: {
            type: DataTypes.DATE
        }  
    },
    {
        sequelize: database,
        timestamps: false,
        modelName: "Acesso",
        tableName: "Acessos"
    }
)

Acesso.belongsTo( ListaCategoria, {
    constraints: true,
    foreignKey: 'fk_lista_categorias'
})

Acesso.belongsTo( Usuarios , {
    constraints: true,
    foreignKey: 'fk_usuario'
})

export default Acesso
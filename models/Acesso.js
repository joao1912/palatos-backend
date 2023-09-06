import { DataTypes} from "sequelize"
import Sequelize from "sequelize"
import database from "../db"
import Usuarios from "./Usuario"
import ListaCategoria from "./listaCategoria"

class Acesso extends Sequelize.Model {}

Acesso.init(
    {
        data_acesso: {
            type: DataTypes.DATE
        }  
    },
    {
        database,
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
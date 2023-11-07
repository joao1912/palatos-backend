import { DataTypes } from "sequelize";
import Sequelize from "sequelize";
import database from "../db.js";
import Comanda from "./Comanda.js";
import Cardapio from "./Cardapio.js";

class ProdutoComanda extends Sequelize.Model {

}
ProdutoComanda.init({
    observacoes: {
        type: DataTypes.STRING
    },
    quantidade: {
        type: DataTypes.INTEGER
    },

}, {
    sequelize: database,
    modelName: "ProdutoComanda",
    tableName: "Produto_comanda"
}
)


export default ProdutoComanda
import { DataTypes } from "sequelize"
import Sequelize from "sequelize"
import database from "../db.js"
import Cardapio from "./Cardapio.js"
import Mesa from "./Mesa.js"


class ProdutoCarrinho extends Sequelize.Model { }

ProdutoCarrinho.init({
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    }, 

},
{
    sequelize:database,
    modelName: "ProdutoCarrinho",
    tableName: "Produtos_carrinho",
},   
)
ProdutoCarrinho.belongsTo(
    Cardapio,
    {
        constraints: true,
        foreignKey:'fk_cardapio'
    }
)

ProdutoCarrinho.belongsTo(
    Mesa,
    {
        constraints: true,
        foreignKey:'fk_mesa'
    }
)



export default ProdutoCarrinho


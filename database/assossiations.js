import Comanda from "./models/Comanda.js"
import ProdutoComanda from "./models/ProdutoComanda.js"
import Cardapio from "./models/Cardapio.js"

ProdutoComanda.belongsTo(Comanda,
    {
        constraints: true,
        foreignKey: "fk_comanda"
    }
)

ProdutoComanda.belongsTo(Cardapio,
    {
        constraints: true,
        foreignKey: "fk_cardapio"
    }
)


Comanda.hasMany(ProdutoComanda, {
    constraints: true,
    foreignKey: "fk_comanda"
})

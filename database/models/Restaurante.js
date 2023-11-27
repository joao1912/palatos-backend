import { DataTypes } from "sequelize"
import Sequelize from "sequelize"
import database from "../db.js"
import ListaCategoria from "./listaCategoria.js"
import Categoria from "./Categoria.js"
import Contato from "./Contato.js"
import Usuario from "./Usuario.js"

class Restaurante extends Sequelize.Model { }

Restaurante.init(
    {
        nome: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        descricao: {
            type: DataTypes.TEXT,
        },
        foto: {
            type: DataTypes.TEXT,
            defaultValue: "http://45.224.129.126:8085/files/1700623512130-fotoRestaurante.png"
        },
        plano: {
            type: DataTypes.INTEGER
        },
        endereco: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        cep: {
            type: DataTypes.STRING(10),
        },
        rua: {
            type: DataTypes.STRING(35),
        }
    },
    {
        sequelize: database,
        modelName: 'Restaurante',
        tableName: 'Restaurantes'
    }
)

Restaurante.belongsTo(Contato, {
    constraints: true,
    foreignKey: "fk_contato"
})

Restaurante.belongsTo(Usuario, {
    constraints: true,
    foreignKey: "fk_usuario"
})

Restaurante.belongsToMany(
    Categoria,
    {
        through: ListaCategoria,
        foreignKey: "fk_restaurante",
        otherKey: "fk_categoria",
        constraints: true
    }
)

Categoria.belongsToMany(Restaurante,{
    through: ListaCategoria,
    foreignKey: "fk_categoria",
    otherKey: "fk_restaurante",
    constraints: true
})

export default Restaurante
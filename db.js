import Sequelize from "sequelize"
import dotenv from "dotenv"
const env = dotenv.config().parsed

const database = new Sequelize({
    dialect: env.DB_DRIVE,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})


/*
    olá, estou criando essa parte do codigo para revisão do sequelize

    alguns métodos interessantes!!!

    users == tabela dos usuarios

    users.create({}) => Cria um usuario no banco de dados

    user.set({nome: "Dalison"}) => altera os dados, mas NÃO altera no banco, use user.save() para salvar as alterações no banco

    user.destroy() => apaga um dado do banco de dados

    users.destroy({where: {id: 3}}) => busca e apaga um dado do banco de dados

    const everyUsers = await users.findAll() => buscar todos os usuarios

    users.findAll({ => usando where na busca
        where: {
            id: 2,
            nome: "joão"
        }
    });

    OPERADORES SEQUELIZE são cabulosos, tem que ver a documentação, eles estão no tópico 'consulta de modelos - noções básicas': https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
    
*/

export default database
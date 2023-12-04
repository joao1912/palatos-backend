import Sequelize from "sequelize"
import dotenv from "dotenv"
export const env = dotenv.config().parsed

const database = new Sequelize({
    dialect: env.DB_DRIVE,
    host: env.DB_HOST,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    logging: false
})

export default database
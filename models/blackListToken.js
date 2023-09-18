import { DataTypes } from "sequelize" 
import Sequelize from "sequelize"
import database from "../db"

class BlackListToken extends Sequelize.Model {}

BlackListToken.init(
    {
        refreshToken: {
            type: DataTypes.STRING,
            unique: true
        }
    },
    {
        sequelize: database,
        modelName: "BlackListToken",
        tableName: "Black-list-tokens",
        timestamps: false
    }
)

export default BlackListToken
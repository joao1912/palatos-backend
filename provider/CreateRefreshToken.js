import { sign } from "jsonwebtoken"
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../index.js"
import BlackListToken from "../database/models/BlackListToken.js"

// usar essa class quando o user tiver um tokenAccess expirado
class CreateRefreshToken {

    async execute(userId, oldFefreshToken) {

        //verificar se o token ainda é valido
        const atual = Date.now()
        if (atual > jwt.decode(oldFefreshToken).expiresIn) {
            console.log("teste")
        }
        
        if (userId) {

            if (oldFefreshToken) {
                await BlackListToken.destroy({
                    where: {
                        refreshToken: oldFefreshToken
                    }
                })
            }

            const refreshToken = sign({userId}, SECRET_KEY, {
                expiresIn: 2592000000 // 30 dias
            }) 

            const tokenAccess = sign({userId: userId}, SECRET_KEY, {expiresIn:3600000})

            return {tokenAccess, refreshToken}
        }
        
        return null

    }
}

export {CreateRefreshToken}
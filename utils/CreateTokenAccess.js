import { sign } from "jsonwebtoken"
import { SECRET_KEY } from "../index.js"

import { CreateRefreshToken } from "../provider/createRefreshToken.js"
const createRefreshToken = new CreateRefreshToken()

//usar essa class somente no LOGIN do usuario
class CreateTokenAccess {

    async execute(userId) {

        if (userId) {
            const token = sign({userId: userId}, SECRET_KEY, {expiresIn: 604800000 }) // 7 dias
            const refreshToken = createRefreshToken.execute(userId)

            return {token, refreshToken}
        }
        
        return null
    }
}

export {CreateTokenAccess}
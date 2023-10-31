import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../index.js"

class AuthToken {

    async execute(req, res, next) {
        const tokenNotFilter = req.header("Authorization")
        
        if (!tokenNotFilter) {
            throw new Error("Token ausente", 401)
        }

        const token = cutBearer(tokenNotFilter)
        
        jwt.verify(token, SECRET_KEY, async (err, decode) => {
            if (err) {
                throw new Error("invalid token")
            }

            req.id = decode.userId

            if (decode.idRestaurante) {
                req.idRestaurante = decode.idRestaurante; 
            }
            console.log("ue")
            next()
        })   
    }

}

function cutBearer(token) {

    const containOrNot = token.lastIndexOf("Bearer")

    if (containOrNot !== -1) {
        const newToken = token.substring(7)
        return newToken
    }

    return token
    
}

export default AuthToken 
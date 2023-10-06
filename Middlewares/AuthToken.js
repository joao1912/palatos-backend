import { verify } from "jsonwebtoken"
import { SECRET_KEY } from "../index.js"

class AuthToken {

    async execute(req, res, next) {
        const token = req.header("Authorization")

        if (!token) {
            throw new Error("Token ausente")
        }
        
        verify(token, SECRET_KEY, async (err, decode) => {
            if (err) {
                throw new Error("invalid token")
            }

            req.id = decode.userId

            if (decode.idRestaurante) {
                req.idRestaurante = decode.idRestaurante; 
            }
            
            next()
        })   
    }

}

export {AuthToken} 
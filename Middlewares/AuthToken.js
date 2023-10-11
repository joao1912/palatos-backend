import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../index.js"

class AuthToken {

    async execute(req, res, next) {
        const token = req.header("Authorization")
        console.log(token)
        if (!token) {
            throw new Error("Token ausente")
        }
        
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

export default AuthToken 
import { verify } from "jsonwebtoken"
import { SECRET_KEY } from "../index.js"

class AuthToken {

    async execute(req, res, next) {
        const token = req.header("Authorization")

        if (!token) {
            res.status(401).json({
                status: 'failed',
                erro: "Token ausente"
            })
        }
        
        verify(token, SECRET_KEY, async (err, decode) => {
            if (err) return res.status(401)

            req.id = decode.userId
            next()
        })   
    }

}

export {AuthToken} 
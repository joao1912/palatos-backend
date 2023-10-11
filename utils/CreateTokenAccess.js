import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { SECRET_KEY } from "../index.js"

class CreateTokenAccess {

    async execute(userId, idRestaurante) {

        if (userId && idRestaurante) {
            const token = sign({userId: userId, idRestaurante: idRestaurante}, SECRET_KEY, {expiresIn: 604800000 }) // 7 dias

            return token
        } else if (userId) {
            const token = sign({userId: userId}, SECRET_KEY, {expiresIn: 604800000 }) // 7 dias

            return token
        }
        
        return null
    }
}

export {CreateTokenAccess}
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../index.js"

class userController {

    async getUser(req, res) {
        //retornar os usuarios
        res.send("Olha que lindo!")
    }

    async createUser(req, res) {
        //cria e retora no user
    }

    async login(req, res) {
        //verificar se o usuario ja existe no banco

        const token = jwt.sign({userId: req.body.id}, SECRET_KEY, {expiresIn:300}) // 300 === 5 min
        res.status(200).json({
            status: 'success',
            message: "Logado com sucesso",
            token
        })
    }

}

export default userController

class userController {

    async getUser(req, res) {
        //retornar os usuarios
        res.send("Olha que lindo!")
    }

    auth(req, res) {

        res.status(200).json({
            status: "success",
            message: "user authenticated"
        }) 
    }

    async createUser(req, res) {
        //cria e retora no user
        //chamar aqui o token e o refresh token tambem
    }

    async login(req, res) {
        //verificar se o usuario ja existe no banco

        
    }

}

export default userController
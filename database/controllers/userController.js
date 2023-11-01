import Contato from "../models/Contato.js";
import Favorito from "../models/Favorito.js";
import Reserva from "../models/Reserva.js";
import Restaurante from "../models/Restaurante.js";
import Usuario from "../models/Usuario.js";


class userController {

    async getUser(req, res) {

        const {
            id
        }=req.body;

        const user = await Usuario.findByPk(id)

        const arrayFavoritos= []

        const favorito = await Favorito.findAll({
            where:{
                fk_usuario:id
            }
        })

        for (let i=0; i<favorito; i++) {

            const restaurant = await Restaurante.findByPk(favorito.fk_restaurante)
            const obj= {
                id_restaurante:restaurant.id,
                foto:restaurant.foto
            }

            arrayFavoritos.push(obj)


        }

        const reservas= await Reserva.findAll({
            where:{
                fk_usuario:id
            }
        })

        const contato= await Contato.findOne({
            where:{
                fk_usuario:id
            }
        })

        const resultado={
            foto:user.foto,
            nome:user.nome_completo,
            email:user.email,
            tel:contato.celular,
            favoritos:arrayFavoritos || [],
            reservas:reservas || []
        }

        res.status(200).json({
            status:"success",
            resultado: resultado
        })
    }

    async getUsers(req, res) {

        res.status(200).json({message: "ainda em produção"})

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
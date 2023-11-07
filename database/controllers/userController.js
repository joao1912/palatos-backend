import { CustomError } from "../../Middlewares/erros.js";
import Contato from "../models/Contato.js";
import Favorito from "../models/Favorito.js";
import Reserva from "../models/Reserva.js";
import Restaurante from "../models/Restaurante.js";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import {CreateTokenAccess} from "../../utils/CreateTokenAccess.js"


class userController {

    async getUser(req, res) {

        const {
            id
        }=req.params;

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
            usuario: resultado
        })
    }

    async getUsers(req, res) {

        const usuarios= await Usuario.findAll()

        if (!usuarios) {
            throw new CustomError("O servidor falhou em buscar os usuários", 500)
        }

        res.status(200).json({
            usuarios: usuarios || []
        })

    }

    auth(req, res) {

        res.status(200).json({
            status: "success",
            message: "user authenticated"
        }) 
    }

    async createUser(req, res) {
       const {
            email,
            senha
       } = req.body

       const emailJaExiste= await Usuario.findOne({
        where: {
            email:email
        }
       })

       if (emailJaExiste) {
        throw new CustomError("Este email já existe",400)
       }

       let id

       try {

        const salt = "12"
        const senhaEscondida =bcrypt.hash(senha,salt)
        .then(novaSenha => {return novaSenha})

        const usuario = await Usuario.create({
            email,
            senha:senhaEscondida
        }) 

        id=usuario.id

       } catch (error) {
        throw new CustomError("O servidor falhou criar o usuário", 500)
       }

       const createTokenAccess = CreateTokenAccess()
       const token=await createTokenAccess.execute(id)

       res.status(200).json({
        status:"success",
        token
       })

    }

    async login(req, res) {
        //verificar se o usuario ja existe no banco

        
    }

}

export default userController
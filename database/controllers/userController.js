import { CustomError } from "../../Middlewares/erros.js";
import Contato from "../models/Contato.js";
import Favorito from "../models/Favorito.js";
import Reserva from "../models/Reserva.js";
import Restaurante from "../models/Restaurante.js";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import { CreateTokenAccess } from "../../utils/CreateTokenAccess.js"


class userController {

    async getUser(req, res) {

        const {
            id
        } = req.params;

        const user = await Usuario.findByPk(id)

        const arrayFavoritos = []

        const favorito = await Favorito.findAll({
            where: {
                fk_usuario: id
            }
        })

        for (let i = 0; i < favorito.length; i++) {

            const restaurant = await Restaurante.findByPk(favorito[i].fk_restaurante)

            const obj = {
                id_restaurante: restaurant.id,
                foto: restaurant.foto
            }

            arrayFavoritos.push(obj)

        }

        const reservas = await Reserva.findAll({
            where: {
                fk_usuario: id
            }
        })

        const usuarioReserva = await Usuario.findByPk(id)

        reservas.nome_completo = usuarioReserva.nome_completo

        const contato = await Contato.findOne({
            where: {
                fk_usuario: id
            }
        })

        const resultado = {
            foto: user.foto,
            nome: user.nome_completo,
            email: user.email,
            tel: contato.celular,
            favoritos: arrayFavoritos || [],
            reservas: reservas || []
        }

        res.status(200).json({
            status: "success",
            usuario: resultado
        })
    }

    async getUsers(req, res) {

        const usuarios = await Usuario.findAll()

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
            nome_completo,
            email,
            senha
        } = req.body

        const emailJaExiste = await Usuario.findOne({
            where: {
                email: email
            }
        })

        if (emailJaExiste) {
            throw new CustomError("Este email já existe", 400)
        }

        let id

        bcrypt.genSalt(10, function (err, salt) {

            if (err) {
                throw new CustomError("Erro ao tentar obter o salt", 500)
            }

            bcrypt.hash(senha, salt, async function (err, hash) {

                if (err) {
                    throw new CustomError("Erro ao tentar esconder a senha", 404)
                }


            });
        });

        bcrypt.genSalt(10)
            .then(
                salt => {
                    bcrypt.hash(senha, salt)
                        .then(hash => {

                            async function createNewUserWithHash() {

                                try {
                                    const usuario = await Usuario.create({
                                        email,
                                        senha: hash,
                                        nome_completo
                                    })

                                    const createTokenAccess = new CreateTokenAccess()

                                    const token = await createTokenAccess.execute(usuario.id)

                                    res.status(200).json({
                                        status: "success",
                                        token
                                    })

                                } catch (err) {
                                    throw new CustomError("O servidor falhou criar o usuário", 500)
                                }
                            }
                            createNewUserWithHash()

                        });
                }
            ).catch(err => {
                console.log(err)
                throw new CustomError("Erro ao tentar enconder a senha", 500)
            });

    }

    async login(req, res) {

        const {
            email,
            senha
        } = req.body

        const emailUsuario = await Usuario.findOne({
            where: {
                email: email
            }
        })

        if (!emailUsuario) {
            return res.status(401).json({
                status: "wrong_email",
                message: "E-mail inválido"
            })
        }

        const resPassword = await bcrypt.compare(senha, emailUsuario.senha)
        if (!resPassword) {
            return res.status(401).json({
                status: "wrong_password",
                message: "Senha inválida"
            })
        }

        const createTokenAccess = new CreateTokenAccess()
        const token = await createTokenAccess.execute(emailUsuario.id)
        res.status(200).json({
            status: "success",
            token
        })

    }

    async toggleFavorito(req, res) {

        const {idRestaurante} = req.params;
        const id = req.id;

        let favoritos

        try {
            favoritos = await Favorito.findAll({
                where: {
                    fk_usuario: id
                }
            })
            
        } catch (error) {
            throw new CustomError("O servidor falhou em buscar os favoritos")
        }

        let isNew = true

        for (let fav of favoritos) {

            if (fav.fk_restaurante == idRestaurante) {

                isNew = false

            }
        }

        if (isNew) {

            await Favorito.create({
                fk_restaurante: idRestaurante,
                fk_usuario: id
            })

            return res.status(200).json({
                status: "success",
                message: "Restaurante Favoritado"
            })

        } else {

            await Favorito.destroy({
                where: {
                    fk_restaurante: idRestaurante,
                    fk_usuario: id
                }
            })

            return res.status(200).json({
                status: "success",
                message: "Restaurante removido dos favoritos"
            })

        }
    }
}

export default userController
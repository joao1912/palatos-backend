import ConfiguracoesRestaurantes from "../models/ConfiguracoesRestaurante.js";
import Contato from "../models/Contato.js";
import Restaurante from "../models/Restaurante.js"
import { CreateTokenAccess } from "../../utils/CreateTokenAccess.js";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt"
import Cardapio from "../models/Cardapio.js";
import {CustomError} from "../../Middlewares/erros.js"
const createTokenAccess = new CreateTokenAccess()

class restauranteController {

    async getRestaurant(req, res) {

        const {id} = req.params;
        
        if (id) {
           
            const result = await Restaurante.findByPk(id)

            if (result == null) {
                throw new CustomError("Não foi possível encontrar um restaurante com este ID.", 404)
            } else {
                res.status(200).json({
                    status: 'success',
                    result
                })
            }

        } else {
           
            const everyRestaurants = await Restaurante.findAll()

            if (everyRestaurants == null) {

                throw new CustomError("O servidor falhou em buscar os restaurantes", 500)

            }

            res.status(200).json({
                status: 'success',
                result: everyRestaurants
            })
            
        }
    }

    async createRestaurant(req, res) {

        const idUser = req.id;
        const nomeFoto = req.file;

        try {
            let plano = 3
            const {
                nome,
                descricao,
               // plano, 
                endereco,
                cep,
                rua,
                reservasAtivas,
                tempoTolerancia,
                telefone,
                celular,
            } = req.body;

            const contatoRest = await createContato(idUser, telefone, celular)

            const resultRestaurant = await Restaurante.create({
                nome,
                descricao,
                foto: `http://45.224.129.126:8085/files/${nomeFoto.filename}`,
                plano,
                endereco,
                cep,
                rua,
                fk_usuario: idUser,
                fk_contato:contatoRest.id
            })

            await createRestConfig(resultRestaurant.id, reservasAtivas, tempoTolerancia)

            const token = await createTokenAccess.execute(idUser, resultRestaurant.id)

            res.status(200).json({
                status: 'success',
                resultRestaurant,
                token
            })

        } catch (err) {
            console.log(err)
            throw new CustomError("O servidor falhou em criar o restaurante", 500)
        }

    }

    async editRestaurant(req, res) {

        const {
            nome,
            descricao,
            foto,
            plano,
            endereco,
            cep,
            rua,
            reservasAtivas,
            tempoTolerancia, 
            telefone,
            celular, 
        } = req.body;

        const {idRestaurante} = req.params;

        const restaurant = await Restaurante.findByPk(idRestaurante) 

        if (!restaurant) {
            throw new CustomError("O servidor falhou em buscar o restaurante", 404)
        }

        restaurant.set({
            nome,
            descricao,
            foto,
            plano,
            endereco,
            cep,
            rua
        })

        restaurant.save()

        await editConfigRest(restaurant.id, reservasAtivas, tempoTolerancia)

        await editContato(restaurant.id, telefone, celular)

        res.status(200).json({
            status: 'success',
            restaurantUpdated: restaurant
        })
    
    }

    async deleteRestaurant(req, res) {

        const idRestaurant = req.params.idRestaurante;

        try {

            const restaurantDeleted = await Restaurante.findByPk(idRestaurant)
            await Restaurante.destroy({where: {id: idRestaurant}})
            const products = await Cardapio.findOne({where: {fk_restaurante: idRestaurant}})

            if (products) {
                await Cardapio.destroy({where: {fk_restaurante: idRestaurant}})
            }

            await Contato.destroy({where: restaurantDeleted.fk_usuario})
            await ConfiguracoesRestaurantes.destroy({where: {fk_restaurante: idRestaurant}})

            res.status(200).json({
                status: 'success',
                message: 'Restaurante Excluido.'
            })

        } catch(err) {
            throw new CustomError("O servidor falhou em deletar o restaurante", 500)
        }
        
    }

    async loginRestaurant(req,res){

        console.log(req.body)
        const {
            email,
            senha
        } = req.body;

        const usuario= await Usuario.findOne({
            where: {
                email: email
            } 
        })

        const restaurante = await Restaurante.findOne({
            where: {fk_usuario: usuario.id}
        })

        const createTokenAccess= new CreateTokenAccess()
        const token= await createTokenAccess.execute(usuario.id, restaurante.id)

        res.status(200).json({
            status:"success",
            token: token
        })

        /* if (!usuario){
            throw new CustomError("Email ou Senha incorretos.", 401)
        }        

        try {
            await bcrypt.compare(senha, usuario.senha)

            

            

        } catch (err) {
            throw new CustomError("Email ou Senha incorretos.", 401)
        } */
    }
}

async function createContato(idUser, telefone, celular) {
    const contatoRest = await Contato.create({
        telefone_fixo: telefone,
        celular,
        fk_usuario: idUser
    })

    if (!contatoRest) {
        throw new CustomError("Não foi possível criar o contato.", 400)
    }

    return contatoRest
}

async function createRestConfig(restauranteId,  reservas_ativas, tempo_tolerancia, avaliacao_comida) {
    const configRest = await ConfiguracoesRestaurantes.create({
        reservas_ativas,
        tempo_tolerancia,
        avaliacao_comida,
        fk_restaurante: restauranteId
    })
    if (!configRest) {
        throw new CustomError("Não foi possível criar a configuração do restaurante.", 400)
    }

    return configRest
}

async function editConfigRest(restauranteId, reservas_ativas, tempo_tolerancia, avaliacao_comida) {
    try {
            
        const configRest = await ConfiguracoesRestaurantes.findOne({where: {fk_restaurante: restauranteId}}) 

        configRest.set({
            reservas_ativas,
            tempo_tolerancia,
            avaliacao_comida
        })

        configRest.save()
    
    } catch(err) {

        throw new CustomError("O servidor falhou em editar a configuração do restaurante", 500)
                    
    }
}

async function editContato(restauranteId, telefone_fixo, celular) {
    try {
            
        const contatoRest = await Contato.findOne({where: {fk_restaurante: restauranteId}}) //talvez tenha que converter para numerico

        contatoRest.set({
           telefone_fixo,
           celular
        })

        contatoRest.save()
    
    } catch(err) {

        throw new CustomError("O servidor falhou em editar o contato do restaurante", 500)
                    
    }
}

export default restauranteController
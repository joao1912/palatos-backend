import ConfiguracoesRestaurantes from "../models/ConfiguracoesRestaurante.js";
import Contato from "../models/Contato.js";
import Restaurante from "../models/Restaurante.js"
import { CreateTokenAccess } from "../../utils/CreateTokenAccess.js";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt"
const createTokenAccess = new CreateTokenAccess()

class restauranteController {

    async getRestaurant(req, res) {

        const id = req.params.id;
        
        if (id) {
           
            try {   
                const result = await Restaurante.findByPk(id)

                if (result == null) {
                    res.status(404).json({
                        status: 'failed',
                        erro: 'Restaurante não encontrado.'
                    })
                } else {
                    res.status(200).json({
                        status: 'success',
                        result
                    })
                }

            } catch(err) {

                throw new Error("Não foi possível encontrar um restaurante com este ID.")
                
            }
        } else {
           
            const everyRestaurants = await Restaurante.findAll()

            if (everyRestaurants == null) {

                throw new Error("Restaurantes não encontrados.")

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
            throw new Error("O servidor falhou em criar o restaurante")
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
            throw new Error("O servidor falhou em buscar o restaurante")
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

            await Restaurante.destroy({where: {id: idRestaurant}})
            res.status(200).json({
                status: 'success',
                message: 'Restaurante Excluido.'
            })

        } catch(err) {
            throw new Error("O servidor falhou em deletar o restaurante")
        }
        
    }

    async loginRestaurant(req,res){

        const {
            email,
            senha
        } = req.body;

        const usuario= await Usuario.findOne({
            where: {
                email: email
            } 
        })

        if (!usuario){
            throw new Error("Email ou Senha incorretos.")
        }

        try {
            await bcrypt.compare(senha, usuario.senha)
            const createTokenAccess= new CreateTokenAccess()
            const token= await createTokenAccess.execute(usuario.id)

            res.status(200).json({
                status:"success",
                token: token
            })

        } catch (err) {
            throw new Error("Email ou Senha incorretos.")
        }

        

    }

}

async function createContato(idUser, telefone, celular) {
    const contatoRest = await Contato.create({
        telefone_fixo: telefone,
        celular,
        fk_usuario: idUser
    })

    if (!contatoRest) {
        throw new Error("Não foi possível criar o contato.")
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
        throw new Error("Não foi possível criar a configuração do restaurante.")
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

        throw new Error("O servidor falhou em editar a configuração do restaurante")
                    
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

        throw new Error("O servidor falhou em editar o contato do restaurante")
                    
    }
}

export default restauranteController
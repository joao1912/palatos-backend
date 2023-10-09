import { SECRET_KEY } from "../../index.js";
import ConfiguracoesRestaurantes from "../models/ConfiguracoesRestaurante.js";
import Contato from "../models/Contato.js";
import Restaurante from "../models/Restaurante.js"
import jwt from "jsonwebtoken";

class restauranteController {

    async getRestaurant(req, res) {

        const id = req.params.id;
        if (id && typeof id === "number") {

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

            const {
                nome,
                descricao,
                plano, //pendente
                endereco,
                cep,
                rua,
                reservasAtivas,
                tempoTolerancia,
                avaliacaoComida, //pendente
                telefone,
                celular,
            } = req.body;

            const resultRestaurant = await Restaurante.create({
                nome,
                descricao,
                foto: `http://45.224.129.126:8085/files/${nomeFoto}`,
                plano,
                endereco,
                cep,
                rua,
                fk_usuario: idUser
            })

            await createContato(idUser, telefone, celular)

            await createRestConfig(resultRestaurant.id, reservasAtivas, tempoTolerancia, avaliacaoComida)

            const token = jwt.sign({userId: idUser, idRestaurante: resultRestaurant.id}, SECRET_KEY, {expiresIn: '7d'})

            res.status(200).json({
                status: 'success',
                resultRestaurant,
                token
            })

        } catch (err) {
            throw new Error("O servidor falhou em criar o restaurante")
        }

    }

    async editRestaurant(req, res) {

        const {
            idUser,
            nome,
            descricao,
            foto,
            plano,
            endereco,
            cep,
            rua,
            configRestaurante,
            contato
        } = req.body;

        const {
            reservasAtivas,
            tempoTolerancia, 
            avaliacaoComida
        } = configRestaurante

        const {
            telefone,
            celular, 
        } = contato

       
        const restaurant = await Restaurante.findOne({where: {fk_usuario: idUser}}) //talvez tenha que converter para numerico

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

        await editConfigRest(restaurant.id, reservasAtivas, tempoTolerancia, avaliacaoComida)

        await editContato(restaurant.id, telefone, celular)

        res.status(200).json({
            status: 'success',
            restaurantUpdated: restaurant
        })
    
    }

    async deleteRestaurant(req, res) {

        const idRestaurant = req.params.id;

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
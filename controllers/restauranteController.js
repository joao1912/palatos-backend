import ConfiguracoesRestaurantes from "../models/ConfiguracoesRestaurante.js";
import Contato from "../models/Contato.js";
import Restaurante from "../models/Restaurante.js"

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

                console.log(err)
                
                res.json({
                    status: 'failed',
                    erro: "Não foi possível encontrar um restaurante com este ID."
                })
                
            }
        } else {

            const everyRestaurants = await Restaurante.findAll()

            if (everyRestaurants == null) {

                res.status(404).json({

                    status: 'failed',
                    erro: "Restaurantes não encontrados."

                })

            } else {
                res.status(200).json({
                    status: 'success',
                    result: everyRestaurants
                })
            }
            
        }
    }

    async createRestaurant(req, res) {

        try {

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

            const resultRestaurant = await Restaurante.create({
                nome,
                descricao,
                foto,
                plano,
                endereco,
                cep,
                rua,
                fk_usuario: idUser
            })

            await createContato(idUser, telefone, celular)

            await createRestConfig(resultRestaurant.id, reservasAtivas, tempoTolerancia, avaliacaoComida)

            res.status(200).json({
                status: 'success',
                resultRestaurant
            })

        } catch (err) {
            res.json({
                status: "failed",
                erro: err
            })
        }

    }

    async filterRestaurant() {
        //lembre para usar query
    }

    //puxar os alimentos de um restaurante

    //puxar os planos

    //criar os pratos um por um

    //---------
    // menu administrativo puxar(perfil, menu, financeiro, reservas, comanda, mesas)

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
            tempoTolerancia, //falta
            avaliacaoComida
        } = configRestaurante

        const {
            telefone,
            celular, //falta
        } = contato

        try {
            
            const restaurant = await Restaurante.findByPk(id) //talvez tenha que converter para numerico

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

            await editConfigRest() //falta

            await editContato() //falta

            res.status(200).json({
                status: 'success',
                restaurantUpdated: restaurant
            })
        
        } catch(err) {

            res.json({
                status: 'failed',
                erro: err
            })
                        
        }

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
            res.json({
                status: 'failed',
                erro: err
            })
        }
        
    }

}

async function createContato(idUser, telefone, celular) {
    const contatoRest = await Contato.create({
        telefone_fixo: telefone,
        celular,
        fk_usuario: idUser
    })
}

async function createRestConfig(restauranteId,  reservas_ativas, tempo_tolerancia, avaliacao_comida) {
    const configRest = await ConfiguracoesRestaurantes.create({
        reservas_ativas,
        tempo_tolerancia,
        avaliacao_comida,
        fk_restaurante: restauranteId
    })
}

async function editConfigRest() {

}

async function editContato() {
    
}

export default restauranteController
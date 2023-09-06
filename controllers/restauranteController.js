import Restaurante from "../models/Restaurante"

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

                res.json({
                    status: 'failed',
                    erro: err
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
                nome,
                descricao,
                foto,
                plano,
                endereco,
                cep,
                rua
            } = req.body;

            const resultRestaurant = await Restaurante.create({
                nome,
                descricao,
                foto,
                plano,
                endereco,
                cep,
                rua
            })

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
            id,
            nome,
            descricao,
            foto,
            plano,
            endereco,
            cep,
            rua
        } = req.body;

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

export default restauranteController
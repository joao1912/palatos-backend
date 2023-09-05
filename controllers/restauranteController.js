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

            const {nome} = req.body;

            const resultRestaurant = await Restaurante.create({
                //botar as propos com os valores que vão vir do obj
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

}

export default restauranteController
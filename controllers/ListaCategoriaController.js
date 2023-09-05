import ListaCategoria from '../models/ListaCategoria'

class listaCategoriaController {

    async getCategorias(req, res) {


        const allCategorias = await ListaCategoria.findAll()

        if (allCategorias == null) {

            res.status(404).json({

                status: 'NOT FOUND',
                erro: 'Nenhuma categoria disponível.'

            })

        } else {
            res.status(200).json({
                status: 'success',
                result: allCategorias
            })
        }

    }

}

export default listaCategoriaController
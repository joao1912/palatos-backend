import { error } from 'console'
import ListaCategoria from '../models/listaCategoria.js'
import Restaurante from '../models/Restaurante.js'

class listaCategoriaController {

    async getCategorias(req, res) {

        const id = req.params.id
        if (id) {
            id = Number(id)
            const listaRestaurantes = Restaurante.findAll({
                where: {
                    fk_categoria: id
                }
            })
            if (listaRestaurantes == null) {
                throw new Error("Nenhum restaurante encontrado")
            }

            res.status(200).json({
                status: 'Success',
                listaRestaurantes
            })
            return
        }

        const allCategorias = await ListaCategoria.findAll()

        if (allCategorias == null) {

            throw new Error("Nenhuma categoria disponível")

        }
        
        res.status(200).json({
            status: 'Success',
            result: allCategorias
        })
        
    }

}

export default listaCategoriaController
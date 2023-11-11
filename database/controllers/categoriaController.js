import Categoria from '../models/Categoria.js'

class CategoriaController {

    async getAllCategorias(req, res) {

        const allCategorias = await Categoria.findAll()

        if (allCategorias == null) {

            throw new Error("Nenhuma categoria disponível")

        }
        
        res.status(200).json({
            status: 'Success',
            result: allCategorias
        })
        
    }

}

export default CategoriaController
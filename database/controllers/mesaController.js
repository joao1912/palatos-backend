import Mesa from "../models/Mesa.js"
import ListaMesa from"../models/ListaMesa.js"
import { CustomError } from "../../Middlewares/erros.js"


class mesaController {

    async pegarMesas(req, res) {

        const {idRestaurante} = req.params

        const listaMesas = await ListaMesa.findAll({
            where: {
                fk_restaurante: idRestaurante
            }
        })

        if (!listaMesas || listaMesas.length == 0) {
            throw new CustomError("Este restaurante não possui mesas.", 404)
        }
        
        const mesas=[]

        for(let obj of listaMesas) {

            const mesa = await Mesa.findByPk(obj.fk_mesa)
            mesas.push(mesa)

        }

        res.status(200).json({
           status: 'success',
           mesas:mesas 
        })

    }

}

export default mesaController
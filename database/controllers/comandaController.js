import Comanda from "../models/Comanda"

class comandaController {
    async getComandas(req, res) {
        let idRestaurante = req.idRestaurante
        if(idRestaurante == null) {
            throw new Error("Token inválido.")
        }

        const listComandas = await Comanda.findAll()

        res.status(200).json({
            status: "success",
            message: "Lista de comandas",
            ListaComandas: listComandas
        })
    }

    async deleteComanda(req, res) {
        let idRestaurante = req.idRestaurante
        if (idRestaurante == null) {
            throw new Error({
                message: "Token inválido.",
                statusCode: 403
            })
        }

        const { idComanda } = req.body
        try {
            Comanda.destroy({
                where: {
                    id: idComanda
                }
            })

            res.status(200).json({
                status: "success",
                message: "Comanda removida."

            })
        } catch (err) {
            throw new Error("Erro ao deletar comanda.")
        }
    }
}
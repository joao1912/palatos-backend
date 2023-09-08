import Reserva from "../models/Reserva"

class reservaController {

    async getReservas(req, res) {

        const idUser = req.params.id;

        if (typeof idUser === "number") {

            try {
                const reserva = await Reserva.findOne({where: {fk_usuario: idUser}})

                if (reserva == null) {

                    res.status(404).json({
                        status: 'failed',
                        erro: "O usuário não foi encontrado."
                    })

                } else {

                    res.status(200).json({
                        status: 'success',
                        reserva
                    })
                }

                
            } catch (err) {
                console.log(err)

                res.status(400).json({
                    status: 'failed',
                    erro: "O servidor falhou em buscar a reserva."
                })
            }
            
        } else {

            try {
                const reservas = await Reserva.findAll()
                res.status(200).json({
                    status: 'success',
                    reservas
                })
            } catch (err) {
                console.log(err)

                res.status(400).json({
                    status: 'failed',
                    erro: "O servidor falhou em buscar as reservas."
                })
                
            }
        }
    }

    
}

export default reservaController
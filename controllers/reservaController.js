import Reserva from "../models/Reserva"
import Usuario from "../models/Usuario";

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

    async addReserva(req,res) {
        const { idUsuario, dataEntrada } = req.body;
        // a data tera que vir completa com horario

        if ( typeof idUsuario == "number") {

            const usuario = await Usuario.findByPk(idUsuario);
            if (!usuario) {
                return res.status(404).json({
                    status: 'failed',
                    error: 'Usuário não encontrado' 
                });
            }

        } else {

            res.status(400).json({
                status: 'failed',
                erro: "typeof error"
            })

        }

        try {

            const novaReserva = await Reserva.create({
                data_entrada: dataEntrada,
                fk_usuario: idUsuario
            })

            res.status(200).json({
                status: 'success',
                novaReserva
            })
            
        } catch (err) {
            console.log(err)

            res.status(400).json({
                status: 'failed',
                erro: "O servidor falhou em criar a reserva."
            }) 
        }
    }

    async editReserva(req, res) {

        const cod = req.params.cod;

        if (typeof cod != "number") {
            res.status(400).json({
                status: 'failed',
                erro: "typeof error"
            })
        }

        try {

            const reserva = await Reserva.findByPk(cod)

            if (reserva !== null) {

                const completedOrNot = reserva.isCompleted

                if (completedOrNot) {
                    res.status(400).json({
                        status: 'failed',
                        erro: "A reserva ja foi completada."
                    })
                }

                reserva.set({
                    isCompleted: true
                })

                reserva.save()

                res.status(200).json({
                    status: 'success',
                    message: "A reserva foi completada."
                })

            } else {
                res.status(404).json({
                    status: 'failed',
                    erro: "Reserva não encontrada."
                })
            }
            
        } catch (err) {
            console.log(err)

            res.status(400).json({
                status: 'failed',
                erro: "O servidor falhou em buscar a reserva."
            })
        }
    }

    
}

export default reservaController
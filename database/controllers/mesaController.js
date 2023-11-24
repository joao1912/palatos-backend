import ProdutoCarrinho from "../models/ProdutoCarrinho.js"
import Financeiro from "../models/Financeiro.js"
import Mesa from "../models/Mesa.js"
import ListaMesa from "../models/ListaMesa.js"
import { CustomError } from "../../Middlewares/erros.js"


class mesaController {
    
    async geraIdentificacaoMesas(idRestaurante) {
        const lista = await ListaMesa.findAll({
            where: {
                fk_restaurante: idRestaurante
            }
        })

        if (!lista || lista.length == 0) return

        let valAtual = 1
        
        const mesas = []
        for (let objLista of lista) {
            const mesa = await Mesa.findByPk(objLista.fk_mesa)
            if (!mesa) continue

            mesas.push(mesa)
        }

        for (let objMesa of mesas) {
            objMesa.update({
                identificacao_mesa: `Mesa ${valAtual}`
            })
            valAtual++
        }
    }

    async pegarMesas(req, res) {

        const { idRestaurante } = req.params

        const listaMesas = await ListaMesa.findAll({
            where: {
                fk_restaurante: idRestaurante
            }
        })

        if (!listaMesas || listaMesas.length == 0) {
            throw new CustomError("Este restaurante não possui mesas.", 404)
        }

        const mesas = []

        for (let obj of listaMesas) {

            let mesa = await Mesa.findByPk(obj.fk_mesa)
            mesas.push(mesa)

        }

        res.status(200).json({
            status: 'success',
            mesas: mesas
        })

    }

    async criarMesa(req, res) {
        const { idRestaurante } = req.params

        let mesa

        try {
            mesa = await Mesa.create({
                conta: 0
            })

            const jsonMesa = JSON.stringify({
                idRestaurante: idRestaurante,
                idMesa: mesa.id
            })

            mesa.set({
                qr_code: jsonMesa
            })

            mesa.save()

            await ListaMesa.create({
                fk_restaurante: idRestaurante,
                fk_mesa: mesa.id,
            })

            this.geraIdentificacaoMesas(idRestaurante)
        } catch (error) {
            console.log(error)
            throw new CustomError("O servidor falhou em criar a mesa", 500)
        }


        res.status(200).json({
            status: "success",
            mesa: mesa
        })
    }

    async adicionarQrCode(req, res) {

        const { idMesa } = req.params;
        const { jsonMesa } = req.body;
        let mesa

        try {
            mesa = Mesa.findByPk(idMesa)
            mesa.set({
                qr_code: jsonMesa,
            })
            mesa.save()

        } catch (error) {
            throw new CustomError("Erro ao adicionar os qrcodes", 500)
        }

        res.status(200).json({
            status: "success",
            mesa: mesa
        })

    }

    async trocarOcupado(req, res) {
        const { idMesa } = req.params
        const { isOccupied } = req.body

        const mesa = await Mesa.findByPk(idMesa)

        if (!mesa) {
            throw new CustomError("Esta mesa não foi encontrada", 404)
        }

        if (mesa.ocupada != isOccupied) {

            mesa.set({
                ocupada: isOccupied
            })

            mesa.save()

            if (!isOccupied) {
                const produtos = await ProdutoCarrinho.findAll({
                    where: {
                        fk_mesa: mesa.id
                    }
                })
                if (produtos && produtos.length > 0) {
                    for (let produtoObj of produtos) {
                        await Financeiro.create({
                            dataCompra: new Date(),
                            fk_usuario: req.id,
                            fk_restaurante: req.idRestaurante,
                            fk_cardapio: produtoObj.fk_cardapio
                        })
                    }
                }
            }

            res.status(200).json({
                status: 'success',
                message: "Troca efetuada"
            })

        }

        let message = isOccupied ? "Já está ocupada." : "Já está livre."

        res.status(200).json({
            status: 'success',
            message: message
        })

    }

    async deletarMesa(req, res) {
        const { idMesa } = req.params

        const idRestaurante = req.idRestaurante

        if (!idMesa) {
            throw new CustomError("Id inválido", 400)
        }

        try {
            await ListaMesa.destroy({
                where: {
                    fk_mesa: idMesa
                }
            })

            await Mesa.destroy({
                where: {
                    id: idMesa
                }
            })
        } catch (error) {
            throw new CustomError("A mesa não pode ser deletada", 500)
        }

        this.geraIdentificacaoMesas(idRestaurante)

        res.status(200).json({
            status: 'success',
            message: 'Mesa deletada com sucesso!'
        })

    }

}

export default mesaController
import ConfiguracoesRestaurantes from "../models/ConfiguracoesRestaurante.js";
import Contato from "../models/Contato.js";
import Restaurante from "../models/Restaurante.js"
import { CreateTokenAccess } from "../../utils/CreateTokenAccess.js";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt"
import Cardapio from "../models/Cardapio.js";
import ListaCategoria from "../models/listaCategoria.js"
import Categoria from "../models/Categoria.js"
import {CustomError} from "../../Middlewares/erros.js"
const createTokenAccess = new CreateTokenAccess()

class restauranteController {

    async getRestaurant(req, res) {

        const idRestaurante = req.params.id;
        
        if (idRestaurante) {
           
            const result = await Restaurante.findByPk(idRestaurante)
            const {
                id,
                nome,
                descricao,
                foto,
                plano,
                endereco,
                cep,
                rua
            } = result

            const contato = await Contato.findByPk(result.fk_contato) 

            const idCategorias = await ListaCategoria.findAll({
                where: {
                    fk_restaurante: id
                }
            })

            const categorias = []

            for (let obj of idCategorias) {
                const categoria = await Categoria.findByPk(obj.fk_categoria)
                categorias.push(categoria.nome)
            }

            const configRest = await ConfiguracoesRestaurantes.findOne({
                where: {
                    fk_restaurante: id
                }
            })

            const restaurante = {
                id,
                nome,
                descricao,
                foto,
                plano,
                endereco,
                cep,
                rua,
                celular: contato.celular,
                telefone_fixo: contato.telefone_fixo,
                cetegorias: categorias,
                reservasAtivas: configRest.reservas_ativas,
                tempoTolerancia: configRest.tempo_tolerancia
            }

            if (result == null) {
                throw new CustomError("Não foi possível encontrar um restaurante com este ID.", 404)
            } else {
                res.status(200).json({
                    status: 'success',
                    result: restaurante
                })
            }

        } else {
           
            const everyRestaurants = await Restaurante.findAll()

            if (everyRestaurants == null) {

                throw new CustomError("O servidor falhou em buscar os restaurantes", 500)

            }

            res.status(200).json({
                status: 'success',
                result: everyRestaurants
            })
            
        }
    }

    async createRestaurant(req, res) {

        const idUser = req.id;
        const nomeFoto = req.file;

        try {
            const {
                nome,
                descricao,
                plano, 
                endereco,
                cep,
                rua,
                reservasAtivas,
                tempoTolerancia,
                telefone,
                celular,
                categorias
            } = req.body;

            let foto

            if (nomeFoto) {
                foto = `http://45.224.129.126:8085/files/${nomeFoto.filename}`
            } else {
                `http://45.224.129.126:8085/files/restaurante`
            }

            const contatoRest = await createContato(idUser, telefone, celular)

            const resultRestaurant = await Restaurante.create({
                nome, 
                descricao,
                foto: foto,
                plano,
                endereco,
                cep,
                rua,
                fk_usuario: idUser,
                fk_contato:contatoRest.id
            })
            
            let nomeCategorias

            if (categorias.indexOf(",")) {
                nomeCategorias = categorias.split(",")
            } else {
                nomeCategorias = [categorias]
            }
           

            for(let nome of nomeCategorias) {
                
                const categoria = await Categoria.findOne({
                    where: {
                        nome
                    }
                })

                await ListaCategoria.create({
                    fk_categoria: categoria.id,
                    fk_restaurante: resultRestaurant.id
                })
            }

            await createRestConfig(resultRestaurant.id, reservasAtivas, tempoTolerancia)

            const token = await createTokenAccess.execute(idUser, resultRestaurant.id)

            res.status(200).json({
                status: 'success',
                resultRestaurant,
                token
            })

        } catch (err) {
            console.log(err)
            throw new CustomError("O servidor falhou em criar o restaurante", 500)
        }

    }

    async editRestaurant(req, res) {

        const {
            nome,
            descricao,
            endereco,
            cep,
            rua,
            reservasAtivas,
            tempoTolerancia, 
            telefone,
            celular,
            categorias
        } = req.body;

        const nomeFoto = req.file

        const {idRestaurante} = req.params;

        const restaurant = await Restaurante.findByPk(idRestaurante) 

        if (!restaurant) {
            throw new CustomError("O servidor falhou em buscar o restaurante", 404)
        }

        restaurant.set({
            nome: nome || restaurant.nome,
            descricao: descricao || restaurant.descricao,
            endereco: endereco || restaurant.endereco,
            cep: cep || restaurant.cep,
            rua: rua || restaurant.rua,
        })

        const listaCategorias = await ListaCategoria.findAll({
            where: {
                fk_restaurante: restaurant.id
            }
        })

        const categoriasRestaurante = []
        const nomeCategorias = []
        for(let categoria of listaCategorias) {
            const categoriaCompleta = await Categoria.findByPk(categoria.fk_categoria)
            categoriasRestaurante.push(categoriaCompleta)
            nomeCategorias.push(categoriaCompleta.nome)
        }

    
        const categoriasAdicionadas = categorias.filter(categoria => !nomeCategorias.includes(categoria));

        const categoriasRemovidas = nomeCategorias.filter(categoria => !categorias.includes(categoria));

        if (categoriasAdicionadas) {

            for (let novaCategoria of categoriasAdicionadas) {

                const idCategoria = await Categoria.findOne({
                    where: {
                        nome: novaCategoria
                    }
                })

                await ListaCategoria.create({
                    fk_categoria: idCategoria.id,
                    fk_restaurante: restaurant.id
                })
            }
        }

        if (categoriasRemovidas) {

            for (let oldCategoria of categoriasRemovidas) {

                const idCategoria = await Categoria.findOne({
                    where: {
                        nome: oldCategoria
                    }
                })

                await ListaCategoria.destroy({
                    where: {
                        fk_categoria: idCategoria.id,
                        fk_restaurante: restaurant.id
                    }
                })
            }
        }

        if (nomeFoto) {

            restaurant.set({
                foto: `http://45.224.129.126:8085/files/${nomeFoto.filename}`
            })

        }

        restaurant.save()

        await editConfigRest(restaurant, reservasAtivas, tempoTolerancia)

        await editContato(restaurant, telefone, celular)

        res.status(200).json({
            status: 'success',
            restaurantUpdated: restaurant
        })
    
    }

    async deleteRestaurant(req, res) {

        const idRestaurant = req.params.idRestaurante;

        try {

            const restaurantDeleted = await Restaurante.findByPk(idRestaurant)
            await Restaurante.destroy({where: {id: idRestaurant}})
            const products = await Cardapio.findOne({where: {fk_restaurante: idRestaurant}})

            if (products) {
                await Cardapio.destroy({where: {fk_restaurante: idRestaurant}})
            }

            await Contato.destroy({where: restaurantDeleted.fk_usuario})
            await ConfiguracoesRestaurantes.destroy({where: {fk_restaurante: idRestaurant}})

            res.status(200).json({
                status: 'success',
                message: 'Restaurante Excluido.'
            })

        } catch(err) {
            throw new CustomError("O servidor falhou em deletar o restaurante", 500)
        }
        
    }

    async loginRestaurant(req,res){

        console.log(req.body)
        const {
            email,
            senha
        } = req.body;

        const usuario= await Usuario.findOne({
            where: {
                email: email
            } 
        })

        const restaurante = await Restaurante.findOne({
            where: {fk_usuario: usuario.id}
        })

        const createTokenAccess= new CreateTokenAccess()
        const token= await createTokenAccess.execute(usuario.id, restaurante.id)

        res.status(200).json({
            status:"success",
            token: token
        })

        /* if (!usuario){
            throw new CustomError("Email ou Senha incorretos.", 401)
        }        

        try {
            await bcrypt.compare(senha, usuario.senha)

            

            

        } catch (err) {
            throw new CustomError("Email ou Senha incorretos.", 401)
        } */
    }
}

async function createContato(idUser, telefone, celular) {
    const contatoRest = await Contato.create({
        telefone_fixo: telefone || null,
        celular,
        fk_usuario: idUser
    })

    if (!contatoRest) {
        throw new CustomError("Não foi possível criar o contato.", 400)
    }

    return contatoRest
}

async function createRestConfig(restauranteId,  reservas_ativas, tempo_tolerancia) {
    const configRest = await ConfiguracoesRestaurantes.create({
        reservas_ativas,
        tempo_tolerancia: tempo_tolerancia || 0,
        fk_restaurante: restauranteId
    })
    if (!configRest) {
        throw new CustomError("Não foi possível criar a configuração do restaurante.", 400)
    }

    return configRest
}

async function editConfigRest(restaurante, reservas_ativas, tempo_tolerancia) {
    try {
            
        const configRest = await ConfiguracoesRestaurantes.findOne({where: {fk_restaurante: restaurante.id}}) 

        configRest.set({
            reservas_ativas,
            tempo_tolerancia: tempo_tolerancia || configRest.tempo_tolerancia
        })

        configRest.save()
    
    } catch(err) {

        throw new CustomError("O servidor falhou em editar a configuração do restaurante", 500)
                    
    }
}

async function editContato(restaurante, telefone_fixo, celular) {
    try {
            
        const contatoRest = await Contato.findOne({where: {fk_restaurante: restaurante.id}}) 

        contatoRest.set({
           telefone_fixo: telefone_fixo || contatoRest.telefone_fixo,
           celular: celular || contatoRest.celular
        })

        contatoRest.save()
    
    } catch(err) {

        throw new CustomError("O servidor falhou em editar o contato do restaurante", 500)
                    
    }
}

export default restauranteController
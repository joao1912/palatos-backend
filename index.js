import database from "./database/db.js"
import express from "express"
import cors from "cors"
import 'express-async-errors'
import Usuario from "./database/models/Usuario.js"

;(async function(){
    await database.sync()
})()

import restaurantRoutes from "./routes/Restaurante.js"
import userRoutes from "./routes/user.js"
import searchRoutes from "./routes/search.js"
import reservaRoutes from "./routes/Reserva.js"
import cardapioRoutes from "./routes/cardapio.js"
import comandaRoutes from "./routes/Comanda.js"

import multer from "multer"
import { storage } from "./Middlewares/MulterConfig.js"

const upload = multer({storage: storage})

import erros from "./Middlewares/erros.js"

import { CreateTokenAccess } from "./utils/CreateTokenAccess.js"
const createTokenAccess = new CreateTokenAccess()

export const SECRET_KEY = "chaveSeg"
const app = express()
app.use(express.json())
app.use(cors())



app.get("/", (req, res) => {
    
    res.json({message: 'OLA!!', token})
}) 

app.post("/createToken", async (req, res) => {
    const token = await createTokenAccess.execute(10, 10)

    res.status(200).json({
        message: "eeeeee",
        token
    })
})

app.use("/files", express.static("uploads")) //para acessar a imagem é só por o caminho e o nome da imagems: baseUrl/files/nome-do-arquivo

app.use("/users", userRoutes)

app.use("/restaurante", restaurantRoutes)

app.use("/restaurante", reservaRoutes)

app.use("/restaurante", cardapioRoutes)

app.use("/restaurante", comandaRoutes)

app.use("/search", searchRoutes)

//aqui ele salva uma imagem de cada vez
app.post("/loadImage", upload.single("foto") ,(req, res) => {
    res.json("tudo certo")
})

//aqui ele salva varias imagens de uma vez
app.post("/loadImages", upload.array("foto") ,(req, res) => {
    const fotos = req.files;
    const produtos = req.body;

    for(let i = 0; i < produtos.length ; i++) {

        let imageNotExists = true;

        for (let j = 0; j < fotos.length; j++) {
            const nomeOriginal = fotos[j].originalname
            const indexPoint = nomeOriginal.indexOf(".")
            let nomeOrigialFiltrado

            if (indexPoint !== -1) {
                nomeOrigialFiltrado = nomeOriginal.slice(indexPoint)
            } else {
                nomeOrigialFiltrado = nomeOriginal
            }
            
            if (produtos[i].nomeImagem == nomeOrigialFiltrado) {
                imageNotExists = false
                produtos[i].path = `http://45.224.129.126:8085/files/${fotos[j].filename}`
            }

            if (fotos.length == (j + 1) && imageNotExists) {
                produtos[i].path = `http://45.224.129.126:8085/files/foto-padrao.png` //colocar aqui a foto padrão
            }

        }

    }
     
    //agora é só salvar no banco (cardapio) (criar o controller para o cardapio)

    res.json({
        imagens: [...fotos]
    })
})

app.use(erros)

app.listen(8085, () => {
    console.log("Servidor rodando na porta http://45.224.129.126:8085/")
})
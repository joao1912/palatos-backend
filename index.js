import database from "./database/db.js"
import express from "express"
import cors from "cors"
import 'express-async-errors'
import Usuario from "./database/models/Usuario.js"

;(async function(){
    await database.sync()
})()


// import create_comandas from "./utils/create_comandas.js"

// create_comandas()
import restaurantRoutes from "./routes/Restaurante.js"
import userRoutes from "./routes/User.js"
import searchRoutes from "./routes/search.js"
import reservaRoutes from "./routes/Reserva.js"
import cardapioRoutes from "./routes/Cardapio.js"
import comandaRoutes from "./routes/Comanda.js"
import financeiroRoutes from "./routes/Financeiro.js"

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

app.use("/restaurante", financeiroRoutes)

app.use("/search", searchRoutes)

app.use(erros)

app.listen(8085, () => {
    console.log("Servidor rodando na porta http://45.224.129.126:8085/")
})
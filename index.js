import database from "./database/db.js"
import express from "express"
import cors from "cors"
import 'express-async-errors'
import swaggerUi from "swagger-ui-express"
import "./database/assossiations.js"

;(async function(){
    await database.sync()
})()

import create_comandas from "./utils/create_comandas.js"

//create_comandas()
import restaurantRoutes from "./routes/Restaurante.js"
import userRoutes from "./routes/User.js"
import searchRoutes from "./routes/search.js"
import reservaRoutes from "./routes/Reserva.js"
import cardapioRoutes from "./routes/Cardapio.js"
import comandaRoutes from "./routes/Comanda.js"
import financeiroRoutes from "./routes/Financeiro.js"
import carrinhoMesaRoutes from "./routes/CarrinhoMesa.js"
import carrinhoReservaRoutes from "./routes/CarrinhoReserva.js"

import { CustomError, errorHandler } from "./Middlewares/erros.js"

import swaggerDocs from "./swagger.json" assert { type: "json"};
import { CreateTokenAccess } from "./utils/CreateTokenAccess.js"
const createTokenAccess = new CreateTokenAccess()

export const SECRET_KEY = "chaveSeg"
const app = express()
app.use(express.json())
app.use(cors())

app.use("/api-docs", swaggerUi.serve , swaggerUi.setup(swaggerDocs))

app.get("/", (req, res) => {
    
    throw new CustomError("Eita", 401)
    // res.json({message: 'OLA!!', token})
}) 

app.post("/createToken", async (req, res) => {
    const token = await createTokenAccess.execute(10, 10)

    res.status(200).json({
        message: "Token criado!",
        token
    })
})

app.use("/files", express.static("uploads")) 

app.use("/users", userRoutes)

app.use("/users/carrinhoMesa",carrinhoMesaRoutes)

app.use("/users/carrinhoReserva",carrinhoReservaRoutes)

app.use("/restaurante/reserva", reservaRoutes)

app.use("/restaurante/cardapio", cardapioRoutes)

app.use("/restaurante/comandas", comandaRoutes)

app.use("/restaurante/financeiro", financeiroRoutes)

app.use("/restaurante", restaurantRoutes)

app.use("/search", searchRoutes)

import multer from "multer"
import { storage } from "./Middlewares/MulterConfig.js"
const upload = multer({storage: storage})

app.post("/loadImage", upload.single('file'), function(req,res) {
    console.log(req.file)
    console.log(req.body)
    res.status(200).send("teste")
})

app.use(errorHandler)

app.listen(8085, () => {
    console.log("Servidor rodando na porta http://45.224.129.126:8085/")
})
import database from "./database/db.js"
import express from "express"
import cors from "cors"

import userRoutes from "./routes/user.js"
import restaurantRoutes from "./routes/Restaurante.js"
import searchRoutes from "./routes/search.js"
import reservaRoutes from "./routes/Reserva.js"

import multer from "multer"
import { storage } from "./Middlewares/MulterConfig.js"

const upload = multer({storage: storage})

import erros from "./Middlewares/erros.js"

export const SECRET_KEY = "chaveSeg"
const app = express()
app.use(express.json())
app.use(cors())

;(async function(){
    await database.sync()
})()

app.get("/", function(req,res){throw new Error("Um erro ai mano")}) 

app.use("/files", express.static("uploads")) //para acessar a imagem é só por o caminho e o nome da imagems: baseUrl/files/nome-do-arquivo

app.use("/users", userRoutes)

app.use("/restaurante", restaurantRoutes)

app.use("/restaurante", reservaRoutes)

app.use("/search", searchRoutes)

//criar uma rota para testar o upload de imagem no servidor
app.get("/loadImage", upload.single("foto") ,(req, res) => {
    res.json("tudo certo")
})


app.use(erros)

app.listen(8085, () => {
    console.log("Servidor rodando na porta http://45.224.129.126:8085/")
})
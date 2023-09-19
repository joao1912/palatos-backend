import database from "./database/db.js"
import express from "express"

import userRoutes from "./routes/user.js"
import restaurantRoutes from "./routes/Restaurante.js"
import searchRoutes from "./routes/search.js"
import reservaRoutes from "./routes/Reserva.js"

import erros from "./Middlewares/erros.js"

export const SECRET_KEY = "chaveSeg"
const app = express()
app.use(express.json())

;(async function(){
    await database.sync()
})()

app.get("/", function(req,res){throw new Error("Um erro ai mano")}) 

app.use("/users", userRoutes)

app.use("/restaurante", restaurantRoutes)

app.use("/restaurante", reservaRoutes)

app.use("/search", searchRoutes)


app.use(erros)

app.listen(8085, () => {
    console.log("Servidor rodando na porta http://45.224.129.126:8085/")
})
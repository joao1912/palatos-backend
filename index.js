import database from "./db.js"
import express from "express"

import userRoutes from "./routes/user.js"
import restaurantRoutes from "./routes/Restaurante.js"
import searchRoutes from "./routes/search.js"
import reservaRoutes from "./routes/Reserva.js"

export const SECRET_KEY = "chaveSeg"
const app = express()
app.use(express.json())

;(async function(){
    await database.sync()
})()

app.get("/", function(req,res){res.send("OPAAAAAA, Quer café?")}) 

app.use("/users", userRoutes)

app.use("/restaurante", restaurantRoutes)

app.use("/restaurante", reservaRoutes)

app.use("/search", searchRoutes)

app.listen(8085, () => {
    console.log("Servidor rodando na porta http://45.224.129.126:8085/")
})
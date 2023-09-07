import database from "./db.js"
import userRoutes from "./routes/user.js"
import restaurantRoutes from "./routes/Restaurante.js"
import searchRoutes from "./routes/search.js"
import express from "express"
const app = express()
app.use(express.json())

;(async function(){
    await database.sync()
})()

//app.use("/") // não definido

app.use("/users", userRoutes)

app.use("/restaurante", restaurantRoutes)

app.use("/search", searchRoutes)

app.listen(8085, () => {
    console.log("Servidor rodando na porta 8085")
})
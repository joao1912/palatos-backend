const express = require("express")
const app = express()
app.use(express.json())
const userRoutes = require("./routes/user")
const restaurantRoutes = require("./routes/Restaurante")
import sequelize from "./db"

(async function(){
    //await sequelize.sync()
})()

app.use("/") // não definido

app.use("/users", userRoutes)

app.use("/restaurante", restaurantRoutes)

app.listen(8085, () => {
    console.log("Servidor rodando na porta 8085")
})
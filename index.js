const express = require("express")
const app = express()
app.use(express.json())
const userRoutes = require("./routes/user.js")
const restaurantRoutes = require("./routes/Restaurante.js")
const searchRoutes = require("./routes/search.js")
const sequelize = require("./db.js")

(async function(){
    await sequelize.sync()
})()

app.use("/") // não definido

app.use("/users", userRoutes)

app.use("/restaurante", restaurantRoutes)

app.use("/search", searchRoutes)

app.listen(8085, () => {
    console.log("Servidor rodando na porta 8085")
})
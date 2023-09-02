const express = require("express")
const app = express()
app.use(express.json())
const userRoutes = require("./routes/user")
import sequelize from "./db"

(async function(){
    //await sequelize.sync()
})()

app.use("/", userRoutes)



app.listen(8085, () => {
    console.log("Servidor rodando na porta 8085")
})

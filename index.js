const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded())
const userRoutes = require("./routes/user")

app.use("/", userRoutes)



app.listen(8085, () => {
    console.log("Servidor rodando na porta 8085")
})

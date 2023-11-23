import database from "./database/db.js"
import express from "express"
import cors from "cors"
import 'express-async-errors'
import swaggerUi from "swagger-ui-express"
import './database/assossiations.js'

;(async function(){
    await database.sync()
})()

import create_categorias from "./utils/create_categorias.js"
import create_comandas from "./utils/create_comandas.js"
import setReservas from "./utils/create_reservas.js"

create_comandas()
//setReservas()
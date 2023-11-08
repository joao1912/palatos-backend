import database from "./database/db.js"
import express from "express"
import cors from "cors"
import 'express-async-errors'
import swaggerUi from "swagger-ui-express"
import './database/assossiations.js'

;(async function(){
    await database.sync()
})()

import create_comandas from "./utils/create_comandas.js"

create_comandas()
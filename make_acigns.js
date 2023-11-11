import database from "./database/db.js"
import express from "express"
import cors from "cors"
import 'express-async-errors'
import swaggerUi from "swagger-ui-express"

;(async function(){
    await database.sync()
})()

import acygn_categorias from "./utils/acign_categories.js";

acygn_categorias()
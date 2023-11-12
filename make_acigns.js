import database from "./database/db.js"
;(async function(){
    await database.sync()
})()

import acign_categorias from "./utils/acign_categorias.js";

acign_categorias()
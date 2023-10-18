import multer from "multer";
import path from "path"
import fs from "fs"

const uploadDirectory = path.resolve("uploads");

// Verifica se o diretório de upload existe, se não, cria o diretório
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

export const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
    
        cb(null, uploadDirectory)
    },
    filename: (req, file, cb) => {
        
        try {
            const id = new Date().getTime()
            cb(null, `${id}-${file.originalname}`)
        } catch(err) {

            console.log(err)
        }
        
    }

})
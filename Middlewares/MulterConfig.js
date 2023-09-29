import multer from "multer";
import path from "path"

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file.originalname)

        cb(null, path.resolve("uploads"))
    },
    filename: (req, file, cb) => {

        const id = new Date().getTime()
        cb(null, `${id}-${file.originalname}`)


    }

})
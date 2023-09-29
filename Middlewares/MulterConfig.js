import multer from "multer";

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file.originalname)

        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        console.log("teste")
        const id = new Date().getTime()
        cb(null, `${id}-${file.originalname}`)
    }

})
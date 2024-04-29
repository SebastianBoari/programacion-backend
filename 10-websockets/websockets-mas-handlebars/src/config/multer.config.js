import multer from 'multer'
import fs from 'fs'
import { __dirname, getCurrentDate, formatTitle } from '../utils.js'
import path  from 'path'

function destination (req, file, cb) {
    const productTitle = JSON.parse(req.body.data).title
    
    const formattedTitle = formatTitle(productTitle)

    const productDirectory = path.join(__dirname, '../data/products-media/', formattedTitle)
    
    fs.mkdirSync(productDirectory, { recursive: true })
    cb(null, productDirectory)
}

function filename (req, file, cb) {
    const productTitle = JSON.parse(req.body.data).title

    const formattedTitle = formatTitle(productTitle)

    const formattedFileName = formatTitle(file.originalname)

    cb(null,`${getCurrentDate()}-${formattedTitle}-${formattedFileName}`)
}

const storage = multer.diskStorage({
    destination: destination,
    filename: filename
})

const uploader = multer({ storage })

export { uploader }
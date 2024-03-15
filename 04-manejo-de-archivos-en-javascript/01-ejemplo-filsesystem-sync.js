const fs = require('fs')

fs.writeFileSync('./ejemplo.txt', 'Hola mundo!')

if (fs.existsSync('./ejemplo.txt')) {
    let contenido = fs.readFileSync('./ejemplo.txt', 'utf-8')
    console.log(contenido)

    fs.appendFileSync('./ejemplo.txt', ' Mas contenido')

    contenido = fs.readFileSync('./ejemplo.txt', 'utf-8')
    console.log(contenido)

    fs.unlinkSync('./ejemplo.txt')
}
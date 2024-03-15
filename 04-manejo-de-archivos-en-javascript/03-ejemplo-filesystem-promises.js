// FileSystem.promises

const fs = require('fs')

const operacionesAsincronas = async () => {
    await fs.promises.writeFile('./ejemploPromesa.txt', 'Hola mundo!')

    let resultado = await fs.promises.readFile('./ejemploPromesa.txt', 'utf-8')
    console.log(resultado)

    await fs.promises.appendFile('./ejemploPromesa.txt', ' Mas contenido')

    resultado = await fs.promises.readFile('./ejemploPromesa.txt', 'utf-8')
    console.log(resultado)

    await fs.promises.unlink('./ejemploPromesa.txt')
}

operacionesAsincronas()
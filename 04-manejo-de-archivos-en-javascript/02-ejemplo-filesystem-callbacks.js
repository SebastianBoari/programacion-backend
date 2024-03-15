const fs = require('fs')

fs.writeFile('./ejemplo.txt', 'Hola mundo!', (error) => {
    if (error) return console.log('Error al escribir archivo.')

    fs.readFile('./ejemplo.txt', 'utf-8', (error, resultado) => {
        if (error) return console.log('Error al leer archivo.')

        console.log(resultado)

        fs.appendFile('./ejemplo.txt', 'mas contenido', (error) => {
            if (error) return console.log('Error al actualizar archivo.')

            fs.readFile('./ejemplo.txt', 'utf-8', (error, resultado) => {
                if (error) return console.log('Error al leer archivo.')

                console.log(resultado)

                fs.unlink('./ejemplo.txt', (error) => {
                    if (error) return console.log('Error al eliminar archivo.')
                })
            })
        })
    })
})
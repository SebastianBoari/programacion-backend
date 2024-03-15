// Actividad en clase: Almacenar fecha y hora


// Realizar un programa que cree un archivo en el cual escriba la fecha y la hora actual. Posteriormente leer el archivo y mostrar el contenido por consola.

// Utilizar el módulo fs y sus operaciones de tipo callback.

const fs = require('fs')

class DateOnFile {

    #getDate() {
        let date = new Date().toLocaleString()

        return date
    }

    writeDate() {
        fs.writeFile('./actividad.txt', this.#getDate(), (error) => {
            if (error) return console.error('Error al escribir archivo.')
        })
    }

    readDate() {
        fs.readFile('./actividad.txt', 'utf-8', (error, data) => {
            if (error) console.error('Error al leer el archivo.')

            console.log(`Fecha y hora: ${data}`)
        })
    }
}

const dateOnFile = new DateOnFile()

dateOnFile.readDate()

dateOnFile.writeDate()

dateOnFile.readDate()

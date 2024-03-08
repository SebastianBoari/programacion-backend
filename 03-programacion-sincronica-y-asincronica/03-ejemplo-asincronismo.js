// Asincronismo

const fs = require('fs')

const escribirArchivo = (texto, callback) => {
    fs.writeFile('./ejemplo.txt', texto, callback)
}

console.log('Inicio del programa')

// El creador de esta función la definió como no bloqueante. Recibe un callback que se ejecutará al finalizar la escritura.

escribirArchivo('Hola mundo', () => {
    console.log('Terminé de escribir el archivo.')
})

console.log('Fin del programa.')

// Se mostrará por consola:
// > Inicio del programa
// > Fin del programa
// > Terminé de escribir el archivo

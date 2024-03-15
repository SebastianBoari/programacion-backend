// Asincronismo

// setTimeout

const temporizador = (callback) => {
    setTimeout(() => {
        callback()
    }, 5000)
}

let operacion = () => console.log('Realizando operacion.')

console.log('Iniciando tarea')

temporizador(operacion)

console.log('Tarea finalizada')

// setInterval

let contador = () => {
    let counter = 1

    console.log('Realizando operacion')

    let timer = setInterval(() => {
        console.log(counter++)

        if (counter > 5) {
            clearInterval(timer)
        }
    }, 1000)
}

console.log('Iniciando tarea')
contador()
console.log('Tarea finalizada')


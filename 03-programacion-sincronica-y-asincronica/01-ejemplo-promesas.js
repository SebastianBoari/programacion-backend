// Promesas

const dividir = (dividendo, divisor) => {
    return new Promise((resolve, reject) => { // Nota que al crear una promesa pasamos un callback don dos parametros: resolve y reject
        if (divisor === 0) {
            reject('No se pueden hacer divisiones entre cero.')
        } else {
            resolve(dividendo / divisor)
        }
    })
}


dividir(6, 3)
    .then(resultado => {
        console.log(resultado)
    })
    .catch(error => {
        console.log(error)
    })


dividir(4, 0)
    .then(resultado => {
        console.log(resultado)
    })
    .catch(error => {
        console.log(error)
    })
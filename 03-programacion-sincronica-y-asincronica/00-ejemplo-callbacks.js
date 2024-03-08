// Callbacks

// Ejemplo de uso de un callback: map

// Utilizaremos este array de prueba

let valoresOriginales = [1, 2, 3, 4, 5]

// Estamos acostumbrados a leer una función map de la siguiente forma:

let numerosValores = valoresOriginales.map(x => x + 1)

// El método map recibe como parametro una funcion en la que le indicamos que debe hacer para cada elemento del array. En este caso le indicamos que sume una a cada numero dentro del array.


// La función que estamos escribiendo dentro del método map es un callback.


function funcionCallback(valor) {
    if (valor % 2 === 0) {
        return valor
    }

    return 'no es par'
}

const cualEsPar = valoresOriginales.map(funcionCallback)

console.log(cualEsPar)

// Descomposición del método map.

// Vamos a recrear el comportamiento del método map, el objetivo es localizar en qué punto el método map llama de manera interna al callback que nosotros le pasamos.

// Creamos un array de prueba

const arrayDePrueba = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const miFuncionMap = (array, callback) => {
    let nuevoArray = []

    for (let i = 0; i < array.length; i++) {

        let nuevoValor = callback(array[i]) // Podemos ver el momento en que se ejecuta el callback

        nuevoArray.push(nuevoValor)
    }

    return nuevoArray
}

// Pongamos en comparación nuestra nueva función CON UN CALLBACK y la función map

let pruebaDeMiFuncionMap = miFuncionMap(arrayDePrueba, x => x + 1)

console.log(pruebaDeMiFuncionMap)

// EXTRA
// Notaron que el método map se ejecuta distinto? Anteponiendo el array al que queremos recorrer y un punto?

// Podemos lograr ese comportamiento haciendo lo siguiente:

Array.prototype.miFuncionMap = function (callback) {
    let nuevoArray = []

    for (let i = 0; i < this.length; i++) {

        let nuevoValor = callback(this[i])

        nuevoArray.push(nuevoValor)
    }

    return nuevoArray
}

console.log(arrayDePrueba.miFuncionMap(x => x + 1))

// Ejemplo de callbacks utilizando diferentes operaciones

const sumar = (num1, num2) => num1 + num2
const restar = (num1, num2) => num1 - num2
const multiplicar = (num1, num2) => num1 * num2
const dividir = (num1, num2) => num1 / num2

const realizarOperacion = (num1, num2, callback) => {
    let resultado = callback(num1, num2)

    return resultado
}

console.log(realizarOperacion(8, 8, sumar))
console.log(realizarOperacion(32, 16, restar))
console.log(realizarOperacion(4, 4, multiplicar))
console.log(realizarOperacion(32, 2, dividir))


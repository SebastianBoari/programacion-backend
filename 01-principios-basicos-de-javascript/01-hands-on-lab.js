// Creación de una clase contador

// ¿Cómo lo hacemos? Se creará una clase que permitirá llevar cuentas individuales según cada responsable.

// Definir clase Contador
// La clase se creará con un nombre, representando al responsable del contador.
// El contador debe inicializarse en 0
// Debe existir una variable estática que funcione como contador global de todas las instancias de contador creadas.

class Contador {
    static counter
    #personalCounter

    constructor() {
        Contador.counter = 0
        this.#personalCounter = 0
    }

    getCounter() {
        return Contador.counter
    }

    addCounter() {
        Contador.counter++

        return Contador.counter
    }

    getPersonalCounter() {
        return this.#personalCounter
    }

    addPersonalCounter() {
        this.#personalCounter++

        return this.#personalCounter
    }
}

const contadorUno = new Contador()

const contadorDos = new Contador()

const contadorTres = new Contador()

console.log(contadorUno.getCounter())

console.log(contadorUno.addCounter())

console.log(contadorUno.addCounter())

console.log(contadorDos.getCounter())

console.log(contadorTres.getCounter())
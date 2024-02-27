// Javascript y ES10

// Dynamic Import

// Supongamos que tenemos un archivo llamado "calculadora.js"

export default class calculadora {
    sumar = (num1, num2) => num1 + num2
    restar = (num1, num2) => num1 - num2
}

// Suponiendo que en otro archivo hacemos uso del archivo "calculadora.js" así se vería un dynamic import

let modo = "cálculos"

async function ejemploDynamicImport() {
    if (modo === "cálculos") {
        const { default: Calculadora } = await import('./calculadora.js')

        let calculadora2 = new Calculadora()

        console.log(calculadora2.sumar(1, 2))
    }
}

ejemploDynamicImport()


// Ejemplo trim

let string1 = '                  hola'

console.log(string1.trim())


// Ejemplo flat

let arrayAnidado = [1, 2, 3, [4, 5, 6, 7], 8, 9, [0]]

console.log(arrayAnidado.flat())
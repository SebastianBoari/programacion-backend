// Actividad en clase - Proyecto con Node

// Crear un proyecto de node que genere 10000 números aleatorios en un rango de 1 a 20.

// Crear un objeto cuyas claves sean los números salidos y el valor asociado a cada clave será la cantidad de veces que salió dicho número. Representar por consola los resultados.


function randomNumber(min, max) {
    if (!min || !max) return

    return Math.round(Math.random() * (max - min) + min)
}


function generateNumbers(qty, min, max) {
    let cicle = 0
    let numbers = []

    while (qty >= cicle) {
        const random = randomNumber(min, max)
        numbers.push(random)
        cicle++
    }

    return numbers
}


function timesNumberIsRepeated(arrayOfNumbers) {
    const countOccurrences = {}

    arrayOfNumbers.forEach((number) => {
        if (number in countOccurrences) {
            countOccurrences[number]++
        } else {
            countOccurrences[number] = 1
        }
    })

    return countOccurrences
}


const numbers = generateNumbers(10000, 1, 20)

const repeated = timesNumberIsRepeated(numbers)

console.log(repeated)
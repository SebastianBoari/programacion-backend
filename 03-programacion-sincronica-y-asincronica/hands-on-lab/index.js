const suma = (num1, num2) => {
    return new Promise((resolve, reject) => {
        if (num1 === 0 || num2 === 0) {
            reject('Operación innecesaria.')
        }

        if (num1 + num2 < 0) {
            reject('La calculadora sólo debe devolver valores positivos.')
        }

        resolve(num1 + num2)
    })
}


const resta = (num1, num2) => {
    return new Promise((resolve, reject) => {
        if (num1 === 0 || num2 === 0) {
            reject('Operación innecesaria.')
        }

        if (num1 - num2 < 0) {
            reject('La calculadora sólo debe devolver valores positivos.')
        }

        resolve(num1 - num2)
    })
}

const multiplicacion = (num1, num2) => {
    return new Promise((resolve, reject) => {
        if (num1 === 0 || num2 === 0) {
            reject('Operación innecesaria.')
        }

        if (num1 * num2 < 0) {
            reject('La calculadora sólo debe devolver valores positivos.')
        }

        resolve(num1 * num2)
    })
}

const division = (num1, num2) => {
    return new Promise((resolve, reject) => {
        if (num1 === 0 || num2 === 0) {
            reject('Operación innecesaria.')
        }

        if (num1 < 0 || num2 < 0) {
            reject('Solo se admiten valores positivos.')
        }

        resolve(num1 / num2)
    })
}

const calculos = async () => {

    try {
        // Suma
        const resultadoSumaUno = await suma(2, 2)
        console.log(resultadoSumaUno)

        const resultadoSumaDos = await suma(-3, 2)
        console.log(resultadoSumaDos)

        const resultadoSumaTres = await suma(0, 2)
        console.log(resultadoSumaTres)

        // Resta
        const resultadoRestaUno = await resta(2, 2)
        console.log(resultadoRestaUno)

        const resultadoRestaDos = await resta(-3, 2)
        console.log(resultadoRestaDos)

        const resultadoRestaTres = await resta(0, 2)
        console.log(resultadoRestaTres)

        // Multiplicacion
        const resultadoMultiplicacionUno = await multiplicacion(2, 2)
        console.log(resultadoRestaUno)

        const resultadoMultiplicacionDos = await multiplicacion(-3, 2)
        console.log(resultadoMultiplicacionDos)

        const resultadoMultiplicacionTres = await multiplicacion(0, 2)
        console.log(resultadoMultiplicacionTres)

        // Division
        const resultadoDivisionUno = await division(2, 2)
        console.log(resultadoDivisionUno)

        const resultadoDivisionDos = await division(-3, 2)
        console.log(resultadoDivisionDos)

        const resultadoDivisionTres = await division(0, 2)
        console.log(resultadoDivisionTres)

    } catch (error) {
        console.log(error)
    }

}

calculos()
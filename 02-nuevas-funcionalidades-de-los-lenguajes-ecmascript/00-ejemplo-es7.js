// Javascript y ECMAScript7 

// Ejemplos:

// Exponnential (**)
// Permite hacer el equivalente de la operación Math.pow(base, exp) para elevar un valor base a un exponente dado.

let valoresBase = [2, 4, 8]

// Antes
for (let i = 0; i < valoresBase.length; i++) {
    console.log(Math.pow(valoresBase[i], 2))
}

// Después
for (let i = 0; i < valoresBase.length; i++) {
    console.log(valoresBase[i] ** 2)
}

// Includes
// Corrobora si algún elemtno existe dentro del arreglo.

let nombres = ['Juan', 'Camilo', 'Maria', 'Ana']

if (nombres.includes('Camilo')) {
    console.log('Camilo presente.')
} else {
    console.log('Camilo ha faltado.')
}
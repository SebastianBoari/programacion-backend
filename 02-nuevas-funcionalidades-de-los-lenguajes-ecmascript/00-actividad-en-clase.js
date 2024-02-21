// Actividad en Clase: Utilización ES6-ES9

// Descripción de la actividad.
// Dados los siguientes objetos:

const objetos = [
    {
        manzanas: 3,
        peras: 2,
        carne: 1,
        jugos: 5,
        dulces: 2
    },
    {
        manzanas: 1,
        sandias: 1,
        huevos: 6,
        jugos: 1,
        panes: 4
    }
]

// Realizar una lista nueva  (array) que contenga todos los tipos de productos (no cantidades), consejo: utilizar Object.keys y Array.includes. Mostrar el array por consola.

const list1 = Object.keys(objetos[0])
const list2 = Object.keys(objetos[1])

const unirListas = (array1, array2) => {
    array1.forEach((element, index) => {
        if (!array2.includes(array1[index])) {
            array2.push(array1[index])
        }
    })

    console.log(array2)

}

unirListas(list1, list2)

// Posteriormente, obtener el total de productos vendidos por todos los objetos (utilizar Object.values)

const subTotal1 = Object.values(objetos[0]).reduce((acc, current) => acc + current, 0)
const subTotal2 = Object.values(objetos[1]).reduce((acc, current) => acc + current, 0)

const totalVendidos = subTotal1 + subTotal2

console.log(totalVendidos)




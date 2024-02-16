// Funciones

// ¿Cómo lo hacemos? Definiremos la función “mostrarLista”, la cual recibirá un arreglo con elementos como parámetro.

// Si la lista está vacía, devolver un mensaje indicando “Lista vacía”.
// Si la lista cuenta con elementos, mostrarlos 1 por 1 en consola.Finalizar el proceso devolviendo la longitud de la lista(Utilizar template strings)
// Invocar la función con los casos de prueba.


function mostrarLista(list) {
    if (list.length == 0) {
        console.log('Lista vacía.')
        return
    }

    list.forEach((element) => {
        console.log(element)
    })

    console.log(`La lista cuenta con ${list.length} elementos.`)
}


const listaUno = ['Fiat', 'Chevrolet', 'Peugeot', 'Toyota', 'Suzuki', 'Ford', 'Jaguar', 'Ferrari']
const listaDos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
const listaTres = []
const listaCuatro = ['Juan', 'Jose', 'Joaquin', 'Jalil', 'Jonás']

mostrarLista(listaUno)

mostrarLista(listaDos)

mostrarLista(listaTres)

mostrarLista(listaCuatro)
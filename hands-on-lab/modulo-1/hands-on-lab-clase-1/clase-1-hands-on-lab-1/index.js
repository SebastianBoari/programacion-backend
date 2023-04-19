// Hands on Lab

// Funciones

// ¿Cómo lo hacemos? Definiremos la función “mostrarLista”, la cual recibirá un arreglo con elementos como parámetro.
// Si la lista está vacía, devolver un mensaje indicando “Lista vacía”.

// Si la lista cuenta con elementos, mostrarlos 1 por 1 en consola. Finalizar el proceso indicando la longitud de la lista (Utilizar template strings)

// Invocar la función con los casos de prueba.


const listToDo = [
    {
        title: "Hacer las compras en el Supermercado",
        description: "Comprar arroz, pan y leche",
    },
    {
        title: "Dar de comer al perro",
        description: "2 tazas porque si no se come todo.",
    },
    {
        title: "Hacer ejercicio",
        description: "Espalda y piernas",
    },
    {
        title: "Estudiar programacion Backend",
        description: "Hacer el curso de coderhouse",
    },
    {
        title: "Pagar el alquiler",
        description: "Ir al banco a pagar el alquiler",
    },
    {
        title: "Ir al cine",
        description: "Ir a ver la nueva de Rapidos y Furiosos",
    },
    {
        title: "Tomar agua",
        description: "Minimo 2 litros",
    },
    {
        title: "Repasar la clase de hoy",
        description: "Repasar clase de programacion backend",
    },
];

const emptyList = [];

const showList = (list) => {
    if (list.length > 0) {
      list.forEach((item, i) => {
        setTimeout(() => console.log(`${item.title}: ${item.description}`), i * 500);
      });
      console.log(`Tareas totales por hacer: ${list.length}`);
    } else {
      console.log("Nada por hacer");
    }
};

// Lista con contenido:
showList(listToDo);

// Lista vacia:
showList(emptyList);
  

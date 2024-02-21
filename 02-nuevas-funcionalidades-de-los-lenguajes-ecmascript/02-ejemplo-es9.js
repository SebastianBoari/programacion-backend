// Javascript y ECMAScript9

let objeto1 = {
    propiedad1: 2,
    propiedad2: "b",
    propiedad3: true
}

let objeto2 = {
    propiedad1: "c",
    propiedad2: [2, 3, 4, 5]
}

// Spread Operator

// Nos sirve para hacer una destructuración del objeto, para poder utilizar sólo las propiedades que queremos.

let { propiedad1, propiedad2 } = objeto1 // Tomamos el objeto1 y lo rompemos para obtener sólo las primeras dos propiedades.

console.log(propiedad1)
console.log(propiedad2)

let objeto3 = { ...objeto1, ...objeto2 } // También se puede utilizar para vaciar propiedades de un objeto en otro objeto nuevo.

console.log(objeto1)
console.log(objeto2)
console.log(objeto3)

// Rest Operator

// Nos servirá para obtener un objeto SÓLO con las propiedades RESTANTES del objeto que hayamos destructurado, por ejemplo:
let objeto4 = {
    a: 1,
    b: 2,
    c: 3
}

let { a, ...resto } = objeto4 // Indicamos que queremos trabajar con la propiedad a y guardar en un objeto el resto de las propiedades de ese objeto, en caso de que lo necesitemos más adelante.

console.log(a)
console.log(resto)
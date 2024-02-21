// Javascript y ECMAScript8
const impuestos = { impuesto1: 2341, impuesto2: 341, impuesto3: 4611, impuesto4: 111 }

// Object.entries
let parLLaveValor = Object.entries(impuestos)
console.log(parLLaveValor)

// Object.keys

// Notamos como Object.keys obtiene en arreglos individuales la propiedad con su valor, en caso de que necesitemos utilizarlas por separado.

let soloPropiedades = Object.keys(impuestos)
console.log(soloPropiedades)

// Object.values

// Ahora podemos obtener solo los valores del objeto.
let soloValores = Object.values(impuestos)
console.log(soloValores)
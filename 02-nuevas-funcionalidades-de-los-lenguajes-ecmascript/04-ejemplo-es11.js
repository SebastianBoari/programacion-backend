// Javascript y ES11

// Ejemplo de operador nullish y variables privadas

// Nullish

// El operador nullish difiere del operador || (or) ya que || tambien ignora valores falsos (falseys)

let variableDePrueba = 0 // Remplazar esta variable de prueba por diferentes valores null, undefined y falseys.

let variablesAsignable = variableDePrueba || 'Sin valor'

console.log(variablesAsignable) // Tal vez yo necesitaba el valor 0, pero al utilizar || (or logico) se toma el valor por default.


let variableConNullish = variableDePrueba ?? 'sin valor'

console.log(variableConNullish) // Notamos que este punto si podemos tomar el valor 0 que necesitamos.

// El operador nullish solo va a actuar cuando el valor sea null o undefined pero un valor falso lo va a tomar por valido.


// Variables Privadas

class Persona {
    #fullname

    constructor(nombre, apellido) {
        this.nombre = nombre
        this.apellido = apellido
        this.#fullname = `${this.nombre} ${this.apellido}` // Asignamos el valor de la variable privada.
    }

    // Esta variable la podemos utilizar de manera interna. No se puede acceder a ella por fuera.

    getFullName = () => {
        return this.#fullname // La unica forma en la cual podemos obtener el valor de esa variable privada es pidiendola desde un metodo brindando una capa extra de seguridad.
    }

    #metodoPrivado = () => {
        // Tambien podemos declarar métodos privados.
    }
}

let instancia1 = new Persona('Mauricio', 'Gomez')

console.log(instancia1.getFullName()
)
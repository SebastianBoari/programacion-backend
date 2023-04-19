// CLASE 2: Funcionalidades de los lenguajes EMACScript y Programacion Sincronica y Asincronica

// En esta clase vamos a ver las distintas versiones de EcmaScript y vamos a repasar funcionalidades importantes para entrar en calor.

// Proceso de un cambio por ECMAScript
// 1- Se definen las nuevas funciones y se eliminan las obsoletas
// 2- Los cambios pasan a una etapa de prueba
// 3- Se publican y los navegadores deben ajustarle al nuevo versionado

// Nuestro punto de partida JAVASCRIPT ES6
// Por que emepzar por ES6? 
// La salida de ES6 marcó un antes y un después en la historia del lenguaje, ya que a partir de éste se lo comenzó a considerar una implementación “moderna”.

// |------------------------------------------------------------------------------------------------------------------------------------------------|


// ES7
// Principales funcionalidades de este release:
// Exponencial **
// Array Includes

// Ejemplo de uso de ** y  Array.includes

//Exponential ** 
// Permite hacer el equivalente de la operación Math.pow(base, exp), para elevar un valor base a un exponente dado.

// Ejemplos:
let initValues = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

// Con **
let newValues = initValues.map((value, index) => value**index);
console.log(newValues);

// Con Math.pow
let newValuesMath = initValues.map((value, index) => Math.pow(value, index));
console.log(newValuesMath);


// Includes: Comprueba si el argumento dado se encuentra dentro del arreglo, si se encuentra devuelve true, si no se encuentra devuelve false.
let nombres = [ "Camila", "Agustina", "Luciana", "Sofia", "Magali", "Juliana"];

if(nombres.includes("John Wick")){
    console.log("Kanau Te amoo!!")
} else {
    console.log("Kaneu no se encuentra :c");
}


// |------------------------------------------------------------------------------------------------------------------------------------------------|


// ES8
// Principales funcionalidades de este release:
// ASYNC/AWAIT
// Object.entries, Object.values, Object.keys

// Ejemplo de uso de Object.entries, Object.keys, Object.values

const impuestos = {
    impuesto1: 21,
    impuesto2: 34,
    impuesto3: 62
};

// OBJETC ENTRIES:
// Object.entries() es un método estático de JavaScript que se utiliza para devolver una matriz de pares clave/valor de un objeto dado. 
// Este método toma un objeto como argumento y devuelve una matriz de pares [clave, valor] correspondientes a cada propiedad enumerable del objeto, 
// en el mismo orden que se proporcionan.
// La sintaxis básica de Object.entries() es la siguiente: Object.entries(objeto)

// Ejemplo:
const impuestosEntries = Object.entries(impuestos);
console.log(impuestosEntries);

// OBJECT KEYS
// Object.keys() es un método estático de JavaScript que se utiliza para devolver un array de las claves (o nombres de propiedades) de un objeto dado.
// Este método toma un objeto como argumento y devuelve una matriz de claves correspondientes a cada propiedad enumerable del objeto, en el mismo orden que se proporcionan.
// La sintaxis básica de Object.keys() es la siguiente: Object.keys(objeto)

// Ejemplo:
const impuestosKeys = Object.keys(impuestos);
console.log(impuestosKeys);

// OBJECT VALUES
// Object.values() es un método estático de JavaScript que se utiliza para devolver un array de los valores de un objeto dado.
// Este método toma un objeto como argumento y devuelve una matriz de valores correspondientes a cada propiedad enumerable del objeto, en el mismo orden que se proporcionan.
// La sintaxis básica de Object.values() es la siguiente: Object.values(objeto)

// Ejemplo:
const impuestosValues = Object.values(impuestos);
console.log(impuestosValues);


// |------------------------------------------------------------------------------------------------------------------------------------------------|


// ES9
// Principales funcionalidades de este release:
// El resolvedor de promesas .finally() 
// Rest operator y spread operator para objetos y arrays

// Ejemplo de uso de destructuring, spread operator y rest operator

// Dados los siguientes objetos
const objeto1 = {
    propiedad1: 2,
    propiedad2: "b",
    propiedad3: true,
};

const objeto2 = {
    propiedad1: "c",
    propiedad2: [2, 3, 5, 6, 7],
}

// La "destructuración" o "desestructuración" (en inglés, "destructuring") en JavaScript es una técnica que permite extraer valores de arreglos
// y objetos en variables distintas de manera más concisa y legible.

// Ejemplo: 
// Aqui solo nos traemos dos propiedades y le ponemos un sobrenombre a la propiedad1 como propiedadUno pero propiedad2 la dejamos tal cual. 

const { propiedad1: propiedadUno, propiedad2 } = objeto1;

console.log(`Ejemplo de destructuring: ${propiedadUno}`);

console.log(`Ejemplo de destructuring: ${propiedad2}`);


// El "operador spread" en JavaScript (también conocido como operador de propagación o "spread operator" en inglés)
// es un operador que permite expandir los elementos de un arreglo, objeto o cadena de caracteres en lugares donde se esperan argumentos o elementos individuales.
// El operador spread se escribe con tres puntos consecutivos (...) y su función principal es "desempaquetar" los elementos de una estructura de datos para que puedan ser utilizados

// Ejemplo:
// Si dos elementos comparten el mismo nombre de propiedad se superponen. En este ejemplo vemos como la pripiedad1 y la propiedad2 del objeto1 fueron re-escritas por la propiedad1 y porpiedad2 del objeto2.
const objeto3 = {...objeto1, ...objeto2}

console.log(objeto3)


// Rest operator
// Rest operator nos servira para obtener un objeto solo con las propiedades restantes del objeto que hayamos desestructurado por ejemplo:
const objeto4 = {
    a: 1,
    b: 2,
    c: 3,
};

let {a, ...rest} = objeto4;

console.log(`Ejemplo de Rest Operator: ${a}, ${rest.b} y... ${rest.c}`);


// |------------------------------------------------------------------------------------------------------------------------------------------------|
// AVISO IMPORTANTE
// Nuevas implementaciones con ECMAScript 10 y 11
// Muchos de los cambios en estas versiones están estrechamente ligados con otros conceptos que irás aprendiendo a lo largo del curso.
// Por lo tanto, sólo se hará énfasis en los elementos con los que podemos trabajar a esta altura del curso.

// |------------------------------------------------------------------------------------------------------------------------------------------------|


// ES10
// Principales funcionalidades de este release:
// String.trim()
// Array.flat()
// Dynamic import

// Ejemplo de Dynamic import:

// Dynamic import permite importar sólo los módulos que necesito según una situación particular,
// lo cual permite optimizar la utilización de recursos, al pedir a la computadora sólo lo que estaré utilizando.

// Para que funcione debemos ir a package.json y debajo del main agregar esta porcion de codigo: ( "type": "module", )
let modo = "calculos";

async function ejemploImport() {
    if(modo === "calculos"){
        const { default: Calculadora } = await import('./calculadora.js');
        let calculadora2 = new Calculadora();
        console.log(calculadora2.sumar(2, 2));
    }
};

ejemploImport();

// Ejemplo de uso de los métodos trim y flat

// Metodo TRIM
// La función .trim() en JavaScript elimina los espacios en blanco al principio y al final de una cadena de texto y devuelve la cadena resultante sin esos espacios.

// Ejemplo:
let string1 = "                     Hola";

console.log(`Sin utilizar trim: ${string1}`);

console.log("Utilizando trim: " + string1.trim())

// Es de mucha utilidad, una de las tantas utilidades que tiene este metodo es validar que un campo completado por un usario no sean espacios en su totalidad.

// Ejemplo: 
let mensaje = "                                        ";

if(mensaje.trim().length > 0){
    console.log("Su mensaje ha sido enviado correctamente.");
} else {
    console.log("Mensaje no enviado, mensaje vacio.");
};

// Metodo FLAT
// La función .flat() en JavaScript crea una nueva matriz que es una versión aplanada (sin anidar) de la matriz original. 
// Elimina cualquier arreglo anidado dentro de la matriz original y devuelve una matriz unidimensional con todos los elementos.
// Si la matriz original tiene más niveles de anidación, estos no se aplanan. 
// Para aplana múltiples niveles de anidación se puede utilizar implementar una función personalizada.

let arrayAnidado = [1, 2, 3, 4, 5, 6, [32, 21, 65, 391], 100, 200, 52, 64, [171, 1231, [1, 2, 3, 4, 5, 6], 720, 910]]
// Ejemplo:
console.log(arrayAnidado.flat())


// |------------------------------------------------------------------------------------------------------------------------------------------------|


// ES11
// Principales funcionalidades de este release:
// Nullish Operator
// Variables privadas dentro de las clases

// |------------------------------------------------------------------------------------------------------------------------------------------------|

// NOTA AL MARGEN: 

// VALORES NULLISH
// Los valores null y undefined son considerados nullish, ya que aunque son falsos en un contexto booleano, no se consideran falsy porque no son valores que se puedan utilizar en operaciones 
// matemáticas o de concatenación de cadenas de texto. Por ejemplo, si intentas sumar un número con null o undefined, el resultado será NaN, mientras que si intentas concatenar una cadena de texto
// con null o undefined, obtendrás la cadena de texto original sin ningún cambio. Es por esto que a menudo se hace una distinción entre los valores nullish y los valores falsy.

let nullish1 = null;
let nullish2 = undefined;

if(nullish1){
    console.log("No es nullish");
} else {
    console.log("El argumento nullish1 es nullish")
};

if(nullish2){
    console.log("No es nullish");
} else {
    console.log("El argumento nullish2 es nullish")
};


// |------------------------------------------------------------------------------------------------------------------------------------------------|

// Ejemplo de operador nullish y variables privadas

// Nullish Operator
// El Nullish Operator de JavaScript, representado por "??", es un operador que devuelve su segundo operando si su primer operando es NULL o UNDEFINED, de lo contrario devuelve el primer operando. Es útil para comprobar explícitamente si una variable es null o undefined en lugar de un dato falsy (0, "", NaN, etc...), ya que otros operadores como el OR lógico "||" incluyen las variables con valor falsy cosa que Nullish ignora por completo y se centra solo en null y en undefined.

// Definimos una variable con un valor falsy
let variableFalsy = 0;

// El OR logico salta directamente a "Sin valor" 
let variable = variableFalsy || "Sin valor";
console.log(variable);

// El  Nullish operator nos mantiene el valor 0 a pesar de ser falsy porque entiende que es un valor definido. Algo muy util en casos que necesitemos guardar en una variable una respuesta de este tipo verificando que no sea null o undefined.
variable = variableFalsy ?? "Sin valor";
console.log(variable);


// |------------------------------------------------------------------------------------------------------------------------------------------------|


//Callbacks
// Un callback es una función como cualquier otra, la diferencia está en que ésta se pasa como parámetro (argumento) para poder ser utilizado por otra función.

// Permite que entonces las funciones ejecuten operaciones adicionales dentro de sí mismas


// Ejemplo de uso de un callback en la función map 

// Como repaso vamos a ver ejemplos de como funciona un callback en un map. 
// En principio es sencillo, el metodo MAP recibe una funcion que nosotros podemos definir entera dentro del mismo metodo porque es muy sencilla o bien podemos ejecutar funciones que esten declaradas por fuera del metodo MAP.
let valoresOriginales = [ 1, 2, 3, 4, 5 ];
console.log(valoresOriginales);

let valoresNuevos = valoresOriginales.map(x=>x*2);
console.log(valoresNuevos);

let valoresSinSentido = valoresNuevos.map(x=>x+"a");
console.log(valoresSinSentido);

const soyUnaFuncionCallback = (valor) =>{
    if(valor%2 === 0){
        console.log(`El valor: ${valor} es par.`);
    }  else{
        console.log(`El valor: ${valor} no es par.`);
    };
};

valoresOriginales.map(soyUnaFuncionCallback);


// |------------------------------------------------------------------------------------------------------------------------------------------------|


//Ejemplo de recreación interna de función map para localizar su callback

// ACLARACION: Si bien vamos a recrear el método "map" con un "for", en verdad los métodos pueden estar hechos en otros lenguajes y no es la forma verdadera en la que está implementado internamente el método "map". Esto es solo un ejercicio para tratar de imitar el comportamiento del método "map" con fines didácticos.

let arregloDePrueba = [1, 2, 3, 4, 5, 6];

const miPropioMap = (arreglo, callback) => {
    let nuevoArreglo = []; // Creamos un arreglo nuevo

    for (let i = 0; i < arreglo.length; i++) { // Recorremos con un for el arreglo que recibimos como parametro
        let nuevoValor = callback(arreglo[i]); // El callback que recibimos como parametro en la funcion lo ejecutamos en cada elemento recorrido del array en este punto.
        nuevoArreglo.push(nuevoValor); // Agregamos en cada iteracion del nuevo valor en el array que inicializamos al principio
    };
    
    return nuevoArreglo; // Devolvemos el nuevo array con todos los valores nuevos que partio del anterior array
};

// Arreglo con miPropioMap
console.log(miPropioMap(arregloDePrueba, x=>x*100));
// Arreglo con MAP
console.log(arregloDePrueba.map(x=>x*100));


// Si queremos que la funcion se ejecute sobre el mismo arreglo y no tener que pasarlo como parametro, debemos agregar nuestra nueva funcion en el prototipo del objeto array.

// La propiedad "Array.prototype" define un objeto prototipo que se aplica a todas las instancias de arreglos en JavaScript.
// Al agregar una nueva función a "Array.prototype", como se hace en el ejemplo con "miPropiaFuncionMap", esa función personalizada 
// se vuelve disponible para ser utilizada en cualquier instancia de arreglo en el código. 
// Esto significa que no es necesario pasar la función como parámetro cada vez que se llama, 
// ya que se ha agregado al prototipo del objeto Array y se puede invocar directamente en cualquier instancia de arreglo

Array.prototype.miPropiaFuncionMap = function(callback){
    let nuevoArreglo = []; 

    for (let i = 0; i < this.length; i++) { // "this" es una palabra clave en JavaScript que se refiere al objeto que está siendo utilizado en ese momento.
        let nuevoValor = callback(this[i]); 
        nuevoArreglo.push(nuevoValor); 
    };
    
    return nuevoArreglo; 
};

// Arreglo con miPropiaFuncionMap
console.log(arregloDePrueba.miPropiaFuncionMap(x=>x*2));
// Arreglo con Map
console.log(arregloDePrueba.map(x=>x*2));


// Si, vamos a interiorizar mucho en los callbacks, te dejamos un listado de 3 puntos importantes de por que es tan importante este aspecto.

// 1- Los callbacks son esenciales para la programación asincrónica.
// 2- Los callbacks permiten modularizar el código y hacerlo más reutilizable.
// 3- Los callbacks son importantes para permitir la comunicación y la integración entre diferentes tecnologías y lenguajes en el backend, 
// y también son fundamentales en la programación front-end en JavaScript.

// Ejemplo de callbacks utilizando diferentes operaciones:

const sumar = (num1, num2) => num1 + num2; 
const restar = (num1, num2) => num1 - num2;  
const multiplicar = (num1, num2) => num1 * num2;
const dividir = (num1, num2) => num1 / num2;

const ejecutarFuncion = (num1, num2, callback) =>{
    let resultado = callback(num1, num2);
    console.log(`El resultado es ${resultado}`);
};

ejecutarFuncion(2, 5, sumar);
ejecutarFuncion(2, 5, restar);
ejecutarFuncion(2, 5, multiplicar);
ejecutarFuncion(2, 5, dividir);

// Bien, ahora que tenemos grabado a fuego el concepto de las callbacks, podemos comprender su tremenda utilidad y, 
// por lo tanto, respetarlas. Debemos tener en cuenta que la función que ejecuta la callback no sabe lo que vamos a hacer, 
// somos nosotros los que debemos estar atentos a los tipos de datos para evitar romper el código.

// Callbacks: algunas convenciones
// El callback siempre es el último parámetro.
// El callback suele ser una función que recibe dos parámetros.
// La función llama al callback al terminar de ejecutar todas sus operaciones.
// Si la operación fue exitosa, la función llamará al callback pasando null como primer parámetro y si generó algún resultado este se pasará como segundo parámetro.
// Si la operación resultó en un error, la función llamará al callback pasando el error obtenido como primer parámetro.

// Como una funcion puede recibir un callback que a su vez reciba un callback que a su vez reciba un callback y asi sucesivamente se puede transformar 
// en algo contraproducente, es dificil de manejar los errores y de leer. Lo mejor siempre es evitar el llamado CALLBACK HELL.

// Ejemplo de Callback Hell:
function obtenerDatosDeAPI(url, callback) {
    hacerSolicitud(url, function(respuesta) {
      procesarDatos(respuesta, function(datos) {
        validarDatos(datos, function(datosValidados) {
          guardarDatos(datosValidados, function(datosGuardados) {
            callback(datosGuardados);
          });
        });
      });
    });
};
  
// Aunque el uso de callbacks puede conducir a "callback hell" (anidamiento excesivo de funciones callback), no es necesario evitarlos por completo. 
// Los callbacks pueden ser útiles cuando se utilizan de manera adecuada y se combinan con técnicas como la promificación o el uso de async/await 
// para hacer el código más legible y fácil de mantener.


// |------------------------------------------------------------------------------------------------------------------------------------------------|


// PROMESAS
// Es un objeto especial que nos permitirá encapsular una operación, la cual reaccionará a dos posibles situaciones dentro de una promesa:
// La promesa se cumple
// La promesa no se cumple

// Los estados de una promesa son fulfilled (promesa cumplida), rejected (promesa no cumplida) y pending (en espera de ser resuelta).
// Para manejar una promesa cuando se cumple, podemos encadenar .then()
// Para manejar una promesa cuando no se cumple, podemos utilizar .catch()
// Para manejar el final de una promesa, podemos utilizar .finally()


// Ejemplo de creación de una promesa
const dividirNumeros = (dividendo, divisor) => {
    return new Promise((resolve, reject) => {
        if(divisor === 0){
            reject("No se pueden hacer divisiones entre 0.");
        } else {
            resolve(dividendo/divisor);
        };
    });
};
// Si bien aquí tenemos por consola el resultado: Promise { 2 }, el problema es que si el divisor llega a ser un valor no válido como 0, el error nos va a romper la ejecución del código.
console.log(dividirNumeros(4, 2));

// Aquí entra el aspecto más interesante de las promesas, nos permiten manejar los resultados de manera asíncrona y sin bloquear la ejecución del código. 
// Si se produce un error, podemos manejarlo de forma controlada y continuar con la ejecución del código en lugar de que se produzca una excepción que detenga el programa.

dividirNumeros(4, 0)
.then((resultado) => {
    // Logica donde manejamos el resultado de la operacion si fue realizada con éxito
    console.log(resultado);
})
.then((resultado) => {
    // Podemos tener mas de una logica que maneje el resultado original de la promesa
    return resultado * 2;
})
.then((resultadoPorDos) => {
    // Pero esta logica ya no va a recibir el resultado original de la promesa, va a recibir lo que retorna el anterior .then().
})
.catch((error) =>{
    // Aqui podemos poner la logica para manejar los errores.
    console.error(error);
})
.finally(() => {
    // Aqui podemos hacer una logica que se ejecute siempre sin importar si la promesa se cumplio o no.
    console.log("La operacion se ha ejecutado.");
});


// |------------------------------------------------------------------------------------------------------------------------------------------------|


// Sincronismo vs Asincronismo

// Sincronismo: El sincronismo significa que las operaciones se ejecutan secuencialmente, una detrás de otra, 
// lo que hace que una operación deba esperar a que termine otra antes de poder empezar.

// Asincronismo: El asincronismo significa que las operaciones pueden ejecutarse simultáneamente, 
// sin esperar a que termine una operación antes de comenzar la siguiente.

// Sincronismo vs Asincronismo: La principal diferencia es que el sincronismo ejecuta las operaciones en secuencia,
// mientras que el asincronismo permite la ejecución simultánea de varias operaciones. 
// El sincronismo se utiliza cuando una operación debe completarse antes de que se pueda continuar con el programa, 
// mientras que el asincronismo se utiliza en situaciones en las que se requiere que las operaciones se ejecuten de manera independiente y sin bloquearse entre sí.


// Ejemplo de sincronismo:

function funcionA () {
    console.log(1);
    funcionB();   
};
function funcionB (){
    console.log(2);
    funcionC();
};
function funcionC (){
    console.log(3);
};

funcionA();


// Ejemplo de asincronismo: 
function ejemploAsincronico() {
    // Se ejecuta primero
    console.log("Inicio de la función");
    
    // Se ejecuta ultimo
    setTimeout(function() {
      console.log("Dentro de la función asincrónica");
    }, 0);
    
    // Se ejecuta segundo
    console.log("Fin de la función");
};
  
ejemploAsincronico();


// |------------------------------------------------------------------------------------------------------------------------------------------------|


// Problemas con .then y .catch:
//El uso exclusivo de .then y .catch puede limitar el manejo de múltiples operaciones asíncronas y restringir el acceso a los recursos y variables.
// Se necesita un entorno completo para trabajar con operaciones asíncronas y evitar el encapsulamiento excesivo de los resultados.

// Async / Await:
// Async / Await es una función en Javascript que permite gestionar un entorno asíncrono, reemplazando a .then y .catch. 
// Para utilizarla, se coloca async al inicio de la función, y await se utiliza para esperar el resultado de la promesa. 
// Es importante encerrar el cuerpo de la función en un bloque try-catch debido a que estas operaciones pueden tener éxito o fracasar.

const funcionAsincrona = async() =>{
    // Aqui dentro de la funcion es un entorno completamente asincrono.
    try{
        // Encerramos la operacion a realizar en un bloque try
        const resultado1 = await dividir(10, 5) // Ya no hay .then(), ahora solo esperamos por el resultado de la promesa
        const resultado2 = await dividir(20, 10) // Podemos ir encadenando awaits
        const resultado3 = await resultado1 + resultado2;
        console.log(`Una funcion asincrona async await con try catch te entrega este resultado: ${resultado3}`);
    }
    catch(err){
        console.log(err)
    };
};

funcionAsincrona();

// FIN
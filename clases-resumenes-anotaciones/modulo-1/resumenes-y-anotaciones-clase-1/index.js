// CLASE 1: Principios de programacion Backend y Principios basicos de JavaScript

// En esta clase vamos a ver la programacion web, distintas 
// maneras de probar Javascript, Tipos de datos, tipos de variables, javascript ES6 y funciones en javascript

// Las primeras clases son a modo de repaso del curso de JavaScript
// y para ir introduciendo conceptos que vamos a usar a lo largo del curso.


// |---------------------------------------------------------|


// Desarrollo web / Programacion Web:

// El desarrollo web se refiere a la creación y mantenimiento de sitios web en la World Wide Web (www) y sus redes.

// A medida que la tecnología avanzó, los sitios web evolucionaron de páginas estáticas a sitios web completos y aplicaciones web dinámicas.

// La evolucion requeria que haya gente que se encargue de una parte en especifico y asi nacio la division de frontend y backend.

// FrontEnd se refiere a la parte visual y de interacción directa con el usuario, como imágenes, colores, botones e interacciones.
// Su objetivo es mejorar la experiencia del usuario en la página o aplicación.

// Backend se encarga de la lógica y el manejo de la información detrás de la página o aplicación, incluyendo el almacenamiento de información, cálculos complejos, servidores y manejo de información en general.
// El usuario no interactúa directamente con el backend.

// Que es un stack? La carrera de Desarrollo full-stack impartida en Coderhouse enseña el stack MERN.

// Un "stack" es un conjunto de tecnologías que se utilizan juntas para desarrollar sistemas completos debido a su alta compatibilidad.
// El stack MERN se refiere al conjunto de tecnologías utilizadas para desarrollar aplicaciones web, 
// que incluye el uso de MongoDB, Express.js, React y Node.js. El stack permite que FrontEnd y Backend trabajen juntos de manera eficiente.


// |---------------------------------------------------------|

// ¿Cómo probamos Javascript?

// Para probar JavaScript en el cliente web, podemos utilizar la consola del navegador, ya que todo el motor de JavaScript vive en el navegador y no es necesario instalar nada adicional.

// Para utilizar JavaScript fuera del navegador, como en el caso de Node.js, debemos instalarlo en nuestro ordenador. 
// Node.js nos permite escribir JavaScript directamente desde nuestro computador y será la herramienta que utilizaremos en este curso para probar nuestro código JavaScript.


// |---------------------------------------------------------|


// Tipos de datos en Javascript

// Existen dos tipos de datos en JavaScript: primitivos y objetos.

// Los tipos de datos primitivos incluyen cadenas de texto (String), variables booleanas con valores true o false (Boolean) y números (Number). Además, hay dos tipos primitivos especiales: Null y Undefined. La copia de los datos primitivos es por valor.

// Los tipos de datos objeto incluyen objetos (Object), arrays (Array) y funciones. La copia de los datos objeto es por referencia, lo que significa que si cambiamos el valor de una copia, se cambiará el valor original también.


// |---------------------------------------------------------|


// Variables en Javascript

// En JavaScript, las variables son espacios de memoria utilizados para almacenar datos. Una variable puede almacenar cualquier tipo de dato y su valor puede cambiar a lo largo del programa, lo que permite la reutilización de la misma variable en diferentes partes del código.


// |---------------------------------------------------------|


// Javascript ECMAScript 6 (ES6)

// ¿Qué es ECMAScript?

// ECMAScript es un estándar que regula el lenguaje JavaScript para garantizar su compatibilidad. Cada nueva versión (ES6, ES7, ES11, etc.) introduce nuevas funcionalidades y características.
// Aunque las reglas se establecen en el estándar, la implementación varía entre plataformas y navegadores.

// Algunos cambios importantes que trajo ES6 son:
// LET y CONST
// Arrow functions
// Clases


// |---------------------------------------------------------|

// ¿Qué es una función?

// Son bloques de instrucciones que trabajan sobre un scope interno (conocido como scope local).
// Pueden encontrarse en su sintaxis básica o en su notación flecha.

// Ejemplo de funcion:
function funcionDeEjemplo (parametro1, parametro2) {
    let resultado = parametro1 + parametro2;
    let fueraDelScope = `La suma de ambos parametros me ha dado este resultado: ${resultado}`;
    // El return lanza fuera del scope lo que retorne
    return fueraDelScope;
};

console.log(funcionDeEjemplo(2, 2));

// Ejemplo de arrow function
const arrowFunction = (parametro1, parametro2) => {
    let resultado = parametro1 * parametro2;

    return console.log(`La multiplicacion de ambos parametros me ha dado este resultado: ${resultado}`);
};

arrowFunction(2, 5);

// La función flecha permite un return implícito, lo cual permite utilizar instrucciones sin llaves. Esto sólo es posible si la función tiene una instrucción.

// Ejemplo:
// Esta arrow tiene un return implicito 
const arrowSinReturn = (x, b) => x + b;
console.log(arrowSinReturn(2, 2));

// Esta arrow no tiene un return implicito, cuando usamos las llaves ya deberiamos de escribir el return porque si no la funcion no retorna un valor de undefined.
const arrowConLasLlavesEsNecesarioUtilizarReturn = () => {
    console.log("Hola");
};
console.log(arrowConLasLlavesEsNecesarioUtilizarReturn());


// |---------------------------------------------------------|


// Scopes

//El scope define el alcance de una variable o constante en un contexto específico. 
// El scope global afecta todo el archivo y el scope local afecta una función o bloque en particular.
// Esto evita confusiones al usar el mismo nombre para diferentes variables.


// |---------------------------------------------------------|


// Template String

// Funcionan como un superset de una string.
// Permite incrustar información dentro de ella, evitando la concatenación.
// Reconoce los saltos de línea, para mantener el formato.
// No presenta el límite de caracteres de una string normal 

// Ejemplo:
const edad = 52;

console.log(`Su edad es ${edad}`);


// |---------------------------------------------------------|


// Closures

// Las closures son funciones que mantienen variables internas y pueden acceder a los ámbitos tanto de sí mismas como de su función padre.
// Se utilizaban antes de la implementación de clases en Javascript, pero ahora su uso se limita a casos específicos debido al cambio en el lenguaje.


// |---------------------------------------------------------|


// Clases

// Una clase en Javascript sirve para representar una entidad y modelar diferentes objetos con la misma forma y funcionalidades.
// Una vez definida, podemos crear múltiples instancias con los mismos atributos y métodos.

// Palabra reservada class 
// Es buena practica empezar con mayusculas las clases.
class Persona{
    // Las clases cuentan con una funcion constructor, se ejecuta cada vez que se instancie la clase. 
    constructor(nombre){
        console.log("Nuevo objeto creado!");
        this.nombre = nombre;
        // Para declarar variables internas y utilizarlas necesitamos colocar un this. antes de la variable
    };
    // "static" es una variable que puede usarse sin necesitar instancia, todas las instancias pueden acceder a ella. Y si en alguna instancia cambia, cambia para todas las instancias.
    static especie = "humano";

    // Metodos (Funciones creadas para la clase)
    saludar = () => {
        console.log(`Hola, soy ${this.nombre}, mucho gusto!`);
    };
    getEspecie = () => {
        console.log(`Aunque no lo creas, soy un ${Persona.especie}`);   
    };
};

let persona1 = new Persona("Jorge");
let persona2 = new Persona("Catalina");

persona1.saludar();
persona2.saludar();
persona1.getEspecie();
persona2.getEspecie();


// FIN



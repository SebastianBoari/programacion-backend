// CLASE 3: Manejo de archivos en JavaScript
// Archivos sincronos, manejo de archivos, file system, promesas. NodeJS, modulos nativos, NPM, instalaciones globales y locales.


// |----------------------------------------------------------|


// Repasando conceptos anteriormente vistos:

// Sincronismo
// Las operaciones sincronicas nos sirven cuando buscamos que una funcion se ejecuta una tras otra o sea de manera secuencial. Independientemente del tiempo que demore cada operación.

// Ejemplode sincronismo
console.log("Este console log es el primero");
console.log("Este console log es el segundo");
console.log("Este console log es el tercero");

// Asincronismo
// Las operaciones asincronas o no bloqueantes nos sirven cuando necesitamos realizar varias tareas sin depender de que otra tarea finalice. Se utilizan para realizar alguna operacion sin afectar el fluujo principal.

// setTimeout
// setTimeout se usa para programar una tarea que se ejecutará después de un cierto tiempo.
// Es una función asincrónica, lo que significa que no bloquea el hilo principal de ejecución y permite que otras operaciones se realicen mientras espera el tiempo establecido para ejecutar la tarea programada.

// Ejemplo de asincronismo con setTimeout
console.log("Primer console.log");
setTimeout(() => {
    console.log("Segundo console.log");
}, 0); // Aunque pongamos 0 en tiempo de espera la funcion al ser asincrona se sale del flujo
console.log("Tercer console.log");

// setInterval
// El método setInterval es similar a setTimeout, pero en lugar de ejecutar una tarea después de un tiempo determinado,
// reinicia el conteo y ejecuta la tarea cada vez que se cumple el intervalo de tiempo establecido. Este método devuelve un
// "apagador" que permite detener el intervalo cuando se cumple cierta operación. 
// Es comúnmente utilizado para establecer límites de tiempo en formularios y en ciertas páginas web donde se requiere que el usuario complete una tarea dentro de un tiempo determinado.

// Ejemplo de asincronismo con setInterval
let numero = 1;
const contador = () => {
    const contadorInterno = setInterval(() => {
        console.log(numero);
        numero++;
        if(numero>5){
            clearInterval(contadorInterno)
        };
    }, 1000);
    return contadorInterno;
};

console.log("Iniciando tarea")
contador();
console.log("Tarea finalizada!");


// |----------------------------------------------------------|


// Hasta el momento hemos estado trabajando siempre con el espacio en memoria con el que trabaja Javascript. Mejor dicho: Persistencia en Memoria. Y para practicar y hacer programas sencillos esta bien pero en le mundo laboral hay problemas importante con esto.

// Cuando comenzamos a manejar más info nos encontramos con la molestia de tener que comenzar desde 0 cada vez que el programa termina su ejecucion.

// En el mundo real la informacion se guarda en archivos. Asi podemos leer y recuperar informacion.
// Ahora vamos a aprender a manejar archivos en JavaScript.


// |----------------------------------------------------------|


// 📁FS en NodeJS
// fs es la abreviación de FileSystem, una herramienta de manejo de archivos proporcionada por Node.js.
// Con fs, es fácil crear, leer, actualizar o eliminar un archivo sin tener que trabajar con datos binarios o hacer transformaciones complejas. 
// En lugar de eso, se pueden escribir solo algunas líneas de código.


// ⚠️IMPORTANTE: Vamos a utilizar soluciones previamente desarrolladas por otros desarrolladores.
// Es importante saber que, si bien puede parecer muy impresionante manejar archivos sin módulos preexistentes y a programación pura y dura, en la vida real necesitamos resolver problemas específicos y no nos podemos permitir aprender todo.
// Enfócate en que tus soluciones aborden los problemas que te competen. 
// PD: Siempre es un buen ejercicio investigar y saber como funcionan las herramientas que utilizas día a día.


// Como usar File System?
// Fs viene instalado junto a NodeJS por lo que solo importandolo a nuestro proyecto ya podremos usarlo. 

const fs = require('fs');

// FS Sincronico
// El uso de fs síncrono en Node.js es sencillo. Basta con agregar la palabra "Sync" después de cada operación que se desea realizar.
// Las principales operaciones que se pueden hacer con fs síncrono son: 
// 🟢 writeFileSync: Escribir contenido en un archiv (si el archivo no existe lo crea.);

// 📖 readFileSync: Leer contenido de un archivo

// ➕ appendFileSync: Añadir contenido a un archivo sin sobreescribirlo

// ❌ unlinkSyn: Eliminar archivo

// 🔎 existsSyn: Corrobora que si el archivo ya existe


// Ejemplo de uso de fs sincronico

fs.writeFileSync('./ejemplo.txt', 'Hola mundo'); // Crea el archivo

if(fs.existsSync('./ejemplo.txt')){ // Verifica si el archivo existe
    let contenido = fs.readFileSync('./ejemplo.txt', 'utf-8'); // Lee el contenido del archivo
    console.log(contenido); 

    fs.appendFileSync('./ejemplo.txt', ' todo bien todo correcto? Y yo que me alegro!'); // Agrega contenido al archivo

    contenido = fs.readFileSync('./ejemplo.txt', 'utf-8'); // Vuelve a leer el contenido del archivo
    console.log(contenido);

    fs.unlinkSync('./ejemplo.txt'); // Elimina el archivo
};


// FS con callbacks

// El uso de fs con callbacks es similar a las operaciones síncronas, pero requiere un último argumento que debe ser un callback.
// Como convención, el primer argumento suele ser un error para determinar si la operación tuvo éxito o no.
// Solo la función readFile maneja un segundo argumento con el resultado de la lectura del archivo.

// Es importante tener en cuenta que el manejo por callbacks es totalmente asíncrono, por lo que se debe tener cuidado al utilizarlo.

// Principales operacions con FS Callbacks

// 🟢 writeFile = Para escribir contenido en un archivo. Si el archivo no existe, lo crea. Si existe, lo sobreescribe. Al sólo escribir, su callback sólo maneja: (error)=>

// 📖 readFile = Para obtener el contenido de un archivo. Como pide información, su callback es de la forma: (error, resultado)=>

// ➕ appendFile = Para añadir contenido a un archivo. ¡No se sobreescribe!, al sólo ser escritura, su callback sólo maneja: (error)=>

// ❌ unlink = Es el “delete” de los archivos. eliminará todo el archivo, no sólo el contenido. Al no retornar contenido, su callback sólo es (error)=>

// Ejemplo:


fs.writeFile('./ejemploCallback.txt', 'Hola desde Callback', (error)=>{
    if(error) return console.log('Error al escribir el archivo')
    fs.readFile('./ejemploCallback.txt', 'utf-8', (error, resultado) =>{
        if(error) return console.log('Error al leer el archivo');
        console.log(resultado);
        fs.appendFile('./ejemploCallback.txt', ' todo bien? Todo correcto? Y yo que me alegro!', (error)=>{
            if(error) return console.log('Error al actualizar el archivo');
            fs.readFile('./ejemploCallback.txt', 'utf-8', (error, resultado) =>{
                if(error)return console.log('Error al leer el archivo.');
                console.log(resultado);
                fs.unlink('./ejemploCallback.txt', (error)=>{
                    if(error) return console.log('No se pudo eliminar el archivo');
                });
            });
        });
    });
});
// Así queridos amigos, terminamos en un "callback hell" que, al intentar realizar operaciones muy complejas, sólo con intentar leerlas, nos va a alisar el cerebro🧠


// |----------------------------------------------------------|


// 👨‍💻⚠️ACTIVIDAD EN CLASE: Almacenar fecha y hora
// Consigna: 

// ✅ Realizar un programa que cree un archivo en el cual escriba la fecha y la hora actual.

// ✅ Posteriormente leer el archivo y mostrar el contenido por consola.

// ✅ Utilizar el módulo fs y sus operaciones de tipo callback.

const almacenarFecha = () =>{
    const fechaActual = new Date();
    const fechaYHora = fechaActual.toLocaleString('es-ES');

    fs.writeFile('./fecha.txt', `${fechaYHora}`, (error)=>{
        if(error){
            return console.log('Error al intentar escribir el archivo.');
        };
        fs.readFile('./fecha.txt', 'utf-8', (error, resultado)=>{
            if(error){
                return console.log('Error al intentar leer el archivo');
            };
            console.log(resultado);
        });
    });
};

almacenarFecha();


// |----------------------------------------------------------|


// FS Con Promesas
// Ahora viene el punto mas valioso de todo esto: trabajar con archivos de manera asincrona, con promesas. Esto lo haremos con su propiedad fs.promises

// Al usar el módulo fs.promises, indicamos que la operación debe ser ejecutada de manera asíncrona, pero en lugar de utilizar un callback, podemos manejarla con .then +.catch o con async/await. La estructura y los argumentos son casi idénticos al modo síncrono.

// Las principales operaciones que se pueden realizar son:

// 🟢 fs.promises.writeFile: Para escribir contenido en un archivo/ Si el archivo no existe, se crea. Si existe, se sobrescribe.

// 📖 fs.promises.readFile: Para obtener el contenido de un archivo.

// ➕ fs.promises.appendFile: Para añadir contenido a un archivo. No se sobrescribe, se agrega al final del archivo.

// ❌ fs.promises.unlink: Es la función para eliminar archivos. Elimina todo el archivo, no solo su contenido.

// Ejemplo: 

const operacionesAsync = async() =>{
    // Creamos/Escribimos el archivo
    await fs.promises.writeFile('./ejemploPromesa.txt', 'Hola desde una promesa!')

    // Leemos el archivo creado
    let resultado = await fs.promises.readFile('./ejemploPromesa.txt', 'utf-8');
    console.log(resultado);

    // Modificamos el archivo
    await fs.promises.appendFile('./ejemploPromesa.txt', ' todo bien? Todo correcto? Y yo que me alegro!');

    // Leemos el resultado 
    resultado = await fs.promises.readFile('./ejemploPromesa.txt', 'utf-8');
    console.log(resultado);

    // Finalmente, borramos el archivo
    await fs.promises.unlink('./ejemploPromesa.txt');
};

operacionesAsync();
// Como resultado obtenemos un código mucho mas limpio, simple y más entendible.


// |----------------------------------------------------------|


// Bien, ahora que ya sabemos controlar un archivo .txt vamos a aprender a menejar datos complejos con archivos JSON.
// Para poder almacenar elementos más complejos, nos apoyaremos del elemento JSON.stringify() y JSON. parse()

// Es importante tener en cuenta que no siempre se trata de archivos de texto plano (.txt) y que a veces necesitamos almacenar variables que contienen objetos o arreglos. 

//Para manejar este tipo de datos más complejos, podemos utilizar el formato JSON y los métodos JSON.stringify() y JSON.parse().

const objetoObject = {
    name: "Piolandra",
    apellido: "Piolazo"
};

const objetoString = JSON.stringify(objetoObject);
const objetoObject2 = JSON.parse(objetoString);
console.log(typeof objetoObject); // En consola se puede ver que es un objeto
console.log(typeof objetoString); // En consola se puede ver que es un string
console.log(typeof objetoObject2); // En consola se puede ver que es un objeto


// |----------------------------------------------------------|


// 👨‍💻⚠️ACTIVIDAD EN CLASE: Lectura y escritura de archivos

// Consigna: 
// Escribir un programa ejecutable bajo node.js que realice las siguientes acciones:

// ✅ Abra una terminal en el directorio del archivo y ejecute la instrucción: npm init -y

// ✅ Esto creará un archivo especial (lo veremos más adelante) de nombre package.json

// ✅ Lea el archivo package.json y declare un objeto con el siguiente formato y datos:

/*const info = {
    contenidoStr: (contenido del archivo leído en formato string),
    contenidoObj: (contenido del archivo leído en formato objeto),
    size: (tamaño en bytes del archivo)
}*/

// ✅ Muestre por consola el objeto info luego de leer el archivo

// ✅ Guardar el objeto info en un archivo llamado info.json dentro de la misma carpeta de package.json

// ✅ Utilizar el módulo promises de fs dentro de una función async/await y utilizar 

// ✅ JSON.stringify + JSON.parse para poder hacer las transformaciones json->objeto y viceversa

const leerPackage = async() => {
    try{
        let package = await fs.promises.readFile('./package.json', 'utf-8');
     
        const info = {
            contenidoStr: package,
            contenidoObj: JSON.parse(package),
            size: Buffer.byteLength(package), //🥴 Esta se la debo a ChatGPT 
        };

        console.log(info);
    }
    catch (error){
        console.error(error); // Notese como usamos el console.error en vez de console.log para diferenciar los mensajes por consola.
    };

};

leerPackage();


// |----------------------------------------------------------|


// Cuando trabajamos con el almacenamiento de datos en un archivo, hay algunas desventajas que debemos tener en cuenta.
// A medida que la información crece, puede ser costoso en términos de recursos leer y modificar datos en el archivo completo.
// Además, cuando se modifica un dato puntual en el archivo, es necesario reescribir todo el archivo, lo que puede ser un proceso innecesario y pesado.
// También debemos considerar la posibilidad de que toda la información esté en un archivo fácilmente extraíble con un simple drag&drop a otra carpeta, lo que puede ser peligroso.

// Teniendo en cuenta estas ventajas y desventajas, es importante preguntarnos si el almacenamiento en archivos es algo común en el desarrollo web o si es más propio de sistemas operativos.


// |----------------------------------------------------------|


// Repasando nuestra herramienta de trabajo NodeJS

// Node JS es un entorno de desarrollo completo sobre el cual viven y se ejecutan nuestros programas de JavaScript.
// Su motor V8, igual que el de Google Chrome, convierte el código JavaScript a código máquina para poder procesarlo. 
// Además, cuenta con funcionalidades internas del lenguaje JavaScript gracias a sus ajustes con ECMAScript.
// Node JS fue creado principalmente para backend, lo que permite construir aplicaciones ligeras, rápidas e incluso en tiempo real gracias a su sistema de desarrollo basado en eventos. 
// Todo esto se basa en la infinidad de funciones y estructuras que ofrece JavaScript para resolver diferentes problemas. 


// |----------------------------------------------------------|


// 👨‍💻⚠️ACTIVIDAD EN CLASE: Proyecto de node

// ✅ Crear un proyecto de node que genere 10000 números aleatorios en un rango de 1 a 20.

// ✅ Crear un objeto cuyas claves sean los números salidos y el valor asociado a cada clave será la cantidad de veces que salió dicho número. Representar por consola los resultados.

const numbers = [];

for (let i = 0; i < 10000; i++) {
  const number = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
  numbers.push(number);
};

const counts = {};
numbers.forEach(number => {
  counts[number] = counts[number] ? counts[number] + 1 : 1; 
});

console.log(counts);


// |----------------------------------------------------------|


// Modulos nativos de NodeJS

// Los módulos nativos de NodeJS son herramientas útiles para resolver tareas complejas a medida que nuestros programas se vuelven más complejos.
// Estos módulos ya están incluidos en NodeJS al momento de su instalación, lo que nos permite utilizarlos de manera eficiente sin tener que programar todo desde cero.

// 📁 fs: Módulo utilizado para manejo de archivos. Sirve para manejar otro modelo de persistencia.

// 🪦 crypto: Permite hacer operaciones de encriptación y cifrado para información sensible. Sirve para mejorar la seguridad de los datos

// 📨 http: Permite crear un servidor básico bajo el protocolo http. Sirve para crear nuestro primer servidor de solicitud/respuesta.

// 🔀 path: Permite el correcto manejo de rutas. Sirve para evitar ambigüedad al trabajar con rutas.


// |----------------------------------------------------------|


// 💡¿Qué es NPM?
// “Node Package Manager”, El cual refiere a un manejador de paquetes de Node. Éste permite que la comunidad de desarrolladores puedan crear sus propios módulos, para poder subirlos a la nube y así otros desarrolladores puedan utilizarlos. 

// 🔗 Pagina oficial de NPM: https://www.npmjs.com/


// 💡¿Qué es package.json?
// package.json es un archivo que generamos dentro de nuestros proyectos, el cual contendrá distintas especificaciones del mismo, cosas como:

//  El nombre de tu proyecto
//  La versión de tu proyecto
//  Algunos scripts para correr el proyecto
//  ¿De qué depende el proyecto?


// Dependencias
// Para utilizar dependencias de terceros, agregamos un campo "dependencies" en package.json que indica qué módulos están instalados y son necesarios para que el proyecto funcione correctamente.

// Como instalar dependencias?
// De forma local: 
// Con el comando "npm install (dependencia a instalar)" o "npm i (dependencia a instalar)"
// De forma global:
// Con el comando "npm install (dependencia a instalar) -g" o "npm i (dependencia a instalar) -g"


// Instalaciones globales e instalaciones locales
// ¿Global o local?
// Cuando se instala una dependencia de manera local, significa que el módulo instalado solo pertenece y se utiliza dentro de ese proyecto en particular. 
// Si se desea utilizar la misma dependencia en otro proyecto, es necesario volver a instalarla ya que no son compartidas.

// Por otro lado, instalar una dependencia de manera global implica que el módulo se instalará para todos los proyectos, lo que evita la necesidad de instalarlo cada vez que se crea un nuevo proyecto.
// Para instalar de manera global, solo se debe agregar la flag -g.

//⚠️ Instalar una dependencia global puede tener desventajas ya que se limita a todos nuestros proyectos a utilizar la misma versión instalada.
// Si se actualiza la dependencia a una versión más reciente, todos los proyectos que usen la versión anterior se volverán obsoletos y será necesario actualizar el código de cada uno de ellos.
// Esto puede ser un problema engorroso y consumir mucho tiempo. Por lo tanto, se recomienda evitar la instalación global de dependencias a menos que sea absolutamente necesario.

// Versionado de dependencias
// Una versión define puntos específicos en los que un código tiene ciertas características, ciertas sintaxis, ciertas funcionalidades, e incluso ciertos errores.


// 💡Manejo de versiones en NPM
// Las versiones se basan en 3 elementos básicos:

// v2.0.4

// ❌ Versiones mayores (primer dígito): Hace referencia a cambios grandes, tanto que ya no son compatibles con otras versiones anteriores.
// ⚠️ Versiones menores (segundo dígito): Hace referencia a cambios en ciertas características y funcionalidades que no afecten a versiones anteriores, es decir, podemos actualizarlo sin afectar la estructura del proyecto.
// 🟢 Parches (último dígito): Hace referencia a bugfixes o manejo de defectos del código actual. No se está cambiando nada estructuralmente hablando, sólo estamos arreglando cosas.


// Política de actualizaciones de dependencias: Operadores para actualizar versiones

// En nuestro package.json podemos colocar operadores que permitan tener un mejor control de las versiones:

// El operador ^ Sirve para instalar la versión menor más alta, esto significa que no  actualizará a alguna versión mayor, protegiendo así a nuestro código de incompatibilidades

// El operador ~ Sirve para instalar sólo los parches, lo cual significa que no altera las versiones menores, sólo las ligeras correcciones a bugs del código

// Si no colocamos ningún operador, se instalará la versión exacta que hayamos colocado.

// Comandos para actualizar en NPM

// "npm outdated" es un comando que leerá las dependencias instaladas en nuestro package.json y, según el operador que hayamos colocado, nos indicará qué es lo que nos “conviene”.
// También nos indica cuál es la última versión encontrada en internet, en caso de que nos interese.

// "npm update" el cual se encargara de realizar los cambios que indicamos


// |----------------------------------------------------------|


// 👨‍💻⚠️ACTIVIDAD EN CLASE: Calculadora de edad

// Realizar un programa que utilice la  dependencia momentjs  (deberá instalarse por npm install).

// ✅ Debe contar con una variable que almacene la fecha actual (utilizar moment())

// ✅ Debe contar con una variable que almacene sólo la fecha de tu nacimiento (utilizar moment).

// ✅ Validar con un if que la variable contenga una fecha válida (utilizar el método isValid());

// ✅ Finalmente, mostrar por consola cuántos días han pasado desde que naciste hasta el día de hoy. (utilizar el método diff()

const moment = require('moment');

const fechaActual = moment();
const fechaNacimiento = moment('1998-07-01');

if (!fechaNacimiento.isValid()) {
  console.log('Fecha no valida');
} else {
  const diasTranscurridos = fechaActual.diff(fechaNacimiento, 'days');

  console.log(`Han pasado ${diasTranscurridos} desde tu nacimiento`);
};


// FIN
// CLASE 4: Protocolo HTTP, Servidor con ExpresJS, Objeto request. HTTP status, concepto de API REST, Metodos POST, PUT, DELETE

// HTTP (Hyper Text Transfer Protocol) 
// HTTP es un protocolo que permite la comunicación entre sistemas, lo cual permite que las computadoras se comuniquen entre sí y con los servidores para obtener datos en páginas web.

// Como funciona? 
// Es un modelo de peticion-respuesta. El cliente hace una peticion y el servidor se encarga de responder.


// Ejemplo de servidor HTTP

/*
const http = require('http');

const server = http.createServer((request, response)=>{
    response.end("Hola mundo desde Backend");
});

server.listen(8080, ()=>{
    console.log("Listening on port 8080"); 
});
*/

// Si visitamos la ruta http://localhost:8080 luego de levantar el servidor con NodeJS podremos ver el mensaje de "Hola mundo desde Backend"


// |---------------------------------------------------------------|


// Servidor con Express.js

// Express.js es un framework minimalista que simplifica el desarrollo de servidores más complejos. 
// Con Express.js, puedes utilizar diferentes rutas para las peticiones, mejorar la estructura de tu proyecto y manejar funcionalidades más complejas, así como utilizar middlewares.

// A diferencia de HTTP, Express es un modulo de tercero que debemos instalar. (recordar el comando: npm init -y para inicializar el proyecto con todos los valores por defecto).

// Para instalar Express: npm i express, recordar que se le puede agregar @latest al final para descargar la ultima version disponible.

/// Para recordar: (Ahora utilizaremos CommonJS hasta que lleguemos a una instancia mas avanzada en que abandonaremos CommonJS y pasaremos a Modules)

// Ejemplo de servidor con ExpressJS:

/*
const express = require('express');     // CommonS
// import express from 'express';      // js Modules

// Ejemplo de servidor ExpressJS
const app = express();

app.get('/saludo', (req, res)=>{
    res.send("Hola a todos, ahora desde ExpressJS");
});

app.listen(8080,()=>console.log("Server Up"));
*/

// Si visitamos la ruta http://localhost:8080/saludo veremos el saludo


// |---------------------------------------------------------------|


// 🟢🧑‍💻ACTIVIDAD EN CLASE: Otras respuestas con Express

// Consigna: 

// Crear un proyecto basado en express js, el cual cuente con un servidor que escuche en el puerto 8080. Además de configurar los siguientes endpoints:

// El endpoint del método GET a la ruta  ‘/bienvenida’ deberá devolver un html con letras en color azul, en una string, dando la bienvenida.

// El endpoint del método GET a la ruta ‘/usuario’ deberá devolver un objeto con los datos de un usuario falso: {nombre, apellido,edad, correo}

/*
app.get('/bienvenida', (req, res)=>{ // http://localhost:8080/bienvenida
    res.send('<h1 style="color: blue;">Bienvenido</h1>');
}); 

const usuarioFalso = {
    nombre: "Nombre",
    apellido: "Falso",
    edad: "52",
    correo: "correofalso@fakeil.com"
};


app.get('/usuario', (req, res)=>{ // http://localhost:8080/usuario
    res.send(usuarioFalso);
});
*/


// |---------------------------------------------------------------|


// Objeto request

// El objeto request (req) es una herramienta importante al crear endpoints en JavaScript.
// Mientras que hemos estado utilizando principalmente el objeto "res" para responder a las solicitudes, hemos estado dejando de lado el "req".
// El objeto req tiene tres propiedades principales: req.query, req.params y req.body. 

// req.params

// Ejemplo de uso req.params:
/*
const express = require('express');

const app = express();

const usuarios = [
    {id: 1, nombre: "Mauricio", apellido: "Espinosa", edad: 25},
    {id: 2, nombre: "Natalia", apellido: "Gomez", edad: 31},
    {id: 3, nombre: "Aldo", apellido: "Gonzalez", edad: 72}
];

app.get('/', (req, res)=>{
    res.send({usuarios});
});
app.get('/:idUsuario',(req, res)=>{
    let idUsuario = +req.params.idUsuario;
    let usuario = usuarios.find(u=>u.id===idUsuario);
    if(!usuario) return res.send({error:"Usuario no encontrado"});

    res.send({usuario});
});

app.listen(8080,()=>console.log("Server Up"));
*/

// req.query

// ⚠️IMPORTANTE: 
// La función "app.use(express.urlencoded({extended:true}));" se utiliza en ExpressJS para habilitar la funcionalidad de análisis de cuerpos de solicitud codificados en URL o de formulario.
// Esto permite que la aplicación pueda recibir datos enviados a través de formularios HTML o en la cadena de consulta de una URL y procesarlos para su uso en la lógica de la aplicación.
// El parámetro "extended" se utiliza para indicar si se deben analizar objetos con propiedades anidadas en el cuerpo de la solicitud.

// Ejemplo de uso de req.query

/*
const express = require('express');

const app = express();

const usuarios = [
    {id:"1", nombre:"Dalia", apellido:"Gomez", genero:"F"},
    {id:"2", nombre:"Myrna", apellido:"Flores", genero:"F"},
    {id:"3", nombre:"Virgina", apellido:"Mendoza", genero:"F"},
    {id:"4", nombre:"Sofia", apellido:"Gomez", genero:"F"},
    {id:"5", nombre:"Agustin", apellido:"Fuentes", genero:"M"},
    {id:"6", nombre:"Valentino", apellido:"Cepeda", genero:"M"}
];

app.get('/',(req, res)=>{ // http://localhost:8080/?genero=M
    let genero = req.query.genero;
    if(!genero||(genero!=="M"&&genero!=="F")) return res.send({usuarios});

    let usuariosFiltrados = usuarios.filter(usuario=>usuario.genero===genero);

    res.send({usuarios:usuariosFiltrados});
});

app.listen(8080,()=>console.log("Server Up"));
*/

// ¿Qué diferencia hay con params?

// La principal diferencia entre req.params y req.query es que en req.query se pueden incluir varias consultas, ya que las queries no están incorporadas en la ruta, sino que son un elemento aparte.
// Por lo tanto, si desconocemos la cantidad de cosas que se van a consultar en nuestra ruta, es mejor utilizar queries, mientras que si solo necesitamos un número específico y limitado de parámetros, deberíamos optar por params.


// |---------------------------------------------------------------|


// ¿Qué es un código de  estado?

// Un código de estado es una respuesta que se recibe del servidor cuando se realiza una solicitud a través del protocolo HTTP.
// Este código indica el estado o el resultado del proceso de la solicitud, lo que nos permite saber cómo se encuentra o cómo finalizó dicho proceso.

// 1xx: Status Informativo
// 2xx: Status OK
// 3xx: Status de redireccion 
// 4xx: Status error del cliente
// 5xx: Status error en servidor


// |---------------------------------------------------------------|


// Comprendiendo una API REST

// Una API (Application Programming Interface) es un conjunto de definiciones y reglas que permiten a dos equipos trabajar juntos.
// Funciona como un "contrato" entre el front-end y el back-end, lo que permite a los desarrolladores responder preguntas sobre cómo deben interactuar con ella, como a qué endpoint deben apuntar para una tarea en particular, qué método usar para un recurso y qué información enviar en una solicitud.

// REST (REpresentational State Transfer) es un conjunto de reglas que definen la estructura de los datos que se van a transferir en una comunicación a través del protocolo HTTP.
// Mientras que el protocolo HTTP y las APIs definen cómo comunicarse correctamente, REST define cómo debe ser estructurado el cuerpo del mensaje que se transmitirá.
// Es importante cumplir con las tres reglas para una comunicación efectiva y correcta: el protocolo HTTP, la API y la estructura definida por REST.

// Existen diferentes formatos para estructurar los datos en una comunicación, siendo los más importantes JSON y XML.
// La elección del formato dependerá de las necesidades del proyecto. En nuestro caso, utilizaremos JSON, ya que su sintaxis es más amigable y se parece a un objeto.

// ¿Qué características debe tener una API REST?
// Arquitectura Cliente-Servidor sin estado

// La arquitectura Cliente-Servidor sin estado es una forma de diseñar aplicaciones web en la que cada mensaje HTTP contiene toda la información necesaria para comprender la petición.
// Esto significa que ni el cliente ni el servidor necesitan recordar ningún estado de las comunicaciones entre mensajes, lo que los mantiene débilmente acoplados y evita que el cliente tenga que conocer los detalles de implementación del servidor.
//  La capacidad de ser cacheable es una de las restricciones que debe cumplir una arquitectura REST.
// Esto significa que los recursos deben tener una indicación explícita de si pueden o no ser cacheados por el cliente.
// Si un recurso es cacheable, el cliente puede almacenar una copia en caché y utilizarla para futuras solicitudes idénticas, evitando así la necesidad de realizar la solicitud al servidor cada vez.
// Esto reduce la carga en el servidor y mejora la eficiencia del sistema en general.

// Las operaciones principales de una API son POST, GET, PUT y DELETE. Estas se asemejan a las operaciones CRUD en bases de datos (alta, lectura, modificación y baja). Las respuestas de estas peticiones HTTP deben incluir códigos de estado que indiquen el resultado correspondiente.

// En un sistema REST, cada recurso debe tener una URI (Uniform Resource Identifier) única que facilite el acceso, consulta, modificación y eliminación de información. Además, permite compartir la ubicación exacta del recurso con terceros.

// Al hacer una petición al servidor, éste puede devolver hipervínculos asociados a otros recursos del cliente. 
// Esto permite navegar a muchos otros recursos REST simplemente siguiendo enlaces, sin necesidad de utilizar registros u otra infraestructura adicional.

// En HTTP, un método es una definición que indica el tipo de petición que se está realizando sobre un endpoint. Los clientes pueden llamar al mismo endpoint con diferentes métodos para indicar qué operación quieren realizar en el recurso. Los principales métodos son:

// GET: Obtener un recurso
// POST: Crear o añadir un recurso
// PUT: Modificar un recurso
// DELETE: Eliminar un recurso

// Para testear una API no podemos utiliar el navegador ya que desde la URL del navegador solo podemos realizar peticiones del tipo GET, por eso vamos a usar Thunderclient o Postman para realizar los tests.


// |---------------------------------------------------------------|


// ⚠️IMPORTANTE: Para que Express pueda interpretar mensajes de tipo JSON en formato urlencoded al recibirlos debemos agregar estas lineas:

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// |---------------------------------------------------------------|


// Como utilizar un metodo POST? Repasemos todos los conceptos en este ejemplo.

const express = require('express'); // CommonJS, mas adelante veremos JS Modules
const app = express(); // Guardamos en una variable la funcion express para que sea más facil trabajar  

app.listen(8080,()=>console.log("Server Up")); // Inicializamos la escucha del servidor en el puerto 8080 de nuestro localhost.

app.use(express.json()); // Preparamos a express para que pueda recibir JSON al momento de la petición
app.use(express.urlencoded({ extended: true })); // Preparamos a express para que pueda recibir parametros mas complejos por URL.

let users = []; // Aqui almacenaremos los usuarios que vayamos creando a través de las peticiones POST desde Thunderclient o Postman

// http://localhost:8080/user
app.post('/user',(req, res)=>{ 
    let user = req.body;
    
    if(!user.firstName || !user.lastName){
        return res.status(400).send({status: "error", error: "Incomplete values"});
    };

    console.log(user); // Esto es solo para ver como llega la informacion a modo de ejemplo

    users.push(user);
    res.status(201).send({status: "success", message: "User created"});

});

// Ahora solo falta entrar a POSTMAN o a Thunderclient ingresar la ruta: // http://localhost:8080/user con el metodo POST y en body mandar un objeto con los datos del usuario.


// |---------------------------------------------------------------|


// 🟢🧑‍💻ACTIVIDAD EN CLASE: Servidor con GET, POST, PUT y DELETE.

// Dada la frase: “Frase inicial”, realizar una aplicación que contenga un servidor en express, el cual cuente con los siguientes métodos: 

// GET '/api/frase': devuelve un objeto que como campo ‘frase’ contenga la frase completa

// GET '/api/palabras/:pos': devuelve un objeto que como campo ‘buscada’ contenga la palabra hallada en la frase en la posición dada (considerar que la primera palabra es la #1).

// POST '/api/palabras': recibe un objeto con una palabra bajo el campo ‘palabra’ y la agrega al final de la frase. Devuelve un objeto que como campo ‘agregada’ contenga la palabra agregada, y en el campo ‘pos’ la posición en que se agregó dicha palabra.

// PUT '/api/palabras/:pos': recibe un objeto con una palabra bajo el campo ‘palabra’ y reemplaza en la frase aquella hallada en la posición dada. Devuelve un objeto que como campo ‘actualizada’ contenga la nueva palabra, y en el campo ‘anterior’ la anterior.

// DELETE '/api/palabras/:pos': elimina una palabra en la frase, según la posición dada (considerar que la primera palabra tiene posición #1).


// CLASE 5: Express Router, Express y Middlewares, Multer, Motores de plantillas, plantillas y Handlebars

// En la clase anterior teniamos muchas rutas igels que solo se diferenciaban por el metodo. 
// Esto funciona bien mientras solo tengamos que mostrar/manejar una entidad sola como usuarios. 

// Pero que pasaría si debemos implementar:
// Usuarios
// Productos
// Tickers
// Eventos
// Membresias
// Transportes
// Sucursales
// Empleados

// Cuantos metodos atiborrados tendriamos en un solo archivo?
// Un router express nos permitira separar los endpoints "comunes" en entidades separadas. 

// Ejemplo: (De paso repasamos conceptos de las clases anteriores):

// CommonJS
const express = require('express');
// JS MODULES
// import 'express' from 'express';

// Guardamos la funcion express() en una variable para poder trabajar de forma mas sencilla con esta funcion.
const app = express();

// ⚠️🚧Recordar utilizar estas lineas para que express pueda recibir por body JSON, informacion de formularios y datos mas complejos por URL.🚧⚠️
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializamos un array de objetos que contengan los productos
const products = [
    { id: 1, name: 'Coca cola', price: 19 },
    { id: 2, name: 'Pepsi', price: 19 },
    { id: 3, name: 'Lays', price: 29 }
];

// Ver productos: Instanciamos una ruta para productos con el metodo GET
app.get('/api/products', (req, res) => {
    res.send({ products });
});
// Ver producto por ID: Instanciamos una ruta para productos con el metodo GET
app.get('/api/products/:id', (req, res) => {
    // Logica para ver producto por ID
});

// Agregar productos: Instanciamos una ruta para productos con el metodo POST
app.post('/api/products', (req, res) => {
    const product = req.body;
    products.push(product);
    res.json({ products });
});

// Modificar productos: Instanciamos una ruta para productos con el metodo PUT
app.put('api/products/:id', (req, res) => {
    // Logica para modificar productos
});

// Eliminar producto: Instanciamos una ruta para productos con el metodo DELETE
app.delete('/api/products/:id', (req, res) => {
    // Logica para borrar productos
});

// Inicializamos la escucha del servidor en el puerto 8080 de nuestro localhost.
app.listen(8080, () => console.log('Server Up'));

// Solamente para hacer el CRUD de productos ya tenemos 5 rutas, en estos casos simples la logica entran en pocas lineas de codigo, pero imaginate que realizamos operaciones mas complejas que requieran muchas lineas de codigo por cada ruta.

// Ahora como deciamos "Un router express nos permitira separar los endpoints "comunes" en entidades separadas" suena mas interesante no? 


// Como aplicar un router? 

// Dentro de la carpeta src (source) creamos una carpeta llamada routes. El entrypoint de nuestro server debe quedar por fuera.

// Cuerpo de un router

// Importar Router:
//CommonJS:
const { Router } = require('express');
// JS Modules: import { Router } from 'express';

// Guardar en una constante la funcion:
const router = Router();

// Cramos una instancia del router para el metodo GET
router.get('/', (req, res) => {
    // Cuerpo del servicio para GET users
});

// Exportamos el router
// CommonJS:
module.exports = router;
// JS Modules: export default router;


// |-----------------------------------------------------|

// Servicio de archivos estáticos con Express

// Cómo funciona?
// Nuestro servidor tiene la posibilidad de alojar recursos que pueden ser visibles para el cliente
// Podemos configuirar una carpeta para que el usuario pueda acceder y ver los recursos de manera directa
// En este curso y en proyecto profesionales vas a encontrar archivos en la carpeta "public" o sea recursos públicos de fácil acceso.

// Como utilizarlos?

// Los dos casos de uso mas usuales para la carpeta "public":
// Cuando necesitas alojar imagenes y servirselas al cliente
// Cuando necesitas alojar una página web (html, css, js). En esta clase haremos una página sencilla para mostrar el alcance del directorio "public"

// Como convertir una carpeta en un recurso estatico?
app.use('/static', express.static('public'));

// Ejemplo de ruta: http://localhost:3000/static/hello.html


// Path absoluto
// El path que se proporciona a la función express.static es relativo al directorio desde donde inicia el proceso node.
// Por eso si ejecutamos la aplicación Express desde cualquier otro directorio, es más seguro utilizar el path absoluto del directorio al que desea dar servicio:

app.use('/static', express.static(__dirname + 'public'));


// |-----------------------------------------------------|


// 🧑‍💻🟢 ACTIVIDAD EN CLASE: Carpeta public
// Partiendo del ejemplo anterior, recrear la estructura con un index.html para poder visualizarse en la ruta raíz. 

// En este archivo deberá haber un formulario donde podremos ingresar una mascota a partir del método POST. Dicho POST conectará al endpoint raíz del router pets

// Configurar el router pets para que pueda recibir el json por parte del formulario (recordar express.json()  y express.urlencoded({extended:true}))

// Verificar con POSTMAN que la información llegue al servidor y se guarde correctamente.


// |-----------------------------------------------------|


// 💡¿Qué es un middleware?

// Un middleware es una operación que actúa como intermediario entre la petición del cliente y el servicio del servidor ExpressJS. 

// Se utiliza mediante la sintaxis "app.use" y se ejecuta antes de llegar al endpoint correspondiente. (Donde app es igual a express())

// Los middlewares pueden ser utilizados para dar información sobre las consultas realizadas, autorizar o rechazar usuarios, agregar o alterar información en la solicitud antes de llegar al endpoint y redireccionar según sea necesario.

// En algunos casos, los middlewares también pueden finalizar la petición sin que llegue al endpoint por motivos de seguridad.🔐

// ⚠️❗IMPORTANTE: Los middleware se resuelven en el orden que son declarados. 


// |-----------------------------------------------------|

// Tipos de Middlewares

// Una aplicación Express puede utilizar los siguientes tipos de middleware:

// Middleware a nivel de aplicación
// Middleware a nivel endpoint
// Middleware a nivel del Router
// Middleware de manejo de errores
// Middleware incorporado
// Middleware de terceros

// Veremos todos.


// |-----------------------------------------------------|


// Ejemplo de cada tipo de Middleware:

// Middleware a nivel de aplicación:
const app = express();

app.use(function (req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

app.listen(8080, () => console.log('Server Up'));
// En este ejemplo nmuestra una funcion de middleware sin ninguna via de acceso de montaje. La funcion se ejecuta cada vez que la aplicacion recie una solicitud.


// |-----------------------------------------------------|


// Middleware a nivel endpoint:
const app = express();

// Funciones middleware
function middleware1(req, res, next){
    req.dato1 = 'un dato';
    next();
};
function middleware2(req, res, next){
    req.dato2 = 'otro dato';
    next();
};
// Se pueden agregar una o multiples middlewares en los procesos de cada ruta como se muestra a continuacion:
app.get('/ruta1', middleware1, (req, res) => {
    res.json({
        dato1: req.dato1
    });
});

app.get('/ruta2', middleware1, middleware2, (req, res) => {
    res.json({
        dato1: req.dato1,
        dato2: req.dato2
    });
});

app.listen(8080, () => console.log('Server Up'));


// |-----------------------------------------------------|


// Middleware a nivel del Router:
const app = express();
const Router = express.Router();

// funcion middleware sin via de acceso de montaje
// El codigo es ejecutado por cada peticion al router. Funcion de la misma manera que el middleware de nivel de aplicacion, excepto que esta enlazado a una instancia de express.Router();

router.use(function(re, res, next){
    console.log('Time: ', Date.now());
    next();
});


// |-----------------------------------------------------|


// Middleware de manejo de errores

// Estas funciones se definen de la misma forma que otras funciones de middleware, excepto que llevan cuatro argumentos en lugar de tres, específicamente con la firma (err, req, res, next):

app.use(function (err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Ups, something broke!');
});


// |-----------------------------------------------------|


// Middleware incorporado
// La única función de middleware incorporado en Express es express.static. Esta función es responsable del servicio de archivos estáticos:

app.use(express.static('public', options));

// express.static(root, [options])
// El argumento root especifica el directorio raíz desde el que se realiza el servicio de activos estáticos.
// El objeto options opcional puede tener las siguientes propiedades: dotfiles, etag, extensions, index, lastModified, maxAge, redirect, setHeaders


// |-----------------------------------------------------|


// Middleware de terceros
// Podemos instalar y utilizar middlewares de terceros para añadir funcionalidad a nuestra aplicación.
// El uso puede ser a nivel de aplicación o a nivel de Router. Por ejemplo, instalamos y usamos la función de middleware de análisis de cookies cookie-parser.

// npm install cookie-parser

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

// load the cookie-parsing middleware
app.use(cookieParser());



// |-----------------------------------------------------|

// MULTER, un middleware de terceros para porder recibir archivos binarios como imagenes, pdf, hojas de calculo, etc...

// En algun punto vamos a necesitar recibir archivos a través de un formulario por ejemplo. En estos casos nos puede ayudar contar con middlewares de terceros como MULTER.

// Recordemos que no es la unica forma de resolver esto si no que es una opcion de muchas y que como desarrolladores debemos buscar la solucion mas efectiva para el caso al que nos estamos afrontando.

// Como utilizar MULTER?

// 1. Instalar Multer
// npm install multer como cualquier otra dependencia

// 2. Configurar MULTER en el proyecto
// Crear un archivo 'utils' al mismo nivel del entrypoint de nuestro servidor express e importarlo en ese archivo y exportarlo.


const multer = require('multer');

// Antes de instanciar multer, debemos configurar donde se almacenararn los archivos
const storage = multer.diskStorage({
    // destination hara referencia a la carpeta donde se va a guardar el archivo
    destination: function(req, file, cb){
        cb(null, __dirname+'./public/img'); // Especificamos la carpeta dne este punto
    },
    // filename hara referencia al nombre final que contendra el archivo
    filename: function(req, file, cb){
        cb(null, file.originalname); // originalmente indica que se conserve el nombre inicial
    }
});

const uploader =  multer({ storage });

module.exports = uploader;


// 3. Utilizar uploader

// Como es un middleware esta ve en medio de la ruta y de la funcion callback (req,res)

router.post('/', uploader.single('file'), (req, res) => {
    
});
// Podemos utilizar el uploader de dos formas principalmente:

// uploader.single(‘nombre del campo’): permitirá subir un único archivo, su resultado estará en req.file

// uploader.array(‘nombre de campos’): permitirá subir múltiples archivos, su resultado estará en req.files


// |-----------------------------------------------------|

// 🧑‍💻🟢 ACTIVIDAD EN CLASE: Express + Multer

// Basado en el formulario para ingresar una mascota al sistema:

// Configurar el formulario para añadir un campo input type=”file” name “file” para que la mascota a agregar pueda tener una “imagen representativa”.

// El nombre del archivo guardado se formará con el nombre original anteponiéndole un timestamp (Date.now()) seguido con un guión. Ej: 1610894554093-clase1.zip.

// Corroborar que la imagen se guarde correctamente. Guardar la ruta del archivo guardado en un campo “thumbnail”.


// |-----------------------------------------------------|


// La mayoria de frameworks/librerias de frontend resuelven una problematica puntual del desarrollo web: EL DINAMISMO.
// En el backend ya vimos que podemos hacer vistas para el usuario, en este caso estaticas, pero que pasa si necesitamos dinamismo?
// En el mundo laboral es muy común toparte con esta necesidad y para eso una solución muy recurrente son los motores de plantillas.
// Existen muchos motores de plantillas, algunos son: Handlebars, EJS, PugJS. Cada uno tiene su sintaxis y sus reglas de reemplazo de plantillas. 
// En funcionamiento son similares y tratan de dar un poco de dinamismo a las paginas estaticas pero de forma sencilla.

// En este curso daremos Handlebars porque es el mas popular pero con luego con leer la documentacion de cualquier otro motor de plantillas deberias de ser capaz de utilizar cualquiera.

// Recordar que los motores de plantillas son una solucion sencilla para problemas sencillos en donde el dinamismo requerido sea minimo. Si el proyecto necesita de vistas complejas es mucho mas eficaz y escalable desarrollar una vista front-end con React, Angular, etc.. pero en la mayoria de casos las vistas que debemos realizar en el backend son para que el cliente pueda monitorizar alguna informacion puntual.

// Hanldebars es un motor de plantillas pensado para agregar un nivel medio de dinamismo, recuerda que hay mas motores de plantillas y que algunos son mas adecaduados para un proyecto que otros.

// El motor preprocesa el html y reemplaza las variables que marcamos con doble corchetes {{ varieble }} dando el efecto de dinamismo.

// No esta pensado para realizar actualizaciones en tiempo real ya que cualquier cambio en las variables se necesita recargar el DOM.


// |-----------------------------------------------------|


// Instalación y configuración de Handlebars en ExpressJS

// Para instalar handlebars debemos instalar la version compatible con ExpressJS la cual es: npm i express-handlebars

// 1- Empezar con un proyeco con un servidor ExpressJS como los que hemos hecho con anterioridad

// 2- Agregamos una carpeta Views al mismo nivel que el entrypoint de nuestro servidor.

// 3- Dentro de la carpeta "views" creamos un index.handlebars. Luego creamos una carpeta llamda "layouts" donde crearemos un archivo main.handlebars

// 4- En el archivo main.handlebars creamos nuestra estrucutra principal de HTML5 con sus etiquetas doctype, html, head, meta, script, head, body, etc.. Dentro del body escribiremos {{{body}}} que es donde inyectaremos nuestras plantillas


// |-----------------------------------------------------|


// 🧑‍💻🟢 ACTIVIDAD EN CLASE: Datos personales 

// Basándonos en el ejemplo anterior, desarrollar una vista web que permita mostrar los datos personales de múltiples usuarios. 

// Utilizar la misma estructura mostrada por el profesor, para poder levantar un servidor que utilice handlebars como motor de plantillas. 

// Configurar la plantilla para que muestre los siguientes datos: nombre, apellido, edad, correo, teléfono.

// Crear un array “users” que cuente con 5 usuarios de tipo objeto, cada uno con los datos mencionados arriba.

// Al llamar al método get ‘/’, generar un número random para elegir a alguno de los usuarios y mostrar el usuario seleccionado al azar en la plantilla.

// Observar los diferentes resultados en el navegador. 


// |-----------------------------------------------------|

// 💡NO SOLO PODEMOS REEMPLAZAR

// Vimos que con Handlebars podemos reemplazar texto estático por variables pero tambien podemos realizar estructuras condicionales o de repeticion (if, switch, map, forEach) similar al renderizado que haciamos en React pero con su propia sintaxis con sus reglas y limites.

// Condicion: 
// {{#if condicion}} Etiqueta de apertura (No admite expresiones, solo booleanos)
// <html>Texto a renderizar: {{variable a renderizar}}</html>
// {{/if}} Etiqueta de cierre

// Ciclo:
// {{#each elementoIterable}} // Etiqueta de apertura(array)
//     <html>
//         <html>{{this.key}}</html>
//         <html>{{this.key}}</html>
//     </html>
// {{/each}} // Etiqueta de cierre


// |-----------------------------------------------------|


// 💡VISTAS EN UN ROUTER:
// Una forma prolija de trabajar con plantillas conforme crece nuestro sitio, es crear routers de vistas y routers de respuesta de API.
// La gran diferencia es que los routers de vistas van a responder con res.render y los demas con res.send
// En este curso vamos a diferenciar los controladores de vistas de las respuestas de la api dejando las rutas raices '/' para las vistas y las rutas '/api' para una respuesta directa del servidor.


// |-----------------------------------------------------|


// 🧑‍💻🟢 ACTIVIDAD EN CLASE: Handlebars con express

// Realizar un formulario en una nueva plantilla.

// Se creará un archivo “register.handlebars” como nueva plantilla, donde se colocará un form

// Dicho form debe servir para registrar un usuario, por lo que contará con nombre, correo, y contraseña

// Enviar los datos a una ruta POST ‘/user’, y guardar el usuario en un arreglo. Confirmar que el guardado se realice exitosamente. 

# Router y Multer

Temario:

- Express Router
- Express y Middlewares
- Multer


## Router en Express

Notaron en la clase anterior como se tornaba bastante engorroso al tener rutas "iguales" pero con distintos métodos.

Tal vez no se percataron porque solo estábamos manejando usuarios. Ahora imagínense si tuviéramos que manejar

- Usuarios
- Productos
- Tickets
- Eventos
- Membresías
- Transportes
- Sucursales

Router en express nos permitirá separar los endpoints en entidades separadas.

Nuestro código resultara mas organizado y las diferentes entidades tendrán aislado el comportamiento unas de otras.

### ¿Cómo aplicar un router?

Dentro de la carpeta raiz de nuestro proyecto agregaremos una subcarpeta llamada "routes".

Por ejemplo si el router es de usuarios creamos un archivo con esta estructura:

`users.router.js`

Dentro del mismo escribimos

```javascript
import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    // Cuerpo del servicio para GET users
})
```

## Hands on Lab (00-hands-on-lab)

¿Cómo lo hacemos? Se crearán dos routers: users y pets

- El router de users debe tener la ruta principal /api/users

- El router de pets debe tener la ruta principal /api/pets

- Ambos deben tener, de manera interna, un array para almacenarlos.

- Ambos deben contar con un método get en su ruta raíz para poder obtener el arreglo.

- Ambos deben contar con un método POST en su ruta raíz para poder agregar un usuario o mascota según sea el router.

- Conectar los routers al archivo app.js para tener listo el apuntador al router. 

- Probar funcionalidad con Postman.


## Servicio de archivos estáticos con Express

Nuestro servidor puede alojar recursos que pueden ser visibles para el cliente, podemos configurar una carpeta para que el usuario acceda a su contenido.

Comúnmente es la carpeta "public" la que se destina para este uso.

Se utiliza generalmente cuando necesitamos alojar multimedia o alojar una pagina web (html, css, js)

### ¿Cómo convertir una carpeta en un recurso estático? (00-ejemplo)

Para poder utilizar los recursos de una carpeta de manera estática, basta conque en el servidor especifiquemos como “express.static” dicha carpeta con la siguiente sintaxis:

```javascript
app.use(express.static('public'))
```

A continuación podemos cargar los archivos que queramos en el directorio public:

`http://localhost:3000/hello.html`

**Nota**: Express busca los archivos relativos al directorio estático, por lo que el nombre del directorio estático no forma parte del URL

### Prefijo virtual

Para crear un prefijo virtual (donde el path de acceso no existe realmente en el sistema de archivos) para los archivos servidos por express.static, debemos especificar un path de acceso de montaje para el directorio estático:

```javascript
app.use('/static', express.static('public'))
```
Así podemos cargar los archivos que hay en el directorio public desde el prefijo /static.

`http://localhost:3000/static/hello.html`


### Path absoluto

El path que se proporciona a la función express.static es relativo al directorio desde donde inicia el proceso node.

Por eso si ejecutamos la aplicación Express desde cualquier otro directorio, es más seguro utilizar el path absoluto del directorio al que desea dar servicio:

```javascript
app.use('/static', express.static(__dirname + '/public'))
```

## Actividad en Clase (00-actividad-en-clase)

Partiendo del ejemplo anterior, recrear la estructura con un index.html para poder visualizarse en la ruta raíz. 


- En este archivo deberá haber un formulario donde podremos ingresar una mascota a partir del método POST. Dicho POST conectará al endpoint raíz del router pets

- Configurar el router pets para que pueda recibir el json por parte del formulario (recordar express.json()  y express.urlencoded({extended:true}))

- Verificar con POSTMAN que la información llegue al servidor y se guarde correctamente.



## Express y middlewares

Hemos utilizado mucho la sintaxis app.use. ¿Qué pasa de manera interna en este punto?

Cada vez que lo utilizamos estamos utilizando un middleware.

Éstas son operaciones que se ejecutan de manera intermedia entre la petición del cliente, y el servicio de nuestro servidor. 

Siempre se ejecuta antes de llegar al endpoint que corresponde.

Se suelen utilizar para:

- Dar información sobre las consultas que se están haciendo (logs)

- Autorizar o rechazar usuarios antes de que lleguen al endpoint (seguridad)

- Agregar o alterar información al método req antes de que llegue al endpoint (formato)

- Redireccionar según sea necesario (router)

- En ciertos casos, finalizar la petición sin que llegue al endpoint (seguridad)

### Importante

Como lo ves en el diagrama anterior, los middlewares se ejecutan EN ORDEN, eso quiere decir que, si algún middleware depende de que se haya realizado otra operación ejecutada por un middleware previo, los coloquemos en cascada según prioridad. 


### Tipos de Middlewares

Una aplicación Express puede utilizar los siguientes tipos de middleware:

- Middleware a nivel de aplicación

- Middleware a nivel endpoint

- Middleware a nivel del Router

- Middleware de manejo de errores

- Middleware incorporado

- Middleware de terceros


### Middleware a nivel de aplicación

Este ejemplo muestra una función de middleware sin ninguna vía de acceso de montaje. La función se ejecuta cada vez que la aplicación recibe una solicitud.

```javascript
const app = express()

app.use(function (req, res, next) {
    console.log('Time: ', Date.now())

    next()
})
```

### Middleware de nivel de endpoint

Se pueden agregar una o múltiples funciones middlewares en los procesos de atención de las rutas como se muestra a continuación:

```javascript
function mid1(req, res, next) {
    req.dato1 = 'un dato'
    next()
}

app.get('/ruta1', mid1, (req, res) => {
    res.json({
        dato1: req.dato1
    })
})
```

### Middleware de nivel del Router

El middleware de nivel de router funciona de la misma manera que el middleware de nivel de aplicación, excepto que está enlazado a una instancia de express.Router().

```javascript
router.use(function (req, res, next) {
    console.log('Time: ', Date.now())

    next()
})
```

### Middleware de manejo de errores

Estas funciones se definen de la misma forma que otras funciones de middleware, excepto que llevan cuatro argumentos en lugar de tres, específicamente con la firma (err, req, res, next):

```javascript
app.use(function (err, req, res, next) {
    console.error(err.stack)

    res.status(500).send('Something broke!')
})
```

### Middleware incorporado

La única función de middleware incorporado en Express es express.static. Esta función es responsable del servicio de archivos estáticos:

```javascript
app.use(express.static('public', options))
```
`express.static(root, [options])`

- El argumento root especifica el directorio raíz desde el que se realiza el servicio de activos estáticos.

- El objeto options opcional puede tener las siguientes propiedades: dotfiles, etag, extensions, index, lastModified, maxAge, redirect, setHeaders

### Middleware de terceros

Podemos instalar y utilizar middlewares de terceros para añadir funcionalidad a nuestra aplicación. El uso puede ser a nivel de aplicación o a nivel de Router. Por ejemplo, instalamos y usamos la función de middleware de análisis de cookies cookie-parser.

`npm i cookie-parser` 

```javascript
import cookieParser from 'cookie-parser'

app.use(cookieParser())
```

## Middleware de carga de archivos: MULTER

Multer es un middleware de terceros, pensado para poder realizar carga de archivos al servidor. 

En ocasiones el cliente necesitará subir una imagen, un vídeo o un archivo, según sea nuestra aplicación, ello nos lleva a configurar nuestro servidor para soportar estos archivos y poder almacenarlos en donde nosotros le indiquemos. 

### Instalación y configuración de MULTER

En la terminal:

`npm i multer`

En el archivo utils.js: 

```javascript
import multer from 'multer'

// Debemos configurar donde se almacenaran los archivos

const storage = multer.diskStorage({
    // Destination hará referencia a la carpeta donde se va a guardar el archivo
    destination: function(req, file, cb){
        cb(null, __dirname+'/public/img')
    },
    // Filename hará referencia al nombre final del archivo
    filename: function(req, file, cb){
        cb(null, file.originalname) // Asi le indicamos que mantenga el nombre original
    }
})

export const uploader = multer({storage})
```
Una vez que nuestro uploader está listo para utilizarse, podemos importarlo en el router que necesitemos y colocarlo en la ruta donde lo necesitemos, recuerda que, al ser un middleware, éste va en medio de la ruta y de la función callback (req,res). 

```javascript
router.post('/', uploader.single('file'), (req, res) => {})
```

Podemos utilizar el uploader de dos formas principalmente:

- uploader.single(‘nombre del campo’): permitirá subir un único archivo, su resultado estará en req.file

- uploader.array(‘nombre de campos’): permitirá subir múltiples archivos, su resultado estará en req.files


### Importante

Cuando subimos un archivo (imagen, vídeo, etc), estamos hablando de un flujo de datos. lo cual no puede plasmarse en un JSON. Cuando enviamos información a un endpoint donde sabemos que utilizamos MULTER, debemos enviarlo como FormData, no como JSON.

## Actividad en Clase (01-actividad-en-clase)

Basado en el formulario para ingresar una mascota al sistema:

- Configurar el formulario para añadir un campo input type=”file” name “file” para que la mascota a agregar pueda tener una “imagen representativa”.

- El nombre del archivo guardado se formará con el nombre original anteponiéndole un timestamp (Date.now()) seguido con un guión. Ej: 1610894554093-clase1.zip.

- Corroborar que la imagen se guarde correctamente. Guardar la ruta del archivo guardado en un campo “thumbnail”.


## Primera entrega de tu Proyecto Final

**Se debe entregar**

Desarrollar el servidor basado en Node.JS y express, que escuche en el puerto 8080 y disponga de dos grupos de rutas: /products y /carts. 

Dichos endpoints estarán implementados con el router de express, con las siguientes especificaciones:

Para el manejo de productos, el cual tendrá su router en /api/products/ , configurar las siguientes rutas:

- La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior

- La ruta GET /:pid deberá traer sólo el producto con el id proporcionado

- La ruta raíz POST / deberá agregar un nuevo producto con los campos:

    - id: Number/String (A tu elección, el id NO se manda desde body, se autogenera como lo hemos visto desde los primeros entregables, asegurando que NUNCA se repetirán los ids en el archivo.    
    - title:String
    - description:String
    - code:String
    - price:Number
    - status:Boolean
    - stock:Number
    - category:String
    - thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto

- Status es true por defecto

- Todos los campos son obligatorios, a excepción de thumbnails

- La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.

- La ruta DELETE /:pid deberá eliminar el producto con el pid indicado. 

Para el carrito, el cual tendrá su router en /api/carts/, configurar dos rutas:


- La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:

    - Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
    
    - products: Array que contendrá objetos que representen cada producto
    
- La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.

- La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:

    - product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)

    - quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.

Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto. 

La persistencia de la información se implementará utilizando el file system, donde los archivos “productos,json” y “carrito.json”, respaldan la información.

No es necesario realizar ninguna implementación visual, todo el flujo se puede realizar por Postman o por el cliente de tu preferencia.


    
    
    
    

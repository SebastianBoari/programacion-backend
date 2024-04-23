# Motores de plantillas

Temario:

- PLantillas y motores de plantillas
- Handlebars

## Motores de plantillas

Existen múltiples motores de plantillas tales como: Handlebars, ejs, Pug.

Podemos crear sitios web completos basados en un motor de plantillas, con el fin de brindar una experiencia más dinámica.

## Motor de plantillas vs librerías y frameworks frontend

Si bien los frameworks y librerías, como ReactJS o AngularJS, generan sitios mucho más dinámicos hay distintos casos y **no existe la herramienta mágica para todos los casos**.

Los motores de plantillas son recomendables cuando necesitamos cierto dinamismo. Que tanto dinamismo?

Cuando es algo engorroso hacerlo con javascript vanilla pero tampoco amrita crear todo un frontend en React/Angular porque debemos representar pocos datos dinámicos ahí podríamos analizar la opción de utilizar cualquier motor de plantillas.

En este curso veremos **Handlebars** pero bien podrías investigar otras opciones.

### Importante

Recuerda que puedes llegar al mismo resultado utilizando cualquier tecnología, pero evidentemente en algunos casos será demasiado compleja una tarea si elegimos mal, o en otros casos nos daremos cuenta de que el proyecto era “demasiado sencillo” para la herramienta utilizada y tal vez “no era necesario hacer tanto”. ¡Irás entrenando el criterio sobre la práctica!

## Express y Handlebars

- Motor de plantillas pensado en agregar un nivel medio de dinamismo.

- Preprocesa el HTML, reconoce el patrón **{{variable}}** buscará un objeto que cuente con dicha propiedad y la sustituirá.

- No está pensado para cambios constantes. Requiere una renderización completa del DOM.

## Instalación y Configuración (00-ejemplo)

Partiendo de un servidor Express como los que estuvimos haciendo en las ultimas clases, dentro de la carpeta source agregaremos una nueva carpeta llamada "views". 

Dentro de "views" crearemos un archivo llamado "index.handlebars" y una nueva carpeta llamada "layouts".

Dentro de "layouts" crearemos un archivo llamado "main.handlebars". 

Dentro del archivo "main" escribiremos la estructura HTML habitual pero dentro del body escribiremos

`{{{body}}}`

Dentro de esa etiqueta handlebars inyectara todos los elementos HTML que le indiquemos.

Dentro del archivo "index" escribiremos un saludo simple:

```html
<div>
    <h1>Hola {{name}}! Que gusto verte.</h1>
</div>
```
Instalemos la dependencia

`npm install express-handlebars`

```javascript
// Importamos handlebars
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'

// Le indicamos a express que motor utilizaremos y lo instanciamos
app.engine('handlebars', handlebars.engine())

// Le indicamos en que parte del proyecto estarán las vistas
app.set('views', __dirname + '/views')

// Le indicamos a express que inicialice utilizando handlebars
app.set('view engine', 'handlebars')

// Seteamos de manera estática nuestra carpeta public
app.use(express.static(__dirname + '/public'))
```

### Función __dirname

Se importan dos funciones, fileURLToPath y dirname, de los módulos 'url' y 'path' respectivamente. Luego, utiliza fileURLToPath para convertir la URL del módulo actual (import.meta.url) en una ruta de archivo (__filename). Posteriormente, utiliza dirname para obtener el directorio padre de __filename, asignándolo a __dirname. Finalmente, exporta __dirname.

La funcionalidad principal de este código es proporcionar una forma de obtener el directorio actual en el que se encuentra el archivo JavaScript en ejecución, lo que puede ser útil para manipular rutas de archivo de manera dinámica.

```javascript
// Archivo Utils y funcion __dirname

import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export { __dirname }
```


### Creando método GET que renderiza la pantalla

render es nuestro nuevo método para renderizar plantillas, y se compone del nombre de la plantilla y el objeto que contiene la información con la cual handlebars reemplazara las variables en la plantilla.

```javascript
app.get('/', (req, res) => {
    let testUser = {
        name: 'Hilda',
        last_name: 'Martinez'
    }

    res.render('index', testUser)
})
```
## Actividad en Clase (00-actividad-en-clase)

**Datos personales**

Basándonos en el ejemplo anterior, desarrollar una vista web que permita mostrar los datos personales de múltiples usuarios. 

- Utilizar la misma estructura mostrada por el profesor, para poder levantar un servidor que utilice handlebars como motor de plantillas. 

- Configurar la plantilla para que muestre los siguientes datos: nombre, apellido, edad, correo, teléfono.

- Crear un array “users” que cuente con 5 usuarios de tipo objeto, cada uno con los datos mencionados arriba.

- Al llamar al método get ‘/’, generar un número random para elegir a alguno de los usuarios y mostrar el usuario seleccionado al azar en la plantilla.

- Observar los diferentes resultados en el navegador. 

## Estructuras en Handlebars (01-ejemplo)

Además de reemplazar una marca por un dato dinámico Handlebars nos da la capacidad de realizar estrucutras de decisión o de repetición.

### Condicional

No admite expresiones, sólo booleanos

```html
{{#if condicion}}
    <h1>La condición se cumple!!</h1>
{{/if}}
```

### Ciclos

Solo admite arrays, los itera en un ciclo.

```html
{{#each arrayUsuarios}}
    <h1>Hola {{this.name}}</h1>
{{/each}}
```

## Express Router + Handlebars

La forma más extendida de utilizar handlebars es creando routers especificos para las vistas. 

Por ejemplo si tenemos:

`products.router.js`

`carts.router.js`

`users.router.js`

Podriamos englobar todas las vistas en un solo router

`views.router.js`

O bien a medida que crece el proyecto podría ser mas viable crear un router de vistas por entidad:

`views.products.router.js`

`views.carts.router.js`

`views.users.router.js`

### y la carpeta public?

Seguiremos configurandola como carpeta de recursos estaticos y en ella pondremos las imagenes, el css y el javascript que necesitaran nuestras vistas.

El javascript lo podremos linkear a nuestras vistas como siempre

```html
<script src="/js/index.js"></script>
```

El css debemos de linkearlo en los layouts que utilicemos. En nuestro caso main.handlebars

```html
<link rel="stylesheet" src="css/{{style}}">
```

En el router donde rendericemos la vista pondremos style: y la ruta al css deseado


## Actividad en Clase (01-actividad-en-clase)

**Handlebars con express**

Realizar un formulario en una nueva plantilla.

- Se creará un archivo “register.handlebars” como nueva plantilla, donde se colocará un form

- Dicho form debe servir para registrar un usuario, por lo que contará con nombre, correo, y contraseña

- Enviar los datos a una ruta POST ‘/user’, y guardar el usuario en un arreglo. Confirmar que el guardado se realice exitosamente. 


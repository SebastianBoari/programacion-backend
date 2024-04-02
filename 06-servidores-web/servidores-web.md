# Servidores Web

Temario: 

- Protocolo HTTP
- Servidor con Express.JS
- Objeto Request

### HTTP (Hyper Text Transfer Protocol)

Refiere a un protocolo, el cual es un conjunto de reglas que permite la comunicación entre dos o más sistemas.

**¿Cómo funciona?**

Se basa en un modelo de petición-respuesta de manera que el cliente tiene que hacer una petición y el servidor responde.

**Que pedimos en cada peticion?**

Al hacer una petición, le estamos solicitando al servidor ciertos recursos, los cuales pueden ser:

- Un dato como un nombre, fecha, edad
- Información mas compleja como una imagen o un video
- Un archivo para descargar
- Una página web

### Maneja múltiples peticiones

Bajo una configuración por defecto, un servidor puede escuchar multiples peticiones de multiples clientes en simultaneo.


**Y... ¿Si el servidor se apaga?**
Un programa inicia, hace sus operaciones y luego finaliza.

¿Qué tiene de diferente un servidor? ¿Cómo puede recibir peticiones en diferentes periodos de tiempo sin finalizar?

El cliente siempre hace las peticiones **(requests)** y el servidor siempre será quien responde **(responses)**.

Cuando hacemos el frontend de una web actuamos de cliente, en este curso aprenderemos a crear el servidor que respondan las peticiones de un frontend.


### Servidor Http (00-ejemplo)

Se recomienda instalar nodemon de manera global (npm install -g nodemon) para que cuando detecte un cambio en nuestro código reinicie automáticamente el servidor y no debamos estar pendiente de ello.

### Servidor ExpressJS (01-ejemplo)

ExpressJS es un framework minimalista que permitirá desarrollar servidores más complejos.

- Diferentes rutas para las peticiones
- Mejor estructura de nuestro proyecto
- Manejar funcionalidades más complejas y utilización de middlewares.

### Actividad en clase: Otras respuestas con Express

Crear un proyecto basado en express js, el cual cuente con un servidor que escuche en el puerto 8080. Además de configurar los siguientes endpoints:

- El endpoint del método GET a la ruta  ‘/bienvenida’ deberá devolver un html con letras en color azul, en una string, dando la bienvenida.

- El endpoint del método GET a la ruta ‘/usuario’ deberá devolver un objeto con los datos de un usuario falso: {nombre, apellido,edad, correo}


### Objeto request (02-ejemplo)

Por el momento solo utilizamos el elemento "res", el cual utilizamos para responder una petición.

El objeto "req" cuenta con tres propiedades principales: req.query, req.params y req.body.

El día de hoy abordaremos el req.query y req.params, en la próxima clase profundizaremos sobre req.body.

### req.params

Se utiliza para obtener elementos dinámicos desde la ruta que está llamando el cliente.

Para poder definir un parámetro dentro de la ruta, basta con anteponer dos puntos. Ejemplo: "/bienvenida/:user"


### req.query

El término "query" se refiere a las consultas realizadas a un endpoint específico, y se activa al añadir el símbolo "?" en la URL. Express interpreta esto y carga la información en el objeto "req.query" para su uso en el endpoint correspondiente. Por ejemplo, al buscar algo en un navegador, se realiza una llamada a un endpoint mediante un query específico.

**IMPORTANTE**

Conforme incrementa el dinamismo en las urls, es importante configurar el servidor para que reciba datos complejos desde la url, por ello hay que utilizar la línea: 

`app.use(express.urlencoded({extended:true}))`


### ¿Qué diferencia hay entre query y params?

En req.query puedo meter la cantidad de consultas que yo así desee, ya que las queries no vienen inmersas en la ruta, sino que son un elemento aparte.

Si desconozco el número de cosas que se van a consultar en mi ruta, la mejor opción es utilizar queries, mientras que, si sólo necesito un número específico y reducido de parámetros, habría que optar por params

No hay una mejor que otra, sirven para casos diferentes e incluso podemos utilizar ambas en la misma consulta. 
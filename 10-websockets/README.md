# Websockets

Temario:

- Websockets
- Sockets en Express con Socket.io


Websocket es un protocolo de comunicación basado en TCP para poder establecer esa conexión entre el cliente y el servidor, justo como sabemos, es el mismo objetivo que cubre HTTP.


## ¿Qué hace que websocket se destaque?

Su protocolo TCP establece dos endpoints de comunicación, a cada endpoint se le conoce como socket. 

El contar con estos dos sockets permitirá establecer una comunicación bidireccional entre el cliente y el servidor.

- El cliente puede obtener recursos del servidor cuando lo solicite (al igual que en HTTP).

- El servidor puede entregar información al cliente sin necesidad de que el cliente haga una petición.

## Caso práctico: sistema de subastas en línea.

En un sistema de subastas necesitaríamos actualizar constantemente la información.

Si algo cambia en el servidor debemos enviarle esa información a todos los clientes.

Si alguien puja un precio mas alto, el resto de participantes deben ser rápidamente notificados de la puja.

Con HTTP tendríamos que estar refrescando la página como locos para poder refrescar los datos a menos que...


## Primer intento: Polling

El cliente hace solicitudes periódicas al servidor para obtener datos. Por ejemplo, cada 30 segundos, el cliente consulta al servidor para ver si hay nueva información disponible.

No tardaron en aparecer sus puntos débiles como que las solicitudes al ser un intervalo regular se dependía exclusivamente de la carga adicional que el servidor podría soportar para lograr el efecto de en "tiempo real".

## Segundo intento: Long Polling

El HTTP Long polling consiste en que el cliente vuelva a hacer una petición tan pronto como reciba una respuesta del servidor, es decir, bombardea al servidor constantemente de peticiones para emular respuestas “en tiempo real”

Aunque este método era mejor que el anterior en consumo recursos seguía siendo un problema y seguía siendo un tanto lento para considerarse "tiempo real" a medida que creciera la cantidad de usuarios en simultaneo.

## Solución óptima: Websockets

*Websockets es un protocolo excelente para esta situación ya que:*

- El cliente no tendrá que estar actualizando la página constantemente

- En cuanto el servidor reciba una actualización de una nueva puja, actualizará a todos los clientes conectados, permitiendo dar información en tiempo real.

- Una vez que termina la subasta, el socket se cierra y el servidor deja de notificar innecesariamente al cliente. 


## ¿Cómo funciona Websocket?

Primero, el cliente tiene que enviar una solicitud HTTP llamada Handshake (apretón de manos). Este apretón de manos será un “acuerdo” o “contrato” de confianza para que el servidor pueda actualizar al cliente sin que éste se lo pida. 

*El servidor recibe la petición de Handshake y procede a “responderle el saludo”, a esto se le llama “Abrir conexión”.*

A partir de este punto, el canal queda abierto de manera bidireccional, por lo que el cliente se puede comunicar con el servidor cuando quiera y viceversa. 

*La comunicación es “persistente” hasta que alguno de los dos lados decida cerrar el canal de comunicación.*

## Sockets en Express con Socket.io

- **Sencillez**: Nos permite implementar websockets en el servidor y el cliente.

- **Reconexión automática**: Hará que el cliente siempre esté intentando conectarse en caso de una caída del servidor.

- **Fiabilidad**: Incluye proxies, balanceadores de carga, firewall personal y software antivirus.

- **Detección de desconexión**: Se implementa un mecanismo de heartbeat, lo que permite que tanto el servidor como el cliente sepan cuando el otro ya no responde.

- **Soporte binario**: Se puede emitir cualquier estructura de datos serializable

### Websocket: Comparación con HTTP

| HTTP                                                  | Websocket                                                                  |
|-------------------------------------------------------|----------------------------------------------------------------------------|
| Son peticiones al servidor que esperan una respuesta. | Es un canal abierto entre servidor y cliente. Como una llamada telefónica. |
| Se solicita información y se espera una respuesta.    | Se usa para comunicación en tiempo real                                    |
| Se usa para consumir APIs y recursos web              | Se usa para escuchar información en tiempo real                            |
| Protocolo HTTP                                        | Es un protocolo de comunicación                                            |
| Conexión de una sola vía                              | Conexión de doble vía                                                      |
| No sustituye a WebSockets                             |  No sustituye a HTTP                                                       |


### Importante

Como podrás notar, se menciona que HTTP no es reemplazo de Websocket, ni websocket es reemplazo de HTTP. Ambos son complementos que se pueden utilizar en conjunto, con el fin de hacer sistemas completos y complejos. 

## Instalación y configuración de Socket.io (00-ejemplo)

1. Partiendo de un servidor express con la estructura inicial a la que estamos acostumbrados a esta altura del curso instalamos socket.io

`npm install socket.io`

2. Del lado del cliente cliente deberemos linkear a socket.io

```html
<script src="/socket.io/socket.io.js"></script>
```

3. En el script del cliente deberemos hacer referencia e inicializar a socket.io 

```javascript
const socket = io()
```

4. En el servidor debemos pasarle la referencia del servidor HTTP a websocket

```javascript
const app = express()

import { Server } from 'socket.io'

const httpServer = app.listen(8080, () => console.log('Server up'))

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {
    console.log('Nuevo cliente conectado)
})
```
5. Ahora podemos programar los eventos tanto en el cliente como en el servidor.

```javascript
// Para escuchar eventos (El primer parametro es el nombre que le vamos a dar al evento y el segundo es un callback)
socket.on('message', (data) => {
    console.log(data)
})

// Para emitir eventos (El primer parametro es el nombre que le vamos a dar al evento y el segundo es el mensaje)

// Mensaje individual (Solo lo recibe el socket). El cliente solo puede emitir este tipo de mensajes. 
socket.emit('message', mensaje)

// Mensaje para todos menos para el socket actual
socket.broadcast.emit('message', mensaje)

// Mensaje para todos
socketServer.emit('message', mensaje)
```

## Actividad en clase (00-actividad-en-clase)

Servidor con Websockets

*Sobre el proyecto de websocket que venimos desarrollando:*

- Sobre la estructura anteriormente creada, agregar en la vista de cliente un elemento de entrada de texto donde al introducir texto, el mensaje se vea reflejado en todos los clientes conectados en un párrafo por debajo del input. El texto debe ser enviado caracter a caracter y debe reemplazar el mensaje previo.

- Basado en el ejercicio que venimos realizando, ahora los mensajes enviados por los clientes deberán ser almacenados en el servidor y reflejados por debajo del elemento de entrada de texto cada vez que el usuario haga un envío. La estructura de almacenamiento será un array de objetos, donde cada objeto tendrá la siguiente estructura: socketid: (el socket.id del que envió el mensaje), mensaje: (texto enviado)}

    - Cada cliente que se conecte recibirá la lista de mensajes completa.
    - Modificar el elemento de entrada en el cliente para que disponga de un botón de envío de mensaje.
    - Cada mensaje de cliente se representará en un renglón aparte, anteponiendo el socket id


## Websockets más Handlebars (websockets-mas-handlebars)

*Integrar vistas y sockets a nuestro servidor actual*

**Consigna**:

- Configurar nuestro proyecto para que trabaje con Handlebars y websocket

**Aspectos a incluir**

- Configurar el servidor para integrar el motor de plantillas Handlebars e instalar un servidor de socket.io al mismo.

- Crear una vista “home.handlebars” la cual contenga una lista de todos los productos agregados hasta el momento

- Además, crear una vista “realTimeProducts.handlebars”, la cual vivirá en el endpoint “/realtimeproducts” en nuestro views router, ésta contendrá la misma lista de productos, sin embargo, ésta trabajará con websockets.

- Al trabajar con websockets, cada vez que creemos un producto nuevo, o bien cada vez que eliminemos un producto, se debe actualizar automáticamente en dicha vista la lista.

- Ya que la conexión entre una consulta HTTP y websocket no está contemplada dentro de la clase. Se recomienda que, para la creación y eliminación de un producto, Se cree un formulario simple en la vista  realTimeProducts.handlebars. Para que el contenido se envíe desde websockets y no HTTP. Sin embargo, esta no es la mejor solución, leer el siguiente punto.

- Si se desea hacer la conexión de socket emits con HTTP, deberás buscar la forma de utilizar el servidor io de Sockets dentro de la petición POST. ¿Cómo utilizarás un emit dentro del POST?

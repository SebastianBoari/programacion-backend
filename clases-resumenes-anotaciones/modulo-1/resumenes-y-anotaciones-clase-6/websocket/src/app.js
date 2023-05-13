// Instalacion y configuración de Socket.io
// 1- Tener listo un servidor Express
// 2- Realizar las instalaciones (express, express-handlebars, socket.io)
// 3- Configurar nuestro servidor Express con Handlebars + socket.io en:
//      app.js
//      utils.js (En el caso de que lo tengamos)
//      views.router.js
//      index.handlebars
// 4- Agregar js a la carpeta public ya nuestro index.handlebars
// 5- Instanciar una variable "scoket" (const scoket = io();) del lado del cliente (index.js del cliente)

// Config y uso del socket del lado del servidor.
// El cliente y el servidor deben estar ligados.
// Tenemos a socket.io de lado del cliente listo para conectarse a nuestro servidor, sin embargo, aún no hemos enseñado a nuestro servidor a escuchar el handshake por parte del cliente, para ello tenemos nuestro socketServer (normalmente se llama “io”, pero lo utilizaremos como socketServer para que sea más claro). 

const express = require('express');
const app = express();
const viewsRouter = require('./routes/views.router');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const port = 8080;

// Guardamos en una variable el servidor http
const httpServer = app.listen(port, () => {
    console.log(`Server up on port ${port}`)
});

// Creamos el socket y le damos como parametro el server http de referencia
const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views',  './src/views');
app.set('view engine', 'handlebars');
app.use(express.static('./src/public'));
app.use('/', viewsRouter);

// El cliente se conecta con su websocet al socketServer.
// socketServer.on es como el listen de express, el servidro websocket queda en escucha y le decimos que cuando alguien se conecte a través del evento "connection" el servidor muestre por console.log un mensaje.
socketServer.on('connection', (socket) => {
    console.log('Nuevo cliente conectado...');
    // El nombre del evento a escuchar tiene un identificador que el cliente tiene que colocar de su lado para poder enviar info.
    // socket.on('evento', callback);
    // Ver como se envia un mensaje en el archivo index.js del cliente
    socket.on('message', (data) => {
        console.log(data);
    });

    // Enviando info desde el servidor hacia el cliente:
    // Revisa el index.js del cliente para ver como se reciben estos mensajes y abre en distintos navegadores el localhost 8080.
    socket.emit('evento_para_socket_individual', 'Este mensaje sólo lo debe recibir el socket');

    socket.broadcast.emit('evento_para_todos_menos_el_socket_actual', 'Este evento lo verán todos los sockets conectados, MENOS el socket actual desde el que se envió el mensaje.');

    socketServer.emit('evento_para_todos', 'Este mensaje lo reciben todos los sockets conectados.');

});




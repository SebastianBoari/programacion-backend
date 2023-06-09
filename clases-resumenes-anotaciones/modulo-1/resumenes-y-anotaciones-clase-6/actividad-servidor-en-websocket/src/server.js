const express = require('express');
const app = express();
const viewsRouter = require('./routes/views.router');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const port = 8080;

// Handlebars config
app.engine('handlebars', handlebars.engine());
app.set('views',  './src/views');
app.set('view engine', 'handlebars');
// Public directory
app.use(express.static('./src/public'));
// Views middleware
app.use('/', viewsRouter);


const httpServer = app.listen(port, () => {
    console.log(`Server up on port ${port}`)
});

const socketServer = new Server(httpServer);

const history = [];

socketServer.on('connection', (socket) => {
    console.log('Nuevo cliente conectado...');

    socket.emit('history', history);

    socket.on('message', (data) => {
        history.push(data);

        let currentMsg = data;

        socketServer.emit('currentMessage', currentMsg);
    });
});
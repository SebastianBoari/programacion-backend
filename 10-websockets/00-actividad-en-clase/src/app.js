import express from 'express'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from './router/views.router.js'
import { Server } from 'socket.io'

const app = express()
const httpServer = app.listen(8080, () => console.log('Server up'))
const socketServer = new Server(httpServer)

const history = []

socketServer.on('connection', (socket) => {
    socket.emit('history', JSON.stringify(history))

    socket.on('message', (message) => {
        history.push(message)

        socket.emit('history', JSON.stringify(history))
    })
})

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))
app.use('/', viewsRouter)
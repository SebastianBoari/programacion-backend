import { Server } from 'socket.io'

function configIo(httpServer) {
    const io = new Server(httpServer)

    io.on('connection', () => {
        console.log('Nuevo cliente conectado')
    })

    return io
}
 
export { configIo }
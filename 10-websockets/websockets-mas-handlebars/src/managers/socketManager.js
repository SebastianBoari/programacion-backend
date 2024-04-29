import { Server } from 'socket.io'

/**
* Initialize all logic of socket.io
* @param { http server } server 
*/
const io = (server) => {
    // Initialize
    const io = new Server(server)

    // On Connection
    io.on('connection', (socket) => {
        console.log(`New client connected ${socket.id}`)
    })
}

export default io
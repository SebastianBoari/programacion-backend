import { Router } from 'express'
import { Server } from 'socket.io'

const router = Router()

export default  function realTimeProducts (server) {
    const io = new Server(server)

    router.get('/', async (req, res) => {
        
        io.on('connection', () => {
            console.log('Nuevo cliente conectado')
        })

        res.render('realTimeProducts', { 
            static: 'admin',
            style: 'index',
            title: 'Real time products',
        })
    })

    return router
}

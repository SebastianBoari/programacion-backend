import { Router } from 'express'
import { Server } from 'socket.io'
import chatManager from '../Dao/DB/ChatManager.js'

const router = Router()

const setUser = (req, res, next) => {
    if (!req.session.username) {
        return res.redirect('/chat/setusername')
    }
    next()
}

const chatRouter = (httpServer) => {
    router.post('/setusername', (req, res) => {
        req.session.username = req.body.username

        res.redirect('/')
    })

    router.get('/setusername', (req, res) => {
        res.render('setusername', {
            title: 'Set Username',
            static: 'chat',
            script: 'setusername'
        })
    })

    router.get('/', setUser, async (req, res) => {

        const io = new Server(httpServer)

        io.on('connection', async (socket) => {
            console.log(`New user connected ${socket.id}`)
    
            const chatHistory = await chatManager.getMessageHistory()
            socket.emit('history', chatHistory)
    
            socket.on('newMessage', async (data) => {
                data.user = req.session.username
                
                const newMessage = await chatManager.sendMessage(data)
    
                io.emit('message', newMessage)
            })
        })
        
        try{
            res.render('chat', {
                title: 'chat',
                static: 'chat',
                style: 'index',
                script: 'index'
            })
        } catch(error){
            router.get('/', async (req, res) => {
                res.render('error', { error: error})
            })
        }
    })

    return router
}


export default chatRouter
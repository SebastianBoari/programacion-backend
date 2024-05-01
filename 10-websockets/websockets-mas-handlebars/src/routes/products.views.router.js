import { Router } from 'express'
import { Server } from 'socket.io'
import productManager from '../managers/ProductManager.js'

const router = Router()

const productsViewsRouter = (server) => {

    router.get('/', async (req, res) => {
        try{
            const products =  await productManager.getProducts()

            res.render('home', {
                title: 'home',
                static: 'home',
                style: 'index',
                products: products
            })
        } catch(error){
            res.render('error', { error: error})
        }
    })

    router.get('/realtimeproducts', async (req, res) => {
        const io = new Server(server)

        let products = await productManager.getProducts()

        io.on('connection', (socket) => {
            console.log(`New user connected ${socket.id}`)
            socket.emit('products', products)

            socket.on('delete', async (pid) => {
                await productManager.deleteProduct(pid)

                products = await productManager.getProducts()
                socket.emit('products', products)
            })

            socket.on('update', async (pid, field, data) => {
                await productManager.updateProduct(pid, field, data)

                products = await productManager.getProducts()
                socket.emit('products', products)
            })

            socket.on('create', async (product) => {
                await productManager.addProduct(product.title, product.description, product.code, product.price, product.status, product.stock, product.category, product.thumbnail)
                
                products = await productManager.getProducts()
                socket.emit('products', products)
            })
        })


        try{
            res.render('realTimeProducts', {
                title: 'Real time products',
                static: 'realTimeProducts',
                style: 'index'
            })
        } catch(error){
            res.render('error', { error: error})
        }
    })

    return router
}

export default productsViewsRouter
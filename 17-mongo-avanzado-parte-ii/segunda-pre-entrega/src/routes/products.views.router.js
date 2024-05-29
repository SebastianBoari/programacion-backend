import { Router } from 'express'
import { Server } from 'socket.io'
import productManager from '../Dao/DB/ProductManager.js'

const router = Router()

const productsViewsRouter = (httpServer) => {
    router.get('/products', async (req, res) => {
        try{
            const limit = req.query.limit
            const page = req.query.page
            const query = req.query.query
            const sort = req.query.sort
            const status = req.query.status

            const products = await productManager.getProducts(limit, page, query, sort, status)

            // Pagination buttons
            if(products.totalPages > 1){
				products.totalPagesArray = []
				for (let i = 1; i <= products.totalPages; i++) {
					products.totalPagesArray.push(i)
				}
			}
            products.prevLink = products.hasPrevPage ? `?page=${products.prevPage}` : ''
			products.nextLink = products.hasNextPage ? `?page=${products.nextPage}` : ''

            res.render('products', {
                title: 'products',
                static: 'products',
                style: 'index',
                products: products
            })
        } catch(error){
            res.render('error', { error: error})
        }
    })

    router.get('/realtimeproducts', async (req, res) => {
        const io = new Server(httpServer)

        let products = await productManager.getProducts()

        io.on('connection', (socket) => {
            console.log(`New user connected ${socket.id}`)
            socket.emit('products', products.docs)

            socket.on('delete', async (pid) => {
                await productManager.deleteProduct(pid)

                products = await productManager.getProducts()
                socket.emit('products', products.docs)
            })

            socket.on('update', async (pid, field, data) => {
                await productManager.updateProduct(pid, field, data)

                products = await productManager.getProducts()
                socket.emit('products', products.docs)
            })

            socket.on('create', async (product) => {
                await productManager.addProduct(product.title, product.description, product.code, product.price, product.status, product.stock, product.category, product.thumbnail)
                
                products = await productManager.getProducts()
                socket.emit('products', products.docs)
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
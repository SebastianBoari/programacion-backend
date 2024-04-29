import express from 'express'
import productsRouter from './routes/api/products.router.js'
import cartsRouter from './routes/api/carts.router.js'
import productsViewsRouter from './routes/views/products.views.router.js'
import realTimeProductsRouter from './routes/views/realTimeProducts.router.js'
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'
import io from './managers/SocketManager.js'

const PORT = 8080

const app = express()
export const httpServer = app.listen(PORT, () => console.log(`Listening at port ${PORT}`))

io(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname+'/public'))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter) 

app.use('/', productsViewsRouter)
app.use('/realtimeproducts', realTimeProductsRouter) 

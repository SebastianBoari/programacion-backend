import express from 'express'
import productsRouter from './routes/api/products.router.js'
import cartsRouter from './routes/api/carts.router.js'
import productsViewsRouter from './routes/views/products.views.router.js'
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'
import { configIo } from './config/socketio.config.js'

const PORT = 8080
const app = express()
const httpServer = app.listen(PORT, () => console.log(`Listening at port ${PORT}`))
const io = configIo(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname+'/public'))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', productsViewsRouter)


export { httpServer }



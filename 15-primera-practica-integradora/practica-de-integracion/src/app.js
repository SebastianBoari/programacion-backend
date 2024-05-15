import express from 'express'
import handlebars from 'express-handlebars'

import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import productsViewsRouter from './routes/products.views.router.js'

import { __dirname } from './utils.js'
import { connection } from './config/mongoose.config.js'

import { mongoUri, port } from './config/dotenv.config.js'

const app = express()
const httpServer = app.listen(port, () => console.log(`Listening at port ${port}`))
connection(mongoUri)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', productsViewsRouter(httpServer))

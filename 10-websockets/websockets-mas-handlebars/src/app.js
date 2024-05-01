import express from 'express'
import handlebars from 'express-handlebars'

import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import productsViewsRouter from './routes/products.views.router.js'

import { __dirname } from './utils.js'

const PORT = 8080

const app = express()
const httpServer = app.listen(PORT, () => console.log(`Listening at port ${PORT}`))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', productsViewsRouter(httpServer))

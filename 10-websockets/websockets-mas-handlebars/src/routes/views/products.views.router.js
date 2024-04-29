import { Router } from 'express'
import productManager from '../../classes/ProductManager.js'

const router = Router()

router.get('/', async (req, res) => {
    const products = await productManager.getProducts()

    res.render('home', { 
        style: 'index',
        title: 'websockets-mas-handlebars',
        products: products
    })
})

export default router
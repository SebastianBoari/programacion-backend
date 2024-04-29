import { Router } from 'express'
import productManager from '../../managers/ProductManager.js'

const router = Router()

router.get('/', async (req, res) => {
    const products = await productManager.getProducts()

    res.render('home', { 
        static: 'home',
        style: 'index',
        title: 'home',
        products: products
    })
})

export default router
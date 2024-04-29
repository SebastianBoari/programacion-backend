import { Router } from 'express'
import productManager from '../../managers/ProductManager.js'

const router = Router()

router.get('/', async (req, res) => {
    const products = await productManager.getProducts()

    res.render('realTimeProducts', { 
        static: 'admin',
        style: 'index',
        title: 'Real time products',
        products: products
    })
})

export default router
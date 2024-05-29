import { Router } from 'express'
import productManager from '../Dao/DB/ProductManager.js'

const router = Router()

/**
 * method: GET
 * url: localhost:8080/api/products
 */
router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit || 10
        const page = req.query.page || 1
        const query = req.query.query
        const sort = req.query.sort
        const status = req.query.status

        const products = await productManager.getProducts(limit, page, query, sort, status)
        
        res.status(200).json({ status: 'success', payload: products })
    } catch (error) {
        console.error(error.message)

        res.status(500).json({ status: 'error', error: error.message })
    }
})

/**
 * method: GET
 * url: localhost:8080/api/products/:pid
 */
router.get('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid

        const product = await productManager.getProductById(pid)

        res.status(200).json({ status: 'success', payload: product })
    } catch (error) {
        console.error(error.message)

        res.status(500).json({ status: 'error', error: error.message })
    }
})

/**
 * method: POST
 * url: localhost:8080/api/products
 * body (raw/json):
 * {
    "title": "Title",
    "description": "description",
    "code": "AAAA-0000",
    "price": 1,
    "status": true,
    "stock": 1,
    "category": "test",
    "thumbnail": ["url-image"]
    }
 */
router.post('/', async (req, res) => {
    try {
        if(!req.body) return res.status(400).json({ error: 'required data is missing' }) 

        const {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail
        } = req.body
        
        const newProduct = await productManager.addProduct( 
            title, 
            description, 
            code, 
            price, 
            status, 
            stock, 
            category, 
            thumbnail
        )
            
        res.status(201).json({ status: 'success', payload: newProduct })
    } catch (error) {
        console.error(error.message)
        
        res.status(500).json({ status: 'error', error: error.message })
    }
})

/**
 * method: PUT
 * url: localhost:8080/api/products/:pid
 * body (raw/json):
 * {
    "field": "code",
    "data": "AAAA-0011"
    }
 */
router.put('/:pid', async (req, res) => {
    try{
        const pid = req.params.pid
        const { field, data } = req.body

        const updatedProduct = await productManager.updateProduct(pid, field, data)

        res.status(200).json({ status: 'success', payload: updatedProduct })
    } catch(error){
        console.error(error.message)
        
        res.status(500).json({ status: 'error', error: error.message })
    }
})

/**
 * method: DELETE
 * url: localhost:8080/api/products/:pid
 */
router.delete('/:pid', async (req, res) => {
    try{
        const pid = req.params.pid

        const deletedProduct = await productManager.deleteProduct(pid)

        res.status(200).json({ status: 'success', payload: deletedProduct })
    } catch(error){
        console.error(error.message)
        
        res.status(500).json({ status: 'error', error: error.message })
    }
})

export default router
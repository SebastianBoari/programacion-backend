import { Router } from 'express'
import productManager from '../Dao/DB/ProductManager.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit
        const page = req.query.page
        const query = req.query.query
        const sort = req.query.sort

        const products = await productManager.getProducts(limit, page, query, sort)
        
        res.status(200).json({ status: 'success', payload: products })
    } catch (error) {
        console.error(error.message)

        res.status(500).json({ status: 'error', error: error.message })
    }
})

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
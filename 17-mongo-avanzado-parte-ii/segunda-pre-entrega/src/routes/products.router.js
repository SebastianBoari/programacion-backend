import { Router } from 'express'
import productManager from '../Dao/DB/ProductManager.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit)
        
        const products = await productManager.getProducts(limit)
        
        res.status(200).json({ payload: products })
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid

        const product = await productManager.getProductById(pid)

        res.status(200).json({ payload: product })
    } catch (error) {
        res.status(500).json(error.message)
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
            
        res.status(201).json({ payload: newProduct })
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.put('/:pid', async (req, res) => {
    try{
        const pid = req.params.pid
        const { field, data } = req.body

        const updatedProduct = await productManager.updateProduct(pid, field, data)

        res.status(200).json({ payload: updatedProduct })
    } catch(error){
        res.status(500).json(error.message)
    }
})

router.delete('/:pid', async (req, res) => {
    try{
        const pid = req.params.pid

        const deletedProduct = await productManager.deleteProduct(pid)

        res.status(200).json({ payload: deletedProduct })
    } catch(error){
        res.status(500).json(error.message)
    }
})

export default router
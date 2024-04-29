import { Router } from 'express'
import productManager from '../../managers/ProductManager.js'
import { uploader } from '../../config/multer.config.js'
import { mediaPaths } from '../../middlewares/multer.middleware.js'

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

router.get('/:pid(\\d+)', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid)

        const product = await productManager.getProductById(pid)

        res.status(200).json({ payload: product })
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/', uploader.array('media', 7), mediaPaths, async (req, res) => {
    try {
        if(!req.body.data) res.status(400).json({ error: 'required data is missing' })

        const data = JSON.parse(req.body.data)

        const {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail
        } = data

        if(req.mediaPaths.length <= 0) {
            const newProduct = await productManager.addProduct(title, description, code, price, status, stock, category, thumbnail)
            
            return res.status(201).json({ status: newProduct })
        }

        const newProduct = await productManager.addProduct(title, description, code, price, status, stock, category, req.mediaPaths)
            
        res.status(201).json({ payload: newProduct })
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.put('/:pid(\\d+)', async (req, res) => {
    try{
        const pid = parseInt(req.params.pid)
        const { field, data } = req.body

        const updatedProduct = await productManager.updateProduct(pid, field, data)

        res.status(200).json({ payload: updatedProduct })
    } catch(error){
        res.status(500).json(error.message)
    }
})

router.delete('/:pid(\\d+)', async (req, res) => {
    try{
        const pid = parseInt(req.params.pid)

        const deletedProduct = await productManager.deleteProduct(pid)

        res.status(200).json({ payload: deletedProduct })
    } catch(error){
        res.status(500).json(error.message)
    }
})

export default router
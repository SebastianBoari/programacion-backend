import { Router } from 'express'
import productManager from '../../classes/ProductManager.js'
import { uploader, mediaPaths } from '../../config/multer.config.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit

        const products = await productManager.getProducts(Number(limit))
        
        res.status(200).json({ payload: products })
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get('/:pid(\\d+)', async (req, res) => {
    try {
        const pid = req.params.pid
        const productId = Number(pid)

        const product = await productManager.getProductById(productId)

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
            
            res.status(201).json({ status: newProduct })
        } else {
            const newProduct = await productManager.addProduct(title, description, code, price, status, stock, category, req.mediaPaths)
            
            res.status(201).json({ payload: newProduct })
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.put('/:pid(\\d+)', async (req, res) => {
    try{
        const pid = req.params.pid
        const productId = Number(pid)
        const { field, data } = req.body

        const updatedProduct = await productManager.updateProduct(productId, field, data)

        res.status(200).json({ payload: updatedProduct })
    } catch(error){
        res.status(500).json(error.message)
    }
})

router.delete('/:pid(\\d+)', async (req, res) => {
    try{
        const pid = req.params.pid
        const productId = Number(pid)

        const deletedProduct = await productManager.deleteProduct(productId)

        res.status(200).json({ payload: deletedProduct })
    } catch(error){
        res.status(500).json(error.message)
    }
})

export default router
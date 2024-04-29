import { Router } from 'express'
import cartManager from '../../managers/CartManager.js'

const router = Router()

router.get('/:cid(\\d+)', async (req, res) => {
    try{
        const cid = req.params.cid
        const cartId = Number(cid)

        const cart = await cartManager.getCartById(cartId)

        res.status(200).json({ payload: cart })
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/', async (req, res) => {
    try {
        const { products } = req.body

        if(!products){
            const newCart = await cartManager.createCart([])

            return res.status(201).json({ payload: newCart })
        } 
        
        const newCart = await cartManager.createCart(products)

        res.status(201).json({ payload: newCart })
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/:cid(\\d+)/product/:pid(\\d+)', async (req, res) => {
    try{
        const cid = req.params.cid
        const pid = req.params.pid
        let { quantity } = req.body

        const cartId = Number(cid)
        const productId = Number(pid)
        quantity = quantity ? quantity : 1

        if(isNaN(quantity)) res.status(400).json({ error: 'Quantity is not an number.'})

        const updatedCart = await cartManager.addProductToCart(cartId, productId, quantity)

        res.status(201).json({ payload: updatedCart })
    } catch(error) {
        res.status(500).json(error.message)
    }
})


export default router
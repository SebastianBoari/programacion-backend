import { Router } from 'express'
import cartManager from '../Dao/DB/CartManager.js'

const router = Router()
router.get('/', async (req, res) => {
    try{
        const carts = await cartManager.getCarts()

        res.status(201).json({ payload: carts })
    } catch(error){
        res.status(500).json({ error: error.message })
    }

})

router.delete('/:cid', async (req, res) => {
    try{
        const carts = await cartManager.deleteCart(req.params.cid)

        res.status(200).json({ payload: carts })
    } catch(error){
        res.status(500).json({ error: error.message })
    }

})

router.get('/:cid', async (req, res) => {
    try{
        const cid = req.params.cid

        const cart = await cartManager.getCartById(cid)

        res.status(200).json({ payload: cart })
    } catch (error) {
        res.status(500).json({ error: error.message })
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
        res.status(500).json({ error: error.message })
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    try{
        const cid = req.params.cid
        const pid = req.params.pid
        let { quantity } = req.body

        quantity = quantity ? quantity : 1

        if(isNaN(quantity)) res.status(400).json({ error: 'Quantity is not an number.'})

        const updatedCart = await cartManager.addProductToCart(cid, pid, quantity)

        res.status(201).json({ payload: updatedCart })
    } catch(error) {
        res.status(500).json({ error: error.message })
    }
})


export default router
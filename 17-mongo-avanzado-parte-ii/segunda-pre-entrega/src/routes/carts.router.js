import { Router } from 'express'
import cartManager from '../Dao/DB/CartManager.js'

const router = Router()
router.get('/', async (req, res) => {
    try{
        const carts = await cartManager.getCarts()

        res.status(201).json({ status: 'success', payload: carts })
    } catch(error){
        console.error(error.message)
        
        res.status(500).json({ status: 'error', error: error.message })
    }

})

router.delete('/:cid', async (req, res) => {
    try{
        const carts = await cartManager.deleteCart(req.params.cid)

        res.status(200).json({ status: 'success', payload: carts })
    } catch(error){
        console.error(error.message)
        
        res.status(500).json({ status: 'error', error: error.message })
    }

})

router.get('/:cid', async (req, res) => {
    try{
        const cid = req.params.cid

        const cart = await cartManager.getCartById(cid)

        res.status(200).json({ status: 'success', payload: cart })
    } catch (error) {
        console.error(error.message)
        
        res.status(500).json({ status: 'error', error: error.message })
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

        res.status(201).json({ status: 'success', payload: newCart })
    } catch (error) {
        console.error(error.message)
        
        res.status(500).json({ status: 'error', error: error.message })
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

        res.status(201).json({ status: 'success', payload: updatedCart })
    } catch(error) {
        console.error(error.message)
        
        res.status(500).json({ status: 'error', error: error.message })
    }
})


export default router
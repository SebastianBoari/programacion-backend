import { Router } from 'express'
import cartManager from '../Dao/DB/CartManager.js'

const router = Router()

router.get('/:cid', async (req, res) => {
    try{
        const cartId = req.params.cid

        const currentCart = await cartManager.getCartById(cartId)

        res.render('cart', {
            title: 'Cart',
            static: 'cart',
            style: 'index',
            cart: currentCart
        })
    } catch(error){
        console.error(error.message)
        
        res.render('error', { error: error})
    }
})

export default router
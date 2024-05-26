import { Router } from 'express'
import cartManager from '../Dao/DB/CartManager.js'

const router = Router()

/**
 * method: GET
 * url: localhost:8080/api/carts
 */
router.get('/', async (req, res) => {
    try{
        const carts = await cartManager.getCarts()

        res.status(201).json({ status: 'success', payload: carts })
    } catch(error){
        console.error(error.message)
        
        res.status(500).json({ status: 'error', error: error.message })
    }
})

/**
 * method: GET
 * error 400 url: localhost:8080/api/carts/:cid+ASD 
 * error 404 url: localhost:8080/api/carts/:cid changed 1 character
 * successful url: localhost:8080/api/carts/:cid
 */
router.get('/:cid', async (req, res) => {
    try{
        const cid = req.params.cid

        const cart = await cartManager.getCartById(cid)

        res.status(200).json({ status: 'success', payload: cart })
    } catch (error) {
        console.error(error.message)
        
        if(error.message === 'An error occurred trying to get the cart by id: Cart does not exists.'){
            return res.status(404).json({ status: 'error', error: error.message })
        }

        if(error.message === 'An error occurred trying to get the cart by id: Invalid Cart ID.'){
            return res.status(400).json({ status: 'error', error: error.message })
        }

        res.status(500).json({ status: 'error', error: error.message })
    }
})

/**
 * method: POST
 * url: localhost:8080/api/carts
 * body (raw/json): 
 {
    "products": [
        { "productId": "pid", "quantity": 1 },
        { "productId": "pid", "quantity": 2 }
    ]
 }
 */
router.post('/', async (req, res) => {
    try {
        const { products } = req.body

        const currentProducts = products || []

        const newCart = await cartManager.createCart(currentProducts)

        res.status(201).json({ status: 'success', payload: newCart })
    } catch (error) {
        console.error(error.message)
        
        res.status(500).json({ status: 'error', error: error.message })
    }
})

/**
 * method: POST
 * url: localhost:8080/api/carts/:cid/product/:pid
 *  body (raw/json): 
    {
        "quantity": 0
    }
 */
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

/**
 *  method: PUT
    url: localhost:8080/api/carts/:cid
    body (raw/json): 
    {
        "products": [
            { "productId": "pid", "quantity": 1 },
            { "productId": "pid", "quantity": 2 }
        ]
    }
 */
router.put('/:cid', async (req, res) => {
    try{
        const cartId = req.params.cid
        const products = req.body.products

        const updatedCart = await cartManager.addManyProductsToCart(cartId, products)

        res.status(201).json({ status: 'success', payload: updatedCart })
    } catch(error) {
        console.error(error.message)
        
        res.status(500).json({ status: 'error', error: error.message })
    }
})

/**
 * method: PUT
 * url: localhost:8080/api/carts/:cid/product/:pid
 * body (raw/json): 
    {
    "quantity": 10
    }
 */
router.put('/:cid/product/:pid', async (req, res) => {
    try{
        const cartId = req.params.cid
        const productId = req.params.pid
        const quantity = req.body.quantity

        const updatedCart = await cartManager.updateProductQuantity(cartId, productId, quantity)

        res.status(200).json({ status: 'success', payload: updatedCart })
    } catch(error) {
        console.error(error.message)
        
        res.status(500).json({ status: 'error', error: error.message })
    }
})

/** TEST ONLY ROUTE
router.delete('/:cid', async (req, res) => {
    try{
        const carts = await cartManager.deleteCart(req.params.cid)

        res.status(200).json({ status: 'success', payload: carts })
    } catch(error){
        console.error(error.message)
        
        res.status(500).json({ status: 'error', error: error.message })
    }
})*/

/**
 * method: DELETE
 * url: localhost:8080/api/carts/6653768caa4dad50d0a596e2
 */
router.delete('/:cid', async (req, res) => {
    try{
        const cartId = req.params.cid

        const cart = await cartManager.deleteProductsOfCart(cartId)

        res.status(200).json({ status: 'success', payload: cart })
    } catch(error){
        console.error(error.message)
        
        res.status(500).json({ status: 'error', error: error.message })
    }
})

/**
 * method: DELETE
 * url: localhost:8080/api/carts/6644d5da805f6d8e889469c4/product/6643e0c969dbbb99501283a0
 */
router.delete('/:cid/product/:pid', async (req, res) => {
    try{
        const cartId = req.params.cid
        const productId = req.params.pid

        const cart = await cartManager.deleteProductOfCart(cartId, productId)

        res.status(200).json({ status: 'success', payload: cart })
    } catch(error){
        console.error(error.message)
        
        res.status(500).json({ status: 'error', error: error.message })
    }
})

export default router
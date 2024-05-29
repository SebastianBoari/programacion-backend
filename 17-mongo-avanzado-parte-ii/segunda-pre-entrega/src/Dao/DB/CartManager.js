import mongoose from 'mongoose'
import { cartsModel } from '../../models/carts.model.js'

class CartManager { 
    /**
     * Get all carts
     *  
     * @returns all carts on database
     */
    async getCarts(){
        try{
            const carts = await cartsModel.find()

            return carts
        } catch(error){
            throw new Error(`An error occurred trying to get all carts: ${error.message}`)
        }
    }

    /**
     * Get a cart by Id
     * 
     * @param {mongoose.Types.ObjectId} cid Cart Id to find 
     * @returns {Promise} Cart by ID
     */
    async getCartById(cid) {
        try{
            if(!cid) throw new Error('Cart ID is required.')

            if (!mongoose.Types.ObjectId.isValid(cid)) throw new Error('Invalid Cart ID.')

            const cart = await cartsModel.findById(cid).lean()

            if(!cart) throw new Error('Cart does not exists.')

            return cart
        } catch(error){
            throw new Error(`An error occurred trying to get the cart by id: ${error.message}`)
        }
    }

    /**
     * Creates a new shopping cart
     * 
     * @param {Array} products Array containing ObjectId of products
     * @returns {Promise} The newly created cart
     */
    async createCart(products) {
        try{
            if(products && !Array.isArray(products)) throw new Error('Products must be an array')
            
            const newCart = {
                products: products ? products : []
            }

            const createdCart = await cartsModel.create(newCart)

            return createdCart
        } catch(error) {
            throw new Error(`An error occurred trying create a cart: ${error.message}`)
        }
    }

    /**
     * Adds a product to a cart
     * 
     * @param {mongoose.Types.ObjectId} cid Cart ID where the product will be added
     * @param {mongoose.Types.ObjectId} pid Product ID to be added to the cart
     * @param {Number} qty Quantity of the product to be added to the cart
     * @returns {Promise} An updated cart with the product added
     */
    async addProductToCart(cid, pid, qty) {
        try{
            if(!cid || !pid) throw new Error('Missed required data.')

            if (!mongoose.Types.ObjectId.isValid(cid)) throw new Error('Invalid Cart ID.')
            if (!mongoose.Types.ObjectId.isValid(pid)) throw new Error('Invalid Product ID.')

            if(!qty) qty = 1

            const currentCart = await cartsModel.findById(cid)
            if (!currentCart) throw new Error('Cart does not exist')

            let productExists = false
            currentCart.products.forEach((product) => {
                if (product.productId.equals(pid)) { // "equals" is a method provided by mongoose
                    product.quantity += qty
                    productExists = true
                }
            })

            if (!productExists) {
                currentCart.products.push({ productId: pid, quantity: qty })
            }

            const updatedCart = await currentCart.save()

            return updatedCart
        } catch(error){
            throw new Error(`An error occurred trying add a product to cart: ${error.message}`)
        }
    }

    /**
     * Adds many products to a cart, overwriting any existing products in the cart.
     * 
     * @param {mongoose.Types.ObjectId} cid - Cart ID where the product will be added.
     * @param {Array.<{ productId: mongoose.Types.ObjectId, quantity: Number}>} products - Array of products to be added to the cart.
     * @returns {Promise} An updated cart with the products added.
     */
    async addManyProductsToCart(cid, products) {
        try{
            if(!cid) throw new Error('Missed required data.')
            if (!mongoose.Types.ObjectId.isValid(cid)) throw new Error('Invalid Cart ID.')

            const currentCart = await cartsModel.findById(cid)
            if (!currentCart) throw new Error('Cart does not exist')

            currentCart.products = products

            const updatedCart = await currentCart.save()

            return updatedCart
        } catch(error){
            throw new Error(`An error occurred trying add a product to cart: ${error.message}`)
        }
    }
    
    /**
     * Updates the quantity of a product in the cart.
     * 
     * @param {mongoose.Types.ObjectId} cid - Cart ID where the product is located.
     * @param {mongoose.Types.ObjectId} pid - Product ID to update the quantity.
     * @param {number} [qty=1] - The new quantity of the product. Defaults to 1 if not provided.
     * @returns {Promise} An updated cart with the product quantity updated.
     */
    async updateProductQuantity(cid, pid, qty){
        try{
            if(!cid || !pid) throw new Error('Missed required data.')
            if (!mongoose.Types.ObjectId.isValid(cid)) throw new Error('Invalid Cart ID.')
            if (!mongoose.Types.ObjectId.isValid(pid)) throw new Error('Invalid Product ID.')
            if(!qty) qty = 1
        
                const currentCart = await cartsModel.findById(cid)
                if (!currentCart) throw new Error('Cart does not exist')
                
                let productExists = false
                currentCart.products.forEach((product) => {
                    if (product.productId.equals(pid)) { // "equals" is a method provided by mongoose
                        product.quantity = qty
                        productExists = true
                    }
                })
        
                if (!productExists) throw new Error('Product to be update the quantity not exists on cart.')

                const updatedCart = await currentCart.save()

                return updatedCart
        } catch(error){
            throw new Error(`An error occurred trying to update product quantity: ${error.message}`)
        }
    }

    /** 
     * Delete a cart by id and show all carts TEST METHOD ONLY
     * 
     * @param {mongoose.Types.ObjectId} cid Cart Id to delete
     * @returns {Promise} All carts 
     */
    async deleteCart(cid){
        try{
            await cartsModel.findByIdAndDelete(cid)

            const updatedCarts = await cartsModel.find()

            return updatedCarts
        } catch(error){
            throw new Error(`An error occurred trying to delete a cart: ${error.message}`)
        }
    }

    /**
     * Deletes one product by id from a cart.
     * 
     * @param {mongoose.Types.ObjectId} cid - Cart ID from which the product will be deleted.
     * @param {mongoose.Types.ObjectId} pid - Product ID to be deleted from the cart.
     * @returns {Promise} updated cart with no products 
     */ 
    async deleteProductOfCart(cid, pid){
        try{
            if (!cid || !pid) throw new Error('Missed required data')
            
            if (!mongoose.Types.ObjectId.isValid(cid)) throw new Error('Invalid Cart ID.')
            if (!mongoose.Types.ObjectId.isValid(pid)) throw new Error('Invalid Product ID.')
        
            const currentCart = await cartsModel.findById(cid)
            if (!currentCart) throw new Error('Cart does not exist')
    
            const initialProductCount = currentCart.products.length
            currentCart.products = currentCart.products.filter((product) => !product.productId.equals(pid))
    
            if (currentCart.products.length === initialProductCount) {
                throw new Error(`Product with ID ${pid} not found in cart with ID ${cid}`)
            }
    
            const updatedCart = await currentCart.save()

            return updatedCart
        } catch(error){
            throw new Error(`Failed to delete product with ID ${pid} from cart with ID ${cid}: ${error.message}`)
        }
    }

    /**
     * Deletes all products from the cart.
     * 
     * @param {mongoose.Types.ObjectId} cid - Cart ID from which all products will be deleted.
     * @returns {Promise} An updated cart with all products deleted.
     */
    async deleteProductsOfCart(cid){
        try{
            if(!cid) throw new Error('Cart ID is required.')
            if (!mongoose.Types.ObjectId.isValid(cid)) throw new Error('Invalid Cart ID.')

            const currentCart = await cartsModel.findById(cid)
            if (!currentCart) throw new Error('Cart does not exist')

            currentCart.products = []

            const updatedCart = await currentCart.save()

            return updatedCart
        } catch(error) {
            throw new Error(`An error occurred trying to delete all products of cart: ${error.message}`)
        }
    }
}

const cartManager = new CartManager()

export default cartManager
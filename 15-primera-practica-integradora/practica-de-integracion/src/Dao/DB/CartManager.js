import { cartsModel } from '../../models/carts.model.js'

class CartManager { 

    /**
     * Show all carts
     * @returns {Promise}
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
     * Delete a cart by id and show all carts
     * @param {import('mongoose').ObjectId} cid Cart Id to delete
     * @returns {Promise} All carts 
     */
    async deleteCart(cid){
        try{
            await cartsModel.findByIdAndDelete(cid)

            const updatedCarts = await this.getCarts()

            return updatedCarts
        } catch(error){
            throw new Error(`An error occurred trying to delete a cart: ${error.message}`)
        }
    }

    /**
    * Get a cart by Id
    * @param {import('mongoose').ObjectId} cid Cart Id to find 
    * @returns Cart by ID
    */
    async getCartById(cid) {
        try{
            if(!cid) throw new Error('Cart ID is required.')
            
            const cart = await cartsModel.findById(cid)

            if(!cart) throw new Error('Cart does not exists.')

            return cart
        } catch(error){
            throw new Error(`An error occurred trying to get the cart by id: ${error.message}`)
        }
    }


    /**
    * Creates a new shopping cart
    * @param {Array} products Array containing ObjectId of products
    * @returns {Object} The newly created cart
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
    * @param {import('mongoose').ObjectId} cid Cart ID where the product will be added
    * @param {import('mongoose').ObjectId} pid Product ID to be added to the cart
    * @param {Number} qty Quantity of the product to be added to the cart
    * @returns An updated cart with the product added
    */
    async addProductToCart(cid, pid, qty) {
        try{
            if(!cid || !pid) throw new Error('Missed required data.')

            if(!qty) qty = 1

            const currentCart = await this.getCartById(cid)

            if (!currentCart) throw new Error('Cart does not exist')

            let productExists = false

            currentCart.products.forEach((product) => {
                // "equals" is a method provided by mongoose
                if (product.productId.equals(pid)) {
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
}

const cartManager = new CartManager()

export default cartManager
import fs from 'fs'
import { __dirname } from '../utils.js'
import path from 'path'

class CartManager {
    #carts
    #path

    constructor(path) {
        this.#path = path

        const mock = [{
            id: 0,
            products: []
        }]


        if(!fs.existsSync(this.#path)) {
            fs.writeFileSync(path, JSON.stringify(mock, null, '\t'))
        }
    }

    /**
     * Returns new ID based on quantity of carts on database
     * @returns {Number} A new ID for a new cart 
     */
    async #idGenerator() {
        try {            
            await this.#loadCarts()

            if (this.#carts.length === 0) {
                return 1
            } else {
                return this.#carts[this.#carts.length - 1].id + 1
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    /**
     * Load all carts on memory
     */
    async #loadCarts() {
        try{
            const carts = await fs.promises.readFile(this.#path, 'utf-8')
            this.#carts = JSON.parse(carts)
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Save all the carts in memory in a JSON
     */
    async #saveCarts() {
        try{
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts, null, '\t'))
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Get a cart by Id
     * @param {Number} cid Cart Id to find 
     * @returns Cart by ID
     */
    async getCartById(cid) {
        try{
            if(!cid) throw new Error('Cart ID is required.')
            
            await this.#loadCarts()

            const cartId = Number(cid)

            if(cartId === 'isNaN') throw new Error('Cart ID is not an number.')

            const cart = this.#carts.find((cart) => cart.id === cartId)

            if(!cart) throw new Error('Cart does not exists.')

            return cart
        } catch(error){
            const check1 = error.message !== 'Cart ID is required.'
            const check2 = error.message !== 'Cart ID is not an number.'
            const check3 = error.message !== 'Cart does not exists.'

            if(check1 && check2 && check3) throw new (Error)
        
            throw error
        }
    }


    /**
     * Create a cart
     * @param {Array} products Array of products with each product id and quantity of each product
     * @returns {Object} Created cart
     */
    async createCart(products) {
        try{
            const newId = await this.#idGenerator()

            const newCart = {
                id: newId,
                products: products
            }

            this.#carts.push(newCart)

            await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts, null, '\t'))

            const createdCart = await this.getCartById(newCart.id)

            return createdCart
        } catch(error) {
            throw new Error(error.message)
        }
    }

    /**
     * Adds a product to a cart
     * @param {Number} cid art ID where the product will be added
     * @param {Number} pid Product ID to be added to the cart
     * @param {Number} qty Quantity of the product to be added to the cart
     * @returns An updated cart with the product added
     */
    async addProductToCart(cid, pid, qty) {
        try{
            await this.#loadCarts()

            const currentCart = this.#carts.find((cart) => cart.id === cid)

            const productIsRepeated = currentCart.products.find((product) => product.productId === pid)

            if(productIsRepeated){
                productIsRepeated.quantity += qty

                await this.#saveCarts()

                const updatedCart = await this.getCartById(cid)
    
                return updatedCart
            }

            const newProduct = {
                productId: pid,
                quantity: qty
            }

            currentCart.products.push(newProduct)

            await this.#saveCarts()

            const updatedCart = await this.getCartById(cid)

            return updatedCart
        } catch(error){
            throw new Error(error)
        }
    }
}

const cartManager = new CartManager(path.resolve(__dirname, '..', 'data', 'carts.json'))

export default cartManager
import fs from 'fs'
import { __dirname } from '../../utils.js'
import path from 'path'
import productManager from './ProductManager.js'

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
        await this.#loadCarts()

        if (this.#carts.length === 0) {
            return 1
        } else {
            return this.#carts[this.#carts.length - 1].id + 1
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
            throw new Error(error)
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
            if(cid === undefined || cid === null || isNaN(cid)) throw new Error('Cart ID is required.')
            
            await this.#loadCarts()

            if(cid === 'isNaN') throw new Error('Cart ID is not an number.')

            const cart = this.#carts.find((cart) => cart.id === cid)

            if(!cart) throw new Error('Cart does not exists.')

            return cart
        } catch(error){
            throw new Error(`An error occurred trying to get the cart by id: ${error.message}`)
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

            if(products.length > 0){
                for (const product of products) {
                    await productManager.getProductById(product.productId)
                }
            }

            this.#carts.push(newCart)

            await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts, null, '\t'))

            const createdCart = await this.getCartById(newCart.id)

            return createdCart
        } catch(error) {
            throw new Error(`An error occurred trying create a cart: ${error.message}`)
        }
    }

    /**
    * Adds a product to a cart
    * @param {Number} cid Cart ID where the product will be added
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
            throw new Error(`An error occurred trying add a product to cart: ${error.message}`)
        }
    }
}

const cartManager = new CartManager(path.resolve(__dirname, '..', 'data', 'carts.json'))

export default cartManager
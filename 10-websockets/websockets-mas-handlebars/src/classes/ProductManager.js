import fs from 'fs'
import path from 'path'
import { __dirname } from '../utils.js'

class ProductManager {
    #products
    #path

    constructor(path) {
        this.#path = path

        const mock = [{
            id: 0,
            title: 'Example',
            description: 'This is an example product',
            price: 300,
            thumbnail: 'www.example.com/example123.png',
            code: 'example-code-123',
            stock: 999
        }]


        if (!fs.existsSync(this.#path)) {
            fs.writeFileSync(path, JSON.stringify(mock, null, '\t'))
        }
    }

    /**
     * Returns new ID based on quantity of products on database
     * @returns {Number} A new ID for a new product 
     */
    async #idGenerator() {
        try {
            const products = await this.getProducts()

            if (products.length === 0) {
                return 1
            } else {
                return products[products.length - 1].id + 1
            }
        } catch (error) {
            throw new Error(`Error trying to generate a new ID: ${error}`)
        }
    }

    /**
     * Returns all products on database with optional limit
     * @param {Number} limit - Limit of products (optional)
     * @returns {Array} Array of objects with all products on database 
     */
    async getProducts(limit) {
        try {
            const data = await fs.promises.readFile(this.#path, 'utf-8')

            this.#products = JSON.parse(data, null, '\t')
            
            if(!limit) return this.#products
            
            return this.#products.slice(0, Number(limit))
        } catch (error) {
            throw new Error(error)
        }
    }

    /**
     * Return the new product using "getProductById"
     * @param {String} title - Title of the new product. (required)
     * @param {String} description - Description of the new product. (required)
     * @param {String} code - Unique identification code of the new product. A group of 4 letters and another group of 4 numbers separated by a hyphen. (required)
     * @param {Number} price - New product price. (required)
     * @param {Boolean} [status] - True: The product is published publicly. False: The product is stored privately. Default value: true. (optional)
     * @param {Number} stock - Stock of the new product. (required)
     * @param {String} category - Category of the new product. (required)
     * @param {Array} [thumbnail] - An array containing the paths to the new product's multimedia material(optional)
     * @returns {Promise} 
     */
    async addProduct(title, description, code, price, status, stock, category, thumbnail) {
        try {
            if(!title) throw new Error('title is required')
            if(!description) throw new Error('description is required')
            if(!code) throw new Error('code is required')
            if(!price) throw new Error('price is required')
            if(!stock) throw new Error('stock is required')
            if(!category) throw new Error('category is required')

            const products = await this.getProducts()

            if (products.find(item => item.code === code)) throw new Error('Product code already exists')
        
            const newProduct = {
                id: await this.#idGenerator(),
                title: title.trim(),
                description: description.trim(),
                code: code.trim(),
                price: Number(price),
                status: status !== undefined ? status : true,
                stock: Number(stock),
                category: category.trim(),
                thumbnail: thumbnail ? thumbnail : []
            }

            products.push(newProduct)

            await fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'))

            const currentProduct = await this.getProductById(newProduct.id)

            return currentProduct
        } catch (error) {
            throw new Error(`Error trying to add a product: ${error.message}`)
        }
    }

    /**
     * @param {Number} pid - Searched product ID (required)
     * @returns {Object}
     */
    async getProductById(pid) {
        try {
            if (!pid) throw new Error('Plese, enter a product id')

            const products = await this.getProducts()

            return products.find(item => item.id === pid)
        } catch (error) {
            throw new Error(`Error trying to get a product by Id: ${error}`)
        }
    }


    /**
     * Update a field of a product
     * - Title (String)
     * - Description (String)
     * - Code (String)
     * - Price (Number)
     * - Status (Boolean)
     * - Stock (Number)
     * - Category (String)  
     * @param {Number} pid Product ID to update (required)
     * @param {String} field Product field to update (required)
     * @param {*} data Data updated (required)
     * @returns {Object}
     */
    async updateProduct(pid, field, data) {
        try {
            if (!pid || !field || (data == undefined)) throw new Error('Missed required arguments')

            if (field === 'id') throw new Error('Cannot modified field id')
    
            if((field === 'title' || field === 'description' || field === 'code' || field === 'category') && typeof data !== 'string') throw new Error('product field to be modified requires a string data type')
            
            if((field === 'price' || field === 'stock') && typeof data !== 'number') throw new Error('product field to be modified requires a Number data type')
        
            if((field === 'status') && (data !== 'true' ^ data !== 'false')) throw new Error('product field to be modified requires a boolean data type')

            const products = await this.getProducts()

            const productIndex = products.findIndex(item => item.id === pid)

            if (productIndex === -1) throw new Error('Product not found')

            products[productIndex][field] = data

            await fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'))

            return products[productIndex]
        } catch (error) {
            throw new Error(error)
        }
    }


    /**
     * Delete a product by ID and returns all products
     * @param {Number} pid Product ID of product to delete (required) 
     * @returns {Array} 
     */
    async deleteProduct(pid) {
        try {
            if (!pid) throw new Error('Missed required arguments')

            const products = await this.getProducts()
            const productIndex = products.findIndex(item => item.id === pid)

            products[productIndex].thumbnail[0].forEach((mediaPath) => {
                fs.unlinkSync(mediaPath)
            })

            products.splice(productIndex, 1)

            await fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'))
            
            return products
        } catch (error) {
            throw new Error(error)
        }
    }
}

const productManager = new ProductManager(path.resolve(__dirname, '..', 'data', 'products.json'))


export default productManager
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
        const products = await this.getProducts()

        if (products.length === 0) {
            return 1
        } else {
            return products[products.length - 1].id + 1
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
            
            if(isNaN(limit)) throw new Error('Limit is not a number')
            
            if(limit < 0) throw new Error('Limit cannot be a number less than 0')

            return this.#products.slice(0, Number(limit))
        } catch (error) {
            throw new Error(`An error occurred trying to get all products: ${error.message}`)
        }
    }

    /**
    * @param {Number} pid - Searched product ID (required)
    * @returns {Object}
    */
    async getProductById(pid) {
        try {
            if (pid === undefined || pid === null || isNaN(pid)) throw new Error('Missed required arguments')

            const products = await this.getProducts()

            const currentProduct = products.find(item => item.id === pid)

            if(!currentProduct) throw new Error('Product does not exists')

            return currentProduct
        } catch (error) {
            throw new Error(`An error occurred trying to get the product by id: ${error.message}`)
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
            if(typeof title !== 'string') throw new Error('title field requires a string')

            if(!description) throw new Error('description is required')
            if(typeof description !== 'string') throw new Error('description field requires a string')

            if(!code) throw new Error('code is required')
            if(typeof code !== 'string') throw new Error('code field requires a string')

            if(!category) throw new Error('category is required')
            if(typeof category !== 'string') throw new Error('category field requires a string')

            if(!price) throw new Error('price is required')
            if(isNaN(price)) throw new Error('price field requires a number')

            if(!stock) throw new Error('stock is required')
            if(isNaN(stock)) throw new Error('stock field requires a number')

            const products = await this.getProducts()

            if (products.find(item => item.code === code)) throw new Error('product code already exists')
        
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
            throw new Error(`An error occurred trying to add the product: ${error.message}`)
        }
    }

    /**
    * Update a field of a product
    * - Title (String)
    * - Description (String)
    * - Code (String)
    * - Price (Float)
    * - Status (Boolean)
    * - Stock (Int)
    * - Category (String)
    * - Thumbnail (Array or String) If it receives a string, it is presumed to be the path of an existing file and proceeds to delete it. If it receives an array, it is appended to the existing media.
    * @param {Number} pid Product ID to update (required)
    * @param {String} field Product field to update (required)
    * @param {*} data Data updated (required)
    * @returns {Object}
    */
    async updateProduct(pid, field, data) {
        try {
            if ((pid === undefined || pid === null || isNaN(pid)) || !field || (data == undefined)) throw new Error('Missed required arguments')

            if (field === 'id') throw new Error('Cannot modified field id')
    
            if((field === 'title' || field === 'description' || field === 'code' || field === 'category') && typeof data !== 'string') throw new Error('product field to be modified requires a string data type')
            
            if((field === 'price' || field === 'stock') && typeof data !== 'number') throw new Error('product field to be modified requires a Number data type')
        
            if((field === 'status') && (data !== 'true' ^ data !== 'false')) throw new Error('product field to be modified requires a boolean data type')

            const products = await this.getProducts()

            const productIndex = products.findIndex(item => item.id === pid)

            if (productIndex === -1) throw new Error('Product not found')

            if(field === 'thumbnail'){
                
                if(typeof data === 'string'){
                    if(fs.existsSync(data)){
                        products[productIndex][field].filter((path) => path !== data)

                        await fs.promises.unlink(data)

                        await fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'))

                        return products[productIndex]
                    }

                    const dataUpdated = products[productIndex][field].filter((path) => path !== data)

                    products[productIndex][field] = dataUpdated

                    await fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'))

                    return products[productIndex]
                }

                if(Array.isArray(data)){
                    products[productIndex][field].push(...data)

                    await fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'))

                    return products[productIndex]
                }
            }

            products[productIndex][field] = data

            await fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'))

            return products[productIndex]
        } catch (error) {
            throw new Error(`An error occurred trying to update the product: ${error.message}`)
        }
    }

    /**
    * Delete a product by ID and returns all products
    * @param {Number} pid Product ID of product to delete (required) 
    * @returns {Array} 
    */
    async deleteProduct(pid) {
        try {
            if (pid === undefined || pid === null || isNaN(pid)) throw new Error('Missed required arguments')
            
            const products = await this.getProducts()
            const productIndex = products.findIndex(item => item.id === pid)

            if(products[productIndex].thumbnail.length >= 1){
                products[productIndex].thumbnail.forEach(async (mediaPath) => {
                    const isFileExists = fs.existsSync(mediaPath)
                    
                    if(isFileExists){
                        await fs.promises.unlink(mediaPath)
                    }
                })
            }

            products.splice(productIndex, 1)

            await fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'))
            
            return products
        } catch (error) {
            throw new Error(`An error occurred trying to delete the product: ${error.message}`)
        }
    }
}

const productManager = new ProductManager(path.resolve(__dirname, '..', 'data', 'products.json'))


export default productManager
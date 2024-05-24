import { productsModel } from '../../models/products.model.js'

class ProductManager {
/**
 * Returns products from the database with optional filters.
 * @param {number} [limit] - Maximum number of products (optional).
 * @param {number} [page] - Page number of products (optional).
 * @param {*} [query] - Query to filter products by category (optional).
 * @param {string} [sort] - Sort order: 'asc' or 'desc' (optional).
 * @returns {Array<Object>} List of products from the database.
*/
    async getProducts(limit, page, query, sort) {
        try {
            if (limit && isNaN(parseInt(limit))) throw new Error('Limit must be a number') 

            if (page && isNaN(parseInt(page))) throw new Error('Page must be a number') 
            
            if (query && (/^\s+$/.test(query) || query.trim().length === 0)) throw new Error('Query cannot be empty')

            if (sort && (sort !== 'asc' && sort !== 'desc')) throw new Error('Sort must be "asc" or "desc"') 

            const opts = {
                limit: limit ? parseInt(limit) : 16,
                page: page ? parseInt(page) : 1,
                query: query ? { category: new RegExp(query.trim(), 'i') } : {},
                sort: sort === 'asc' ? 1 : -1
            }

            return await productsModel.paginate(opts.query, { limit: opts.limit, page: opts.page, sort: { price: opts.sort } })
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
            if (pid === undefined || pid === null) throw new Error('Missed required arguments')

            const currentProduct = await productsModel.findOne({ _id: pid })

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
    * @returns {Object} 
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

            const newProduct = {
                title: title.trim(),
                description: description.trim(),
                code: code.trim(),
                price: Number(price),
                status: status !== undefined ? status : true,
                stock: Number(stock),
                category: category.trim(),
                thumbnail: thumbnail ? thumbnail : []
            }

            const currentProduct = await productsModel.create(newProduct)

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
    * - Thumbnail (Array of strings)
    * @param {Number} pid Product ID to update (required)
    * @param {String} field Product field to update (required)
    * @param {*} data Data updated (required)
    * @returns {Object}
    */
    async updateProduct(pid, field, data) {
        try {
            // Validate parameters
            if (!pid || !field || (data === null || data === undefined)) {
                if(!pid) throw new Error('Product ID is required')
                if(!field) throw new Error('Field is required')
                if(!data) throw new Error('Data is required')
            }
            
            // Cannot update id
            if (field === '_id' || field === 'id') throw new Error('Cannot modified field id')
    
            // Validate typeof parameters
            if((field === 'title' || field === 'description' || field === 'code' || field === 'category') && typeof data !== 'string') throw new Error('product field to be modified requires a string data type')
            
            if((field === 'price' || field === 'stock') && typeof data !== 'number') throw new Error('product field to be modified requires a Number data type')
        
            if((field === 'status') && (data !== true && data !== false)) throw new Error('product field to be modified requires a boolean data type')
            
            if(field === 'thumbnail' && !Array.isArray(data)) throw new Error('product field to be modified requires a Array data type')

            if(field === 'thumbnail' && Array.isArray(data)){
                data.forEach((element) => {
                    if(typeof element !== 'string') throw new Error('product field to be modified requires a Array of strings data type')
                })
            }

            const updatedProduct = await productsModel.findByIdAndUpdate(pid, { [field]: data }, { new: true })
            
            return updatedProduct
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
            if (!pid) throw new Error('Product ID is required')
            
            const deletedProduct = await productsModel.deleteOne({ _id: pid })
            
            if(deletedProduct.deletedCount !== 1) throw new Error('Product not found')
            
            const products = await this.getProducts()

            return products
        } catch (error) {
            throw new Error(`An error occurred trying to delete the product: ${error.message}`)
        }
    }
}

const productManager = new ProductManager()

export default productManager

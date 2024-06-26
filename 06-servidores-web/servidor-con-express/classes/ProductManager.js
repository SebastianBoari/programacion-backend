import fs from 'fs'

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

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.#path, 'utf-8')

            this.#products = JSON.parse(data, null, '\t')

            return this.#products
        } catch (error) {
            throw new Error(error)
        }
    }

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

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            if (!title || !description || !price || !thumbnail || !code || !stock) throw new Error('Faltan datos sobre el producto')

            const products = await this.getProducts()

            if (products.find(item => item.code === code)) {
                throw new Error('Product code already exists')
            }

            const newProduct = {
                id: await this.#idGenerator(),
                title: title.trim(),
                description: description.trim(),
                price: Number(price),
                thumbnail: thumbnail.trim(),
                code: code.trim(),
                stock: Number(stock)
            }

            products.push(newProduct)

            await fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'))

            return products
        } catch (error) {
            throw new Error(`Error trying to add a product: ${error}`)
        }
    }

    async getProductById(pid) {
        try {
            if (!pid) throw new Error('Plese, enter a product id')

            const products = await this.getProducts()

            return products.find(item => item.id === pid)
        } catch (error) {
            throw new Error(`Error trying to get a product by Id: ${error}`)
        }
    }

    async updateProduct(pid, field, data) {
        try {
            if (!pid || !field || !data) throw new Error('Missed required arguments')

            if (field === 'id') throw new Error('Cannot modified field id')

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

    async deleteProduct(pid) {
        try {
            if (!pid) throw new Error('Missed required arguments')

            const products = await this.getProducts()
            const productIndex = products.findIndex(item => item.id === pid)

            products.splice(productIndex, 1)

            await fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'))

            return products
        } catch (error) {
            throw new Error(error)
        }
    }
}

const productManager = new ProductManager('./products.json')

export default productManager
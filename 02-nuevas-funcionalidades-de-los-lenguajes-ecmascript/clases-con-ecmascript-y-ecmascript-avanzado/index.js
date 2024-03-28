class ProductManager {

    #products
    #id

    constructor() {
        this.#products = []
        this.#id = 0
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!code) {
            return 'ERROR: The "Code" field is required'
        }

        const newProduct = {
            id: this.#generateId(),
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }

        if (!this.#validateCode(code)) {
            return 'ERROR: The entered code already exists'
        }

        this.#products.push(newProduct)
    }

    getProducts() {
        return this.#products
    }

    getProductById(pid) {
        if (!pid) {
            return 'ERROR: product id field is required.'
        }

        const product = this.#products.find((product) => product.id === pid)

        if (!product) {
            return 'ERROR: Product not found'
        }

        return product
    }

    #validateCode(code) {

        return true
    }

    #generateId() {
        return this.#id++
    }

}

const productManager = new ProductManager()

// Array vacio
console.log(productManager.getProducts())

// Agregamos un producto
productManager.addProduct('Vino', 'Excelente vino mendocino', 5760, 'https://th.bing.com/th/id/OIP.qHWp5etYZxNGaTfYYl2mCwHaHa?rs=1&pid=ImgDetMain', 'WINE-001', 248)

// Vemos los productos
console.log(productManager.getProducts())

// Agregamos otro producto
productManager.addProduct('Carne', 'Excelente carne de Entre Rios', 3500, 'https://th.bing.com/th/id/OIP.TnBx5-NNakd69V9a1WdMSQHaEy?rs=1&pid=ImgDetMain', 'MEAT-001', 120)


// Vemos el ultimo producto agregado
console.log(productManager.getProductById(1))

// Nos devuelve error
console.log(productManager.getProductById(2))
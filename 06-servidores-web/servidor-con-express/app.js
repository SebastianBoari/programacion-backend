import express from 'express'
import productManager from './classes/ProductManager.js'

const app = express()
const port = 8080

app.use(express.urlencoded({ extended: true }))

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit

        const products = await productManager.getProducts()

        if (!limit) return res.json(products)

        const filteredNumbersByLimit = products.slice(0, Number(limit))

        res.json(filteredNumbersByLimit)
    } catch (error) {
        res.json({ error: error })
    }
})


app.get('/products/:pid', async (req, res) => {
    try {
        const pid = req.params.pid

        const product = await productManager.getProductById(Number(pid))

        res.json(product)
    } catch (error) {
        res.json({ error: error })
    }
})

app.listen(port, () => console.log(`Listening on port: ${port}`))
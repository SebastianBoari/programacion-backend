import mongoose from 'mongoose'

const cartsCollection = 'carts'

const productSchema = mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    quantity: Number
}, { _id: false })

const cartsSchema = mongoose.Schema({
    products: [productSchema]
})

cartsSchema.pre('find', function(next) {
    this.populate('products.productId')
    next()
})

cartsSchema.pre('findOne', function(next) {
    this.populate('products.productId')
    next()
})

export const cartsModel = mongoose.model(cartsCollection, cartsSchema)

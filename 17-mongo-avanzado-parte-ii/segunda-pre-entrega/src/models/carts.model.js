import mongoose from 'mongoose'

const cartsCollection = 'carts'

const productSchema = mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    quantity: Number
}, { _id: false })

const cartsSchema = mongoose.Schema({
    products: [productSchema]
})

cartsSchema.pre('findOne', function() {
    this.populate('products.productId')
})

export const cartsModel = mongoose.model(cartsCollection, cartsSchema)

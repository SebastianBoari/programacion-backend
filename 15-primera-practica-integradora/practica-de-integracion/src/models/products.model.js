import mongoose from 'mongoose'

const productsCollection = 'products'

const productsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true 
    },
    code: {
        type: String,
        unique: true,
        required: true 
    },
    price: {
        type: Number,
        required: true 
    },
    status: {
        type: Boolean,
        required: true 
    },
    stock: {
        type: Number,
        required: true 
    },
    category: {
        type: String,
        required: true 
    },
    thumbnail: [String]
})

export const productsModel = mongoose.model(productsCollection, productsSchema)

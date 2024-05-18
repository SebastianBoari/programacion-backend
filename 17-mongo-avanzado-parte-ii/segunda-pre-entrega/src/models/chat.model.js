import mongoose from 'mongoose'

const chatCollection = 'chat'

const chatSchema = mongoose.Schema({
    message: String,
    user: String, 
}, { timestamps: true })

export const chatModel = mongoose.model(chatCollection, chatSchema)

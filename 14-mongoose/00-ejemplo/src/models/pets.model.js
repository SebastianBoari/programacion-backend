import mongoose from 'mongoose'

const petsCollection = 'pets'

const petsSchema = new mongoose.Schema({
    name: String,
    species: String,
    age: Number
})

export const petsModel = mongoose.model(petsCollection, petsSchema)
import express from 'express'
import mongoose from 'mongoose'
import petsRouter from './routes/pets.routes.js'

const app = express()
app.use(express.json())

app.use('/pets', petsRouter)

app.listen(8080, () => console.log('Server up'))

const mongoUri = 'Inserte aquí la uri que le proporciona Mongo Atlas'

try {
    await mongoose.connect('mongodb+srv://luciosebastianboari:NVAF2Shs27adtdxf@cluster0.ioxmi5a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

    console.log('Database up')
} catch (error) {
    console.log(`Cannot connect to database: ${error.message}`)
}

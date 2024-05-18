import mongoose from 'mongoose'

const connection = async (uri) => {
    try {
        await mongoose.connect(uri)
        
        const dbName = mongoose.connection.db.databaseName

        console.log(`Database ${dbName} up`)
    } catch (error) {
        console.log(`Cannot connect to database: ${error.message}`)
    }    
}

export { connection }

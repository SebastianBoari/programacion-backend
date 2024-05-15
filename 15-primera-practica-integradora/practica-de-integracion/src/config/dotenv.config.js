import env from 'dotenv'

env.config()

const mongoUri = process.env.MONGO_URI
const port = process.env.PORT

export { mongoUri, port }

import env from 'dotenv'

env.config()

const mongoUri = process.env.MONGO_URI
const port = process.env.PORT
const sessionSecret = process.env.SESSION_SECRET

export { mongoUri, port, sessionSecret }

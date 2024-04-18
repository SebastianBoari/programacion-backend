import express from 'express'
import usersRouter from './routes/users.router.js'
import petsRouter from './routes/users.router.js'

const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/pets', petsRouter)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))


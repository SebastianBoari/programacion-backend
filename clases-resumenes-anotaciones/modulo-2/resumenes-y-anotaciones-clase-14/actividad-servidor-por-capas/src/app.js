import express from 'express'
import router from './routers/toy.router.js'

const app = express()
app.use(express.json())

app.use('/api/toys', router)

app.listen(8080, () => console.log('Server Up!'))
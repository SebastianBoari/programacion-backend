import express from 'express'
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))

let users = []

app.post('/api/register', (req, res) => {
    const user = req.body

    users.push(user)

    res.status(201).json({ payload: user })
})

app.get('/register', (req, res) => {

    res.render('register', {
        style: "index",
    })
})

app.get('/login', (req, res) => {
    res.render('login', {
        style: "index",
    })
})

app.listen(8080, () => console.log('Listening on port 8080'))
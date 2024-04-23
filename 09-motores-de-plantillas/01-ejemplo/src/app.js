import express from 'express'
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'

const app = express()

app.engine('handlebars', handlebars.engine())

app.set('views', __dirname + '/views')

app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    const users = [
        {
            name: "Carlos",
            surname: "Cardozo",
            age: 39,
            email: "carloscardozo@gmail.com",
            telnumber: "01144444444"
        },
        {
            name: "Martin",
            surname: "Martinez",
            age: 54,
            email: "martinmartinez@gmail.com",
            telnumber: "01155555555"
        },
        {
            name: "Marcos",
            surname: "Mengolini",
            age: 28,
            email: "marcosmengolini@gmail.com",
            telnumber: "01166666666"
        },
        {
            name: "Carla",
            surname: "Cardoza",
            age: 35,
            email: "carlacardoza@gmail.com",
            telnumber: "01177777777"
        },
        {
            name: "Alicia",
            surname: "Alsides",
            age: 62,
            email: "aliciaalsides@gmail.com",
            telnumber: "01188888888"
        }
    ]

    const testUser = {
        name: "Alan",
        surname: "Wake",
        role: false
    }

    res.render('index', {
        user: testUser,
        isAdmin: testUser.role,
        users: users
    })
})

app.listen(8080, () => console.log('Listening on port 8080'))
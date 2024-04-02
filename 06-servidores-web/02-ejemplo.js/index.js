import express from 'express'

const app = express()

app.use(express.urlencoded({ extended: true }))

// Introducción al objeto request (req.params)
app.get('/bienvenida/:nombre/:apellido', (req, res) => {
    res.send(`Hola ${req.params.nombre} ${req.params.apellido}!!!`) // Para ver el mensaje buscamos en nuestro navegador: "localhost:8080/bienvenida/jorge/rojas" y probamos con distintos nombres y apellidos para ver el cambio
})

// Introducción al objeto request req.query
app.get('/ejemploQueries', (req, res) => {

    let consultas = req.query
    let { nombre, apellido, edad } = req.query

    res.send(`Hola ${nombre} ${apellido}, es cierto que tu tienes ${edad} años? Wow!`) // Para ver el mensaje buscamos en nuestro navegador: "localhost:8080/ejemploQueries?nombre=Mauricio&apellido=Espinosa&edad=25" y probamos con distintos datos
})

const users = [
    { id: "abc1", nombre: "Mauricio", apellido: "Espinosa", edad: 25, genero: "M" },
    { id: "abc2", nombre: "Natalia", apellido: "Cardozo", edad: 23, genero: "F" },
    { id: "abc3", nombre: "Roberto", apellido: "Gomez", edad: 33, genero: "M" }
]

// Caso practico de req.query
app.get('/queries', (req, res) => {
    const genero = req.query.genero

    if (!genero || (genero !== "M" && genero !== "F")) return res.json(users)

    const filteredUsers = users.filter(user => user.genero === genero)

    res.json(filteredUsers) // Para ver el mensaje buscamos en nuestro navegador: "localhost:8080/queries?genero=F" y probamos cambiando el genero a M.
})


// Caso practico de req.params


app.get('/:userId', (req, res) => {
    const userId = req.params.userId

    const user = users.find((user) => user.id === userId)

    if (!user) return res.json({ error: "User not found." })

    res.json(user) // Para ver el mensaje buscamos en nuestro navegador: "localhost:8080/abc1" y probamos con distintos ids y con algunos que no existan
})



app.listen(8080, () => console.log('Listening on port 8080'))

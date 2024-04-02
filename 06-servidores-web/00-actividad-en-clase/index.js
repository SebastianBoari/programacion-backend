/*Actividad en clase: Otras respuestas con Express

Crear un proyecto basado en express js, el cual cuente con un servidor que escuche en el puerto 8080. Además de configurar los siguientes endpoints:

- El endpoint del método GET a la ruta  ‘/bienvenida’ deberá devolver un html con letras en color azul, en una string, dando la bienvenida.

- El endpoint del método GET a la ruta ‘/usuario’ deberá devolver un objeto con los datos de un usuario falso: {nombre, apellido,edad, correo}*/

import express from 'express'

const app = express()
const port = 8080

app.get('/bienvenida', (req, res) => {
    const bienvenidaHtml = '<html><body><h1 style="color:blue;">Bienvenido!</h1></body></html>'
    res.send(bienvenidaHtml)
})

app.get('/usuario', (req, res) => {
    const usuario = {
        nombre: 'John',
        apellido: 'Doe',
        edad: 30,
        correo: 'john.doe@example.com'
    }

    res.json(usuario)
})

app.listen(port, () => console.log(`Listening on port: ${port}`))

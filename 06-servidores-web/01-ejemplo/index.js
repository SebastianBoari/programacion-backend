// Instalamos (npm i express) e importamos express
import express from 'express'

// Inicializamos una nueva instancia de la aplicación Express y la asignamos a la variable app.
const app = express()

// app.get apertura de un "endpoint", el cual indica al proyocolo HTTP que, en la ruta /saludo espera una petición del tipo GET.
app.get('/saludo', (req, res) => {
    res.send('Hola a todos desde Express.') // Podemos visualizar el mensaje accediendo a nuestro navegador a la ruta 'localhost:8080/saludo'
})

// Levantamos el servidor y lo ponemos en escucha en un puerto de nuestra computadora.
app.listen(8080, () => console.log('Listening on port 8080'))


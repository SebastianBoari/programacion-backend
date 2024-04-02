import http from 'http'

const server = http.createServer((request, response) => {
    response.end('Mi primer hola mundo desde el backend.') // Accediendo a nuestro navegador y buscando "localhost:8080" podremos visualizar el mensaje
})

server.listen(8080, () => {
    console.log('Listening on port 8080')
})


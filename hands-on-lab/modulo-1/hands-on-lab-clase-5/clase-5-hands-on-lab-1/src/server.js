// Hands on Lab: Express Router

// Consigna:
// ¿Cómo lo hacemos? Se crearán dos routers: users y pets. 
// El router de users debe tener la ruta principal /api/users
// El router de pets debe tener la ruta principal /api/pets
// Ambos deben tener, de manera interna, un array para almacenarlos.
// Ambos deben contar con un método get en su ruta raíz para poder obtener el arreglo.
// Ambos deben contar con un método POST en su ruta raíz para poder agregar un usuario o mascota según sea el router.
// Conectar los routers al archivo app.js para tener listo el apuntador al router. 
// Probar funcionalidad con Postman o Thunderclient/

const express = require('express');
const app = express();
const usersRouter = require('./routes/users.router');
const petsRouter = require('./routes/pets.router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/users', usersRouter);

app.use('/pets', petsRouter);


app.listen(8080, () => console.log('Server Up'));

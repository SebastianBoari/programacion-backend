// Imports
import mongoose from 'mongoose';
import express from 'express';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js'
// Configs
const app = express();
let port = 8080;
app.engine('handlebars', handlebars.engine());
app.set('views',  './src/views');
app.set('view engine', 'handlebars');

// DB
const dbConnection = async () => {
    await mongoose.connect('mongodb+srv://sebastianboari:k14t34AswjuUtUso@lsb-db.qyoux2f.mongodb.net/students');
    
    // Middlewares
    app.use('/', viewsRouter)
    // Server up
    app.listen(port, () => console.log(`Server up on port: ${port}`));
};

dbConnection();

// Hands on Lab: Sistema de paginación de estudiantes

// En esta instancia de la clase crearemos una paginación elemental con los estudiantes del ejercicio pasado, a partir de  un ejercicio práctico

// ¿Cómo lo hacemos? Se creará una vista simple con Handlebars donde se podrán mostrar los estudiantes

// Los estudiantes serán mostrados en la vista “/students”
// Debe existir un enlace “Anterior”” para regresar a los estudiantes anteriores, siempre que haya una página anterior
// Debe existir un enlace “Siguiente” para continuar con la paginación de estudiantes, siempre que haya una página siguiente
// Debe indicarse la página actual.
// En su totalidad debe vivir en un servidor de express escuchando en el puerto 8080.
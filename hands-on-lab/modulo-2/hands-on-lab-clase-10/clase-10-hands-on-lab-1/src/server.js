// Hands On Lab: Primer login por formulario

// ¿Cómo lo hacemos? Se levantará un sistema de login completo utilizando router + motor de plantillas Handlebars + base de datos para usuarios y sesiones + 

// Se deberá contar con una estructura de router para sessions en /api/sessions/ el cual contará con métodos para registrar a un usuario y para su respectivo login

// Se deberá contar además con un router de vistas en la ruta base / para llevar al formulario de login, de registro y de perfil.

// El formulario de registro insertará en la base de datos el usuario. El cual deberá contar con:

// first_name
// last_name
// email
// age
// password

// Se debe contar con el formulario de login el cual corroborará que el usuario exista en la base, y además genere un objeto user en req.session, indicando que puede utilizar la página.

// Agregar validaciones a las rutas de vistas para que, si aún no estoy logueado, no pueda entrar a ver mi perfil, y si ya estoy logueado, no pueda volver a loguearme o registrarme.

// En la vista de perfil, se deben arrojar los datos no sensibles del usuario que se haya logueado.

import express from 'express';
import cookieParser from 'cookie-parser'; 
import session from 'express-session';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars'
import mongoose from 'mongoose';
const app = express();

import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';

app.engine('handlebars', handlebars.engine());
app.set('views',  './src/views');
app.set('view engine', 'handlebars');
app.use(express.static('./src/public'));
app.use(express.json());

app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://sebastianboari:k14t34AswjuUtUso@lsb-db.qyoux2f.mongodb.net/',
        dbName: 'marathon-session',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    }),
    secret: "asdasdasd123asdmvmv",
    resave: false,
    saveUninitialized: false
}));


const enviroment = async () => {
    await mongoose.connect('mongodb+srv://sebastianboari:k14t34AswjuUtUso@lsb-db.qyoux2f.mongodb.net/marathon-session');

    app.use('/api/sessions', sessionsRouter);
    app.use('/', viewsRouter);

    app.listen(8080, () => {
    console.log("Server Up");
    });
};

enviroment();
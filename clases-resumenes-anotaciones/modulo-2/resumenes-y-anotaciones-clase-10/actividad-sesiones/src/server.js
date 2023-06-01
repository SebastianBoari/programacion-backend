// 🟢🧑‍💻 ACTIVIDAD EN CLASE: Sesiones de usuario en el server

// Realizar un programa de backend que establezca sesiones de usuarios en el servidor.

// Cuando un cliente visita el sitio por primera vez en la ruta 'root', se presentará el mensaje de “Te damos la bienvenida”. 

// Con los siguientes request de ese mismo usuario, deberá aparecer el número de visitas efectuadas. El cliente podrá ingresar por query params el nombre, en cuyo caso se añadirá a los mensajes devuelto.

// Por ejemplo: “Bienvenido Juan” o “Juan visitaste la página 3 veces”. Ese nombre, solo se almacenará la primera vez que el cliente visite el sitio.

import express from 'express';
const app = express();
import session from 'express-session';

app.use(session({
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}));

const auth = (req, res, next) => {
    if(req.query){
        const { username, password } = req.query
        req.session.username = username;
      return next();
    } else {
        return next();
    };
};

app.get('/', auth, (req, res) => {

    if(!req.session.username){
        if(!req.session.counter){
            req.session.counter = 1;
            res.send('Te damos la bienvenida');
        } else {
            req.session.counter++;
            res.send(`Se has visitado el sitio ${req.session.counter} veces.`);
        };
    } else {
        if(!req.session.counter){
            req.session.counter = 1;
            res.send(`Bienvenido/a ${req.session.username}`);
        } else {
            req.session.counter++;
            res.send(`${req.session.username} ha visitado el sitio ${req.session.counter} veces.`);
        };
    };

});

app.get('/logout', (req, res) => {
    req.session.destroy( err => {
        if(!err){ 
            res.send ('Logout ok!')
        } else {
            res.send({status: 'Logout ERRIR', body: err});
        };
    });
});

app.listen(8080, () => {
    console.log('Server Up');
});
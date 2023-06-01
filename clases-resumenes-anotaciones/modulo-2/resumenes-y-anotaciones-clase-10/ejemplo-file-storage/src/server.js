import express from 'express';
import cookieParser from 'cookie-parser'; 
import session from 'express-session';
import FileStore from 'session-file-store';

const app = express();
const fileStorage = FileStore(session);

app.use(cookieParser());
app.use(session({
    // ttl = Time To Live (vida de la sesion)
    ttl: 1000,
    // retries = Tiempo de veces que el servidor tratara de leer el arhcivo
    retries: 2,
    // path = ruta donde vivira la carpeta para almacenar las sesiones.
    path: '/',
    store: new fileStorage({path: './sessions', ttl:100, retries:0}),
    secret: "asdasdasd123asdmvmv",
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req, res) => {
    // Si al contextarse la sesion ya existe, entonces aumentar el contador
    if(req.session.counter){
        req.session.counter++;
        res.send(`Se ha visitado el sitio ${req.session.counter} veces.`);
    } else {
    // Si no hay aun una sesion para el usuario, entonces inicializar en 1
        req.session.counter = 1;
        res.send('Bienvenido');
    };
});


app.listen(8080, () => {
    console.log("Server Up");
});
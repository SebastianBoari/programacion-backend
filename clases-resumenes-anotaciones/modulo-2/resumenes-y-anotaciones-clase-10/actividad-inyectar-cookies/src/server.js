import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars'
const app = express();


// 🟢🧑‍💻 ACTIVIDAD EN CLASE: Inyectar cookies en frontend

// Crear una única vista de frontend en nuestro servidro express, la cual contará, con dos campos input y dos botones

// El primer campo input deberá ser el nombre del cliente.

// El segundo campo input deberá contener el correo electrónico

// El botón getCookie debe enviar una petición de tipo GET para recibir la cookie, solo mostrar por consola la cookie.

// El botón submit, deberá enviar una petición POST, la cual deberá crear una cookie con el formato {user:correoDelInput}

// La cookie debe tener un tiempo de vida de 10 segundos. Corroborar que la cookie se borre después del tiempo indicado.


app.engine('handlebars', handlebars.engine());
app.set('views',  './src/views');
app.set('view engine', 'handlebars');
app.use(express.static('./src/public'));
app.use(express.json());
app.use(cookieParser('topsecret'));

app.listen(8080, () => {
    console.log('Server Up');
});

app.get('/', (req, res) => {
    res.render('index', {
        style: 'index',
        script: 'index'
    });
});

app.post('/', (req,res) => {
    const data = req.body
    console.log(data)
    res.cookie(`${data.userName}`, `${data.userEmail}`, {maxAge: 10000, signed: true}).send('Cookie');
});
    
app.get('/getCookie', (req, res) => {
    res.send(req.signedCookies);
});


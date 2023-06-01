import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();

// "cookieSuperSecreta" es la firma que va verificar si las cookies son alteradas o si son las originales. 
app.use(cookieParser('cookieSuperSecreta'));

// Utilizando el objeto res para enviar la cookie al cliente
app.get('/setCookie', (req,res) => {
    // res.cookie(nombreDeLaCookie, valorDelaCookie, {maxAge: tiempoDeVidaEnMilisegundos})

    res.cookie('CoderCookie', 'Esta es una cookie muy poderosa', {maxAge:10000}).send('Cookie');
    // Si no colocamos el parámetro maxAge, la cookie persistirá hasta ser borrada (sin tiempo de vida definido).
});

// Cookie firmada: fijense como agregamos una configuracion más aparte de maxAge el cual es "signed: true". Esta configuracion hará que solo acepte cookies firmadas.
app.get('/setSignedCookie', (req,res) => {
    res.cookie('SignedCookie', 'Esta es una cookie muy poderosa pero porque esta firmada', {maxAge: 1000, signed: true}).send('Cookie');
});

// Utilizando el objeto req para revisar las cookies
app.get('/getCookies', (req, res) => {
    // Obtenemos las req.cookies y las enviamos al cliente para poder verlas en este ejemplo.
    res.send(req.cookies);
    // En este caso enviamos todas las cookies al cliente. Si queremos acceder a una cookie específica, la podemos llamar como req.cookies.nombreDeLaCookie
});

// Utilizando el objeto res para eliminar la cookie que habíamos seteado

app.get('/deleteCookie', (req, res) => {
    // Si la cookie ya fue borrada o caducó por expiración, no hay problema. El clearCookie procede a ignorarlo
    res.clearCookie('CoderCokie').send('Cookie Removed');
});

app.listen(8080, () => {
    console.log('Server Up');
});
import express from 'express';
const app = express();
// Como vemos ya no utilizamos cookie-parser, vamos a utilizar express-session
import session from 'express-session';

// Colocamos session como middleware para nuestro servidor de express
app.use(session({
    secret: 'secretCoder',
    /*
      Resave permite mantener la sesion activa en caso de que la sesion se mantenga inactiva. Si se deja en false, la sesion morira en caso de que exista cierto tiempo de inactividad
    */
    resave: true,
    /*
    saveUnitialized permite guardar cualquier sesion aun cuando el objeto de sesion no tenga nada por contener. Si se deja en false, la sesion no se guardara si el objeto de sesion esta vacio al final de la consulta.  
    */
   saveUninitialized: true
}));

app.get('/session', (req, res) => {
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

// Para eliminar datos de una variable de session, se utiliza el parámetro de request y el método destroy. Como parámetro se pasa un callback.
app.get('/logout', (req, res) => {
    req.session.destroy( err => {
        if(!err){ 
            res.send ('Logout ok!')
        } else {
            res.send({status: 'Logout ERRIR', body: err});
        };
    });
});

// Login con session
// Para iniciar sesión se verifica que los datos ingresados por el usuario sean los correctos. Si lo es, se guarda en session los datos de este usuario. Además, se puede crear la variable admin, también en session, con el valor de true, lo que indica que el usuario logueado es un administrador
app.get('/loginWithSession', (req, res) => {

    const { username, password } = req.query

    if (username !== 'pepe' || password !== 'pepepass'){
      return res.send('login failed');
    };

    req.session.user = username;
    req.session.admin = true;
    res.send('login success!');
});

// Middleware de autenticación

// Si coincide el usuario guardado en session y además es admin, entonces sigue a la ruta, sino devuelve un error.
const auth = (req, res, next) => {
    if(req.session?.user === 'pepe' && req.session?.admin){
      return next();
    };
    return res.status(401).send('error de autorización!');
};

//Al aplicar el auth middleware en la ruta /content, estará accesible únicamente luego de que el usuario haya iniciado sesión.
app.get('/privado', auth, (req, res) => {
    res.send('si estas viendo esto es porque ya te logueaste!');
});


app.listen(8080, () => {
    console.log("Server Up");
});
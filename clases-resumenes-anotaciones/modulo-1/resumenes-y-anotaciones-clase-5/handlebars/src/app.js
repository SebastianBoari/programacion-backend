const express = require('express');
const app = express();
const usersRouter = require('./routes/users.router');
const personalDataRouter = require('./routes/personalData.router');
const viewsRouter = require('./routes/views.router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// CONFIGURACION DE HANDLEBARS
// Importamos handlebars
const handlebars = require('express-handlebars');
// Inicializamos el motor indicando con app.engine("que motor utilizaremos", el motor instanciado)
app.engine('handlebars', handlebars.engine());
// Luego con app.set("views", ruta) Indicamos en que parte del proyecto estaran las vistas.
// Recuerda utilizar rutas absolutas para evitar asuntos de ruteo relativo 
app.set('views', './src/views');
// Finalmente con app.set("view engine", "handlebars") indicamos que, el motor que ya inicializamos arriba es el que queremos utilizar.
// Es importante para saber qu, cuando digamos al servidor que renderice, sepa que tiene que hacerlo con el motor de handlebars.
app.set('view engine', 'handlebars');

// Seteamos de manera estática nuestra carpeta public
app.use(express.static('./src/public'));

app.use('/users', usersRouter);

// Actividad en clase
app.use('/personalData', personalDataRouter);

// Apartir de esta clase las ruta raiz esta reservada para vistas y solo quedaran en el dicho router (creo)
app.use('/', viewsRouter);
// Nota que el router se encuentra en la ruta raíz, de manera que, cuando queramos hacer un llamado de un servicio más “lógico” que no requiera una vista, iniciaremos el router siempre con “/api/” Ya que las rutas sin api, corresponden a vistas a partir de ahora.


app.listen(8080, () => console.log('Server handlebars Up'));
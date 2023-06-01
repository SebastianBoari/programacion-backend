import express from 'express';
import cookieParser from 'cookie-parser'; 
import session from 'express-session';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars'
const app = express();

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
        },
        ttl: 15
    }),
    secret: "asdasdasd123asdmvmv",
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req, res) => {
    if(req.session.counter){
        req.session.counter++;
        res.send(`Se ha visitado el sitio ${req.session.counter} veces.`);
    } else {
        req.session.counter = 1;
        res.send('Bienvenido');
    };
});

app.get('/view', (req, res) => {
    res.render('index', {
        style: 'index',
        script: 'index'
    });
});

app.listen(8080, () => {
    console.log("Server Up");
});
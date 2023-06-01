import express from 'express';
import cookieParser from 'cookie-parser'; 
import session from 'express-session';
// Nuestra configuración de session requerirá un nuevo módulo:  
// npm install connect-mongo
import MongoStore from 'connect-mongo';
const app = express();

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

app.listen(8080, () => {
    console.log("Server Up");
});
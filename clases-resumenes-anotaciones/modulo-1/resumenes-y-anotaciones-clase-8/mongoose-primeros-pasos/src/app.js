// Instalación y configuración de Mongoose

// 1️⃣ Tener listo nuestro proyecto con ExpressJS
// Para aprender la configuracion de Mongoose vamos a hcer un CRUD de usuarios sencillo.

// En la carpeta "models" guardaremos cada modelo (esquema) que queramos modelar de la base de datos.


// |---------------------------------------------------------|


// ⚠️user.model.js y user.router.js como nombres de archivos son a elección personal o seguimos la convencion que se haya utilizado en el proyecto que estamos trabajando. 

// Esto en ExpressJS o cuando desrrollamos desde 0 nuestro backend la convención la podemos elegir nosotros porque tenemos la libertad de elección.

// En futuras clases veremos que existen Frameworks de desarrollo que ya vienen con sus convenciones y es necesario seguir esas reglas pero en este caso tenemos libertad de elección.


// |---------------------------------------------------------|


// 2️⃣ Instalamos Mongoose en el proyecto
// npm install mongoose

// 3️⃣ Archivo user.model.js
// En nuestra carpeta "models" utilizaremos mongoose para definir el esquema de nuestra dbase de datos
// Un esquema debe contener las propiedades y tipos de datos que aparecerán en la base de datos.

// 4️⃣ Ahora podemos importar nuestro “userModel” y utilizarlo en el router de usuarios

// Una vez hecho los 4 pasos anteriores lo único que nos hace falta es conectar Mongoose a nuestra base de Atlas.
// Nos dirigimos a Mongo Atlas y buscamos nuestro connection string
// mongodb+srv://sebastianboari:<password>@lsb-db.qyoux2f.mongodb.net/
// Reemplazar por la constraseña del cluster en donde dice <password>

import express from 'express';
import usersRouter from './routes/users.router.js';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 8080;


// Esto esta deprecado en las ultimas versiones de MongoDB, ya no recibe callback el metodo 'connect'
/*
mongoose.connect('mongodb+srv://sebastianboari:k14t34AswjuUtUso@lsb-db.qyoux2f.mongodb.net/', (error) => {
    if(error){
        console.log(`Cannot connect to database: ${error}`)
        process.exit();
    };
});
*/

app.listen(port, () => console.log(`Server Up on port: ${port}`));


// Se debe hacer asi:
mongoose.set('strictQuery', false)
try {
    await mongoose.connect('mongodb+srv://sebastianboari:k14t34AswjuUtUso@lsb-db.qyoux2f.mongodb.net/');
  } catch (error) {
    console.log(`${error}`);
  };

app.use('/api/users', usersRouter);
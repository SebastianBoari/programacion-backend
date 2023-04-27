const express = require('express');
const app = express();

const usersRouter = require('./routes/users.router');
const petsRouter = require('./routes/pets.router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/contenido',express.static('public'));

app.use('/users', usersRouter);

app.use('/pets', petsRouter);

app.listen(8080, () => console.log('Server Up'));

// 🟢🧑‍💻 ACTIVIDAD EN CLASE: Utilizando argumentos con dotenv

// Realizar un servidor basado en node js con express, El cual reciba por flag de cli el comando --mode <modo> y sea procesado por commander.

// Acorde con este argumento, hacer una lectura a los diferentes entornos, y ejecutar dotenv en el path correspondiente a cada modo (--mode development debería conectar con .env.development).

// Para el entorno development, el servidor debe escuchar en el puerto 8080, para el entorno productivo, el servidor debe escuchar en el puerto 3000. 


import express from "express";
import config from "./config.js";
import mongoose from "mongoose";

const { port, mongoUri, adminName, adminPassword } = config;

const app = express();

app.get('/', (req, res) => res.send('Ok!!'));

const run = async () => {
    try {
        await mongoose.connect(config.mongoUri, {
            dbName: 'process'
        });

        console.log("DB Connected...");
        
        app.listen(config.port, () => console.log(`Server up on port ${config.port}`));
    } catch (error) {
        console.log("DB Not connected...");
    }
};

run();

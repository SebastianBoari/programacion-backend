// Múltiples entornos

// En el mundo laboral como dijimos tenemos distintas etapas por las que pasan las aplicaciones y para cada etapa necesitamos unas variables de entornos u otras.

// Trabajar con multiples entornos solo significa una cosa: Multiples archivos .env

// Ya la ejecucion de dotenv.config() no basta. Esta vez tenemos que identificar a cual archivo queremos apuntar.

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

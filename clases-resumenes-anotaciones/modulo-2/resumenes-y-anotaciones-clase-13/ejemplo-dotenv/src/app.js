
// Utilizando dotenv

// Existe una libreria muy utilizada en nodejs llamada dotenv

// En C# con .NET o en Java con SpringBoot ya vienen soluciones propuestas por el framework pero en nodejs no hay una propuesta por defecto pero dotenv es la libreria mas popular para realizar esto mismo.

// El archivo es un .env en donde la sintaxis es muy simple

// NOMBRE=VALOR

// Sin commillas ni nada mas que tener en cuenta

// Se instala con el comando:

// npm i dotenv

// Una vez instalado dotenv, bastará contar con un archivo de configuración llamado config.js. En éste, colocaremos un objeto, donde cada key : value corresponderá a la variable de dotenv.

// Todo se basará en utilizar el objeto process nuevamente, esta vez usando 

// process.env.VARIABLE

// Usando dotenv.config(), indicamos a la computadora que cargue las variables del archivo .env, el cual estará seteado dentro del proyecto.

// Una vez finalizada la configuración, podemos importarla y visualizar los resultados:

// Al final lo que ocurre es lo siguiente: al ejecutar el comando dotenv.config(), éste busca las variables localizadas en .env y procede a colocarlas en el objeto process.env.

// ¡Entonces conseguimos tener un objeto de configuración listo para este entorno!

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
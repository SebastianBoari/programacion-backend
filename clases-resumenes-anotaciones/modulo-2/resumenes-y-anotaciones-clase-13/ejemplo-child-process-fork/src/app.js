// Primero importamos fork desde child_process sin instalar nada ya que es un modulo nativo
import { fork } from "child_process";
import express from "express";
import sumaBloqueante from "./sumaBloaquente.js";

const app = express();

// Respuesta rapida sin demora
app.get('/', (req, res) => res.send('Everything is OK'));

// Repuesta lenta, proceso muy cargado
app.get("/suma", (req, res) => {
    // Crear un proceso secundario usando fork() en la ruta './src/suma.js'
    const child = fork('./src/suma.js'); 

    // Escuchar el evento 'message' del proceso secundario
    child.on('message', result => {
        // Enviar la respuesta al cliente con el mensaje y el resultado recibido del proceso secundario
        res.send('El resultado es ' + result);
    });
});

// Proceso bloqueante:
app.get("/sumaBloqueante", (req,res) => {
    // Como este proceso muy cargado sera ejecutado por el proceso principal bloqueara todos los otros endpoints
    const result = sumaBloqueante();

    res.send(`El resultado del a funcion bloqueante es ${result}`);
});

app.listen(8080, () => console.log("Server Up"));

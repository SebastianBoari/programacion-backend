import dotenv from "dotenv";

// Aqui podemos hardcodear el entorno:
const enviroment = "PRODUCTION";

// Para indicarle a que archivo queremos apuntar utilizaremos el path y con un operador ternario decidiremos a que ruta apuntaremos dependiendo de lo que sea la variables "enviroment"
dotenv.config({
    path: enviroment === "DEVELOPMENT" ? "./.env.development" : "./.env.production"
});

// Como vimos antes commander podriamos hacer que la vairable enviroment podria tomar su valor de un parametro que nosotros agregemos al npm run dev o al script que inicializa nuestra aplicacion para indicarle en que entorno queremos ejecutar la aplicacion.


export default {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD
};
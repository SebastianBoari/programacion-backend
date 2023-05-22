import mongoose from 'mongoose';

// Asi es como se llamará la colección en nuestra base de datos.
const userCollection = 'usuarios';

const userSchema = new mongoose.Schema({
    // Aqui armamos la plantilla o esquema para agregar datos nuevos a la base de datos.
    first_name: String, // Para definir el tipo de dato solo basta con poner dos puntos y el tipo de dato.
    last_name: String,
    email:{ // Si necesitas especificar por ejemplo si un dato es obligatorio o si debe ser unico en la base de datos se hace dentro de un objeto
        type: String,
        unique: true,
    }
});

export const userModel = mongoose.model(userCollection, userSchema);

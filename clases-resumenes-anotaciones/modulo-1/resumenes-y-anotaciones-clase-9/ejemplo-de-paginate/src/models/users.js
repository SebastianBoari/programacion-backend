import mongoose from 'mongoose';

// Para poder utilizarlo, basta con importar el módulo de paginate en el Schema donde lo utilizaremos.
import mongoosePaginate from 'mongoose-paginate-v2';

const userCollection = 'users';

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        index: true
    },
    last_name: String,
    email: String,
    gender: String
});

// Entonces, antes de instanciar el modelo, colocamos un “plugin” de paginación a nuestro Schema
userSchema.plugin(mongoosePaginate);

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
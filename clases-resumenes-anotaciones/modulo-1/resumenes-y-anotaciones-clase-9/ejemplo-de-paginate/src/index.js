import userModel from "./models/users.js";
import mongoose from 'mongoose';

const enviroment = async () => {
    await mongoose.connect('mongodb+srv://sebastianboari:k14t34AswjuUtUso@lsb-db.qyoux2f.mongodb.net/users');

    // El modelo ahora puede usar el método “paginate”. El primer argumento es el filtro, y el segundo son las opciones.
    let users = await userModel.paginate( 
        { gender:"Female" },
        { limit: 2, page: 1 }
    );
    
    // No solo obtenemos resultados, sino que tenemos toda la información sobre la paginación realizada, y cómo podemos continuarla. 
    console.log(users);
};

enviroment();



import mongoose from 'mongoose';

const studentsCollection = 'students';

// 2️⃣ Definiremos un modelo como los vistos anteriormente, sin embargo, notamos una estructura más compleja en el campo courses.

// La estructura del campo courses indica que cada elemento que se ingrese al arreglo debe tener un campo “course”, el cual será un id que hará referencia a la colección courses. 

const studentsSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    courses:{
        type: [
            {
                course:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "courses"
                }
            }
        ],
        default: []
    }
});


// ⬇️Middlewares en moongose PRE

// En esta ocasion le estamos dando un primer argumento al middleware el cual es en que operacion queremos que se aplique el middleware para evitar que se ejecute en otros metodos que no lo requiera

// Luego le damos una callback la misma no puede ser arrow function
studentsSchema.pre('findOnde', function(){
    // La palabra "this" hace referencia al documento
    this.populate("courses.course")
});

const studentsModel = mongoose.model(studentsCollection, studentsSchema);

export default studentsModel;
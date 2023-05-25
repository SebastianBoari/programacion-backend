import mongoose from 'mongoose';

const coursesCollection = 'courses';

// course hará referencia a los diferentes cursos a los que puede pertenecer un estudiante. 

// Su uso para este ejemplo se reducirá a ser un elemento que pueda agregarse al arreglo “courses” de los documentos de tipo estudiante.

const coursesSchema = mongoose.Schema({
    title: String,
    description: String,
    difficulty: Number,
    topics: {
        type: Array,
        default:[]
    },
    professor: String,
    students:{
        type: Array,
        default: []
    }
});

const coursesModel = mongoose.model(coursesCollection, coursesSchema);

export default coursesModel;
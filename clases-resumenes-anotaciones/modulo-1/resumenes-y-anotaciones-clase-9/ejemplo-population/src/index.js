import studentsModel from "./models/students.js";
import coursesModel from "./models/courses.js";
import mongoose from 'mongoose';

// 1️⃣ Tener un entorno asíncrono
// Por cuestiones de tiempo y complejidad, no levantaremos un servidor esta vez, sino que definiremos un entorno asíncrono, para poder ejecutar las operaciones de Mongoose, sin tener que llamar a un endpoint.

// Paso 2 en models/students.js

const enviroment = async () => {
    await mongoose.connect('mongodb+srv://sebastianboari:k14t34AswjuUtUso@lsb-db.qyoux2f.mongodb.net/population');

    // Creamos un estudiante para el ejemplo

    /*
    await studentsModel.create({
        first_name: "Hilda",
        last_name: "Coruño",
        email: "hcoruño@correo.com",
        gender: "Female"
    });
    */

    // Creamos un cruso para el ejemplo:
     
    /*
    await coursesModel.create({
        title: "Curso de Backend",
        description: "Es un curso que permite desarrollar servidores bien bonitos",
        difficulty: 5,
        topics: ["Javascript", "Servidores", "Motores de Plantillas", "Middlewares", "Bases de datos"],
        professor: "Alex Marin"
    });
    */
    
    // Bueno, ya tenemos ambas entidades ahora vamos a hacer el population.


    // Ahora agregamos el id del curso al arreglo de cursos del estudiante:
    /* 
    let student = await studentsModel.findOne({ _id: "646d7444c4db918d1206d58f" });

    student.courses.push({ course: "646d7445c4db918d1206d591" });

    let result = await studentsModel.updateOne({_id:"646d7444c4db918d1206d58f"},student);
    */

    // Ahora volvemos a pedir al estudiante en la base de datos:
    /* 
    const student = await studentsModel.findOne({ _id: "646d7444c4db918d1206d58f" });

    console.log(JSON.stringify(student,null,'\t'));
    */

    // courses.course es debido a que los elementos que queremos poblar estan dentro de un array: "courses" es el arreglo y "course" es el curso en cuestion:
    /* 
    const student = await studentsModel.findOne({ _id: "646d7444c4db918d1206d58f" }).populate('courses.course');

    console.log(JSON.stringify(student,null,'\t'));
    */
};

enviroment();
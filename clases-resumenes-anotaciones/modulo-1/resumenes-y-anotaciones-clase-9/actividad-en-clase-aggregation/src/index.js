import studentsModel from "./models/students.js";
import mongoose from 'mongoose';

// 🧑‍💻🟢ACTIVIDAD EN CLASE: Agrupación de estudiantes

// Realizar las siguientes consultas en una colección de estudiantes.

// Los estudiantes deben contar con los datos:
// first_name : Nombre
// last_name : Apellido
// email: correo electrónico
// gender: género
// grade: calificación
// group : grupo

// Una vez generados tus datos de prueba:

// Obtener a los estudiantes agrupados por calificación del mejor al peor
// Obtener a los estudiantes agrupados por grupo.
// Obtener el promedio de los estudiantes del grupo 1B
// Obtener el promedio de los estudiantes del grupo 1A
// Obtener el promedio general de los estudiantes.
// Obtener el promedio de calificación de los hombres
// Obtener el promedio de calificación de las mujeres.

const enviroment = async () => {
    await mongoose.connect('mongodb+srv://sebastianboari:k14t34AswjuUtUso@lsb-db.qyoux2f.mongodb.net/actividad-aggregation');

        // Agregamos los ejemplos:
    /* 
    let result = await studentsModel.insertMany([
        {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            gender: 'Male',
            grade: 10,
            group: '1A'
        },
        {
            first_name: 'Jane',
            last_name: 'Smith',
            email: 'jane.smith@example.com',
            gender: 'Female',
            grade: 5,
            group: '1B'
        },
        {
            first_name: 'Sara',
            last_name: 'Connor',
            email: 'sconnor@example.com',
            gender: 'Female',
            grade: 8,
            group: '1B'
        },
        {
            first_name: 'Rocky',
            last_name: 'Balboa',
            email: 'rockybalboa@example.com',
            gender: 'Male',
            grade: 10,
            group: '1A'
        },
        {
            first_name: 'Segundo',
            last_name: 'Molina',
            email: 'segundomolina@example.com',
            gender: 'Male',
            grade: 5,
            group: '1A'
        },
        {
            first_name: 'Augusto',
            last_name: 'Romero',
            email: 'aromero@example.com',
            gender: 'Male',
            grade: 10,
            group: '1A'
        },
        {
            first_name: 'Jose',
            last_name: 'Larralde',
            email: 'jlarralde@example.com',
            gender: 'Male',
            grade: 4,
            group: '1B'
        },
        {
            first_name: 'Marie',
            last_name: 'Curie',
            email: 'mcurie@example.com',
            gender: 'Female',
            grade: 10,
            group: '1B'
        },
        {
            first_name: 'Amancio',
            last_name: 'Lopez',
            email: 'alopez@example.com',
            gender: 'Male',
            grade: 6,
            group: '1B'
        },
        {
            first_name: 'Belinda',
            last_name: 'Jordan',
            email: 'belinda@example.com',
            gender: 'Female',
            grade: 5,
            group: '1A'
        },
    ]);
    */
   
    // Obtener a los estudiantes agrupados por calificación del mejor al peor
    let bestStudents = await studentsModel.aggregate([
        // Stage 1: Ordenar por mejor calificacion a peor
        {
          $sort: { grade: -1 }
        },
      ]);
    //console.log(JSON.stringify(bestStudents, null, '\t'));

    // Obtener a los estudiantes agrupados por grupo.
    let studentsPerGroup = await studentsModel.aggregate([
        {
            $group: { _id: "$group", students: { $push: "$$ROOT" } }
        },
    ]);
    //console.log(JSON.stringify(studentsPerGroup, null, '\t'));
    
    // Obtener el promedio de los estudiantes del grupo 1B
    let avgGrade1B = await studentsModel.aggregate([
        {
            $match: { group: "1B"}
        },
        {
            $group: { _id: "$group", avgGrade: { $avg: "$grade" } }
        },
    ]);
    //console.log(JSON.stringify(avgGrade1B, null, '\t'));

    // Obtener el promedio de los estudiantes del grupo 1A
    let avgGrade1A = await studentsModel.aggregate([
        {
            $match: { group: "1A"}
        },
        {
            $group: { _id: "$group", avgGrade: { $avg: "$grade" } }
        },
    ]);
    //console.log(JSON.stringify(avgGrade1A, null, '\t'));

    // Obtener el promedio general de los estudiantes.
    let avgGradeAll = await studentsModel.aggregate([
        {
            $group: { _id: "AverageGradeOfAllStudents", grade: { $avg: "$grade" }  }
        }
    ]);
    //console.log(JSON.stringify(avgGradeAll, null, '\t'));

    // Obtener el promedio de calificación de los hombres
    let avgGradeMale = await studentsModel.aggregate([
        {
            $match: { gender: "Male" }
        },
        {
            $group: { _id: "AverageGradeOfAllMaleStudents", grade: { $avg: "$grade" }  }
        }
    ]);
    console.log(JSON.stringify(avgGradeMale, null, '\t'));

        // Obtener el promedio de calificación de las mujeres.
        let avgGradeFemale = await studentsModel.aggregate([
            {
                $match: { gender: "Female" }
            },
            {
                $group: { _id: "AverageGradeOfAllFemaleStudents", grade: { $avg: "$grade" }  }
            }
        ]);
        console.log(JSON.stringify(avgGradeFemale, null, '\t'));
};

enviroment();
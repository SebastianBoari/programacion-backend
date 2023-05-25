import userModel from "./models/users.js";
import mongoose from 'mongoose';

const enviroment = async () => {
    await mongoose.connect('mongodb+srv://sebastianboari:k14t34AswjuUtUso@lsb-db.qyoux2f.mongodb.net/users');

    let response = await userModel.find({first_name: "Celia"}).explain('executionStats');

    console.log(response);
};

enviroment();

// Sin indexación y sin filtro:
/*
    * La consola nos arroja la siguiente info:
 
    executionStats: {
        executionSuccess: true,
        nReturned: 5000,
        * executionTimeMillis: 3,
        totalKeysExamined: 0,
        totalDocsExamined: 5000,
        executionStages: {
        stage: 'COLLSCAN',
        nReturned: 5000,
        executionTimeMillisEstimate: 0, 
        works: 5002,
        advanced: 5000,
        needTime: 1,
        needYield: 0,
        saveState: 5,
        restoreState: 5,
        isEOF: 1,
        direction: 'forward',
        docsExamined: 5000
    },
*/

// Sin indexación y con filtro:
/*
    * La consola nos arroja la siguiente info:
 
    executionStats: {
        executionSuccess: true,
        nReturned: 2,
        *executionTimeMillis: 4, 
        totalKeysExamined: 0,
        totalDocsExamined: 5000,
        executionStages: {
        stage: 'COLLSCAN',
        filter: [Object],
        nReturned: 2,
        executionTimeMillisEstimate: 0,
        works: 5002,
        advanced: 2,
        needTime: 4999,
        needYield: 0,
        saveState: 5,
        restoreState: 5,
        isEOF: 1,
        direction: 'forward',
        docsExamined: 5000
    },
*/

// El indice se agrega en el modelo como "index: true"

// Con indexación:
/*
    * La consola nos arroja la siguiente info:
 
    executionStats: {
        executionSuccess: true,
        nReturned: 2,
        *executionTimeMillis: 1,
        totalKeysExamined: 2,
        totalDocsExamined: 2,
        executionStages: {
        stage: 'FETCH',
        nReturned: 2,
        executionTimeMillisEstimate: 0,
        works: 3,
        advanced: 2,
        needTime: 0,
        needYield: 0,
        saveState: 0,
        restoreState: 0,
        isEOF: 1,
        docsExamined: 2,
        alreadyHasObj: 0,
        inputStage: [Object]
    },
*/

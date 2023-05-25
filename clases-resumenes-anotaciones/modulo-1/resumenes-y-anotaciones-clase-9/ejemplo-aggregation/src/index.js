import ordersModel from "./models/orders.js";
import mongoose from 'mongoose';

// 🧑‍💻🟢Ejemplo de Aggregation 

// Ejercicios de ejemplo: Definir las ventas de los diferentes sabores de las pizzas medianas.

// Una stage para filtrar las pizzas por su tamaño, ya que sólo nos interesa la campaña de pizzas medianas.

// Agrupar las pizzas por sabor para corroborar cuántos ejemplares se vendieron de dichos sabores.

// Los resultados se deben entregar de mayor a menor por cantidad de ventas.

// Los resultados se deberan almacenar en una nueva colección “reports” con el fin de poder consultar el reporte para análisis futuros.


const enviroment = async () => {
    await mongoose.connect('mongodb+srv://sebastianboari:k14t34AswjuUtUso@lsb-db.qyoux2f.mongodb.net/aggregation');

    // Cargamos datos para el ejemplo:
    /* 
    let result = await ordersModel.insertMany([
        { name: "Pepperoni", size: "small", price: 19, quantity: 10 },
        { name: "Pepperoni", size: "medium", price: 20, quantity: 20 },
        { name: "Pepperoni", size: "large", price: 21, quantity: 30 },
        { name: "Cheese", size: "small", price: 12, quantity: 15 },
        { name: "Cheese", size: "medium", price: 13, quantity: 50 },
        { name: "Cheese", size: "large", price: 14, quantity: 10 },
        { name: "Vegan", size: "small", price: 17, quantity: 10 },
        { name: "Vegan", size: "medium", price: 18, quantity: 10 }
    ]);
    */
   
    // Corroboramos que los datos se hayan cargado:
    /*
    let orders = await ordersModel.find().lean().exec();

    console.log(orders);
    */

    // Aplicando nuestra primera aggregation
    // La operacion aggregate recibe un array, dentro de este debemos agregar los stages.
    let orders = await ordersModel.aggregate([
        // Stage 1: Filtrar ordenes que solo sean de pizza de tamaño medio
        {
            $match: { size: "medium" }
        },
       
        // Stage 2: Agrupamos por sabores y acumulamos el numero de pizzas por sabor
        {
            $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } }
        },
        // Utilizamos "$name", esta sintaxis nos permite acceder a las propiedades el documento. Significa que _id va a tomar el valor de la propiedad "$name" del documento
        
        // Stage 3: Ordenar los documentos de mayor a menor
        {
            $sort: { totalQuantity: -1 }
        },

        // Stage 4: Guardamos los documentos de la agregacion en uno nuevo dentro de un array llamado "orders". Con $push indicamos que se guardaran en un array. Con $$ROOT indicamos que agrege todo el documento porque si no tendriamos que especificar propiedad a propiedad
        {
            $group: { _id: 1, orders: { $push: "$$ROOT" } }
        },

        // Stage 5: Utilizamos $project para generar un nuevo ObjectId asi podremos guardalo sin haber coincidencias.
        // Al utilizar un $project podemos indicar _id:o y esto hara que se genere un ObjectId propio
        {
            $project:{
                "_id": 0,
                orders: "$orders"
            }
        },

        // Stage 6: Agregar los elementos a la coleccion "reports".
        {
            $merge: {
                into: 'reports'
            }
        } 
    ])

    console.log(orders);
};

enviroment();


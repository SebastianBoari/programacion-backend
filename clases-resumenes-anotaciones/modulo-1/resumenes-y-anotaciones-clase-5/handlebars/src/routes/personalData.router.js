// 🧑‍💻🟢 ACTIVIDAD EN CLASE: Datos personales 

// Basándonos en el ejemplo anterior, desarrollar una vista web que permita mostrar los datos personales de múltiples usuarios. 

// Utilizar la misma estructura mostrada por el profesor, para poder levantar un servidor que utilice handlebars como motor de plantillas. 

// Configurar la plantilla para que muestre los siguientes datos: nombre, apellido, edad, correo, teléfono.

// Crear un array “users” que cuente con 5 usuarios de tipo objeto, cada uno con los datos mencionados arriba.

// Al llamar al método get ‘/’, generar un número random para elegir a alguno de los usuarios y mostrar el usuario seleccionado al azar en la plantilla.

// Observar los diferentes resultados en el navegador. 

const { Router } = require('express');
const router = Router();

const users = [
    {   
        id: 1,
        name: "Julio",
        surname: "Lopez",
        age: 56,
        mail: "jlopez@gmail.com",
        tel: "011-1212-1212"
    },
    {   
        id: 2,
        name: "Martina",
        surname: "Roldan",
        age: 21,
        mail: "mroldan@gmail.com",
        tel: "011-1212-1212"
    },
    {   
        id: 3,
        name: "Tobias",
        surname: "Lock",
        age: 18,
        mail: "tlock@gmail.com",
        tel: "011-1212-1212"
    },
    {   
        id: 4,
        name: "Maximiliano",
        surname: "Kramer",
        age: 36,
        mail: "mkramer@gmail.com",
        tel: "011-1212-1212"
    },
    {   
        id: 5,
        name: "Americo",
        surname: "Fuentes",
        age: 67,
        mail: "afuentes@gmail.com",
        tel: "011-1212-1212"
    }
];

// Creamos una funcion que obtenga un numero random ingresandole un minimo y un maximo
const randomValue = (min, max) =>{
    return Math.floor(Math.random() * (max - min + 1) + min)
};

// Creamos una funcion que filtre el array users tomando un id.
const getUserById = (userId) => {
    return users.filter((user)=> userId === user.id);
};


router.get('/', (req, res) => {
    // Es importante guardar esta variable dentro del router.get para que se actualice cada vez que actualizamos el navegador y asi se vayan mostrando distintos usuarios.
    const userChoosed = getUserById(randomValue(1, users.length));
    const user = userChoosed[0]; // solo por comodidad

    // Pasamos la informacion a la plantilla del usuario:
    res.render('personalData', { style: "personalData", title: "Datos Personales", name: user.name, surname: user.surname, age: user.age, mail: user.mail, tel: user.tel});
});



module.exports = router;
// Clase 8: Mongoose, clientes de bases de datos, DBaaS, Mongoose en NodeJS y primer práctica integradora.


// |-------------------------------------------------------------|


// Clientes de BD
// Cada vez que accedemos a una base de datos para realizar cualquier operación CRUD, nosotros nos convertimos en clientes para acceder a la misma.

// Cliente CLI
// Cliente GUI
// Cliente Web
// CLiente app

// Ya fungimos como clientes CLI con Mongo shell, ahora vamos a ver brevemente los otros tipos de clientes.

// Cliente GUI
// Cliente Grafico, el cliente GUI mas utilizado para MongoDB es MongoDB Compass

// Cliente App
// Este será nuestro fuerte: Poder acceder a la base de datos desde nuestra aplicación, permite utilizarla a partir de código, a partir de un contexto.

// Cliente Web
// Podemos conectarnos a un servidor en la web para poder analizar los datos y realizar las operaciones desde cualquier computadora. El mas utilizado para MongoDB es MongoDB Altas


// |-------------------------------------------------------------|


// DBaaS: Database as a Service (Bases de datos como servicio)

// DBaaS, es una solución para el problema de escalabilidad y costos en el almacenamiento de grandes cantidades de información empresarial.

// En lugar de dedicar recursos y espacio físico a la gestión de bases de datos, se puede alquilar espacio a proveedores de servicios como Amazon, Google, Microsoft o Mongo Atlas. 

// Estos proveedores se encargan de todos los aspectos físicos, de mantenimiento y seguridad de las bases de datos, mientras que los usuarios son responsables de sus propios datos.

// Las ventajas del modelo DBaaS incluyen el ahorro en costos al eliminar la infraestructura física y la necesidad de personal especializado, la escalabilidad mediante diferentes tarifas según las necesidades y el acceso a expertos en bases de datos para tareas de mantenimiento, actualización y seguridad.


// |-------------------------------------------------------------|


// Configuracion:

// Primero debemos registrarnos y crear una organizacion, un proyecto y un cluster en Mongo Atlas. Se hace desde la página de MongoDB

// Asignamos usuario, contraseña y la IP desde donde queramos conectarnos a la base de datos.


// |-------------------------------------------------------------|


// MONGOOSE

// Luego de hacer nuestra cuenta y crear nuestro cluster en Mongo Atlas continuamos con la teoria

// Mongoose es un ODM (Object Document Mapping) utilizado para la gestión de bases de datos MongoDB en aplicaciones de Node.js.

// A diferencia de los ORM (Object-Relational Mapping), que se utilizan para bases de datos relacionales, Mongoose se adapta a las características de MongoDB, que es una base de datos no relacional.

// Con Mongoose, podemos definir esquemas para mapear objetos a documentos en MongoDB, lo que nos permite trabajar con la base de datos de manera más intuitiva y orientada a objetos.

// Además, Mongoose ofrece la posibilidad de conectar con bases de datos gestionadas en Mongo Atlas, lo que facilita la administración de la base de datos en la nube. 


// |---------------------------------------------------------|


// 🔎Para ver la instalacion de Mongoose en nuestro proyecto visitar la carpeta: "mongoose-primeros-pasos"

// ⚠️ Empezamos a usar JS


// |-------------------------------------------------------------|


// 🟢🧑‍💻ACTIVIDAD EN CLASE: CRUD con Mongoose

// Realizar un proyecto en Node.js que se conecte a una base de datos MongoDB Atlas llamada colegio. Utilizar mongoose importándolo en Módulo (import) y gestionar sus acciones a través de promesas.

//  Crear una colección llamada ‘estudiantes’ que incorporará 10 documentos con la siguiente estructura y datos que se detallan a continuación:
// nombre: tipo string
// apellido: tipo string
// edad: tipo number
// dni: tipo string (campo único)
// curso: tipo string
// nota: tipo number
//Los campos deben ser requeridos obligatoriamente ({ required: true })

// Insertar un arreglo de estudiantes a dicha colección
// Desarrollar los endpoints correspondientes al CRUD pensado para trabajar con esta colección
// Corroborar los resultados con Postman.


// |-------------------------------------------------------------|


// Primera Practica Integradora

// La mejor forma de repasar los temas vistos hasta el momento, es hacer un repaso integrado de todos los elementos.

// Si bien es correcto repasar el código parte por parte, es importante que como desarrolladores comencemos a trabajar en nuestra lógica de integración, es decir, tenemos que tener siempre contemplado el cómo vamos a juntar todo lo aprendido, para tener un proyecto sólido

// Elementos a integrar

// Clases
// ExpressJS y modelo request/response
// Router y Multer
// Handlebars
// Mongo DB y Mongoose


// |-------------------------------------------------------------|

// Fin
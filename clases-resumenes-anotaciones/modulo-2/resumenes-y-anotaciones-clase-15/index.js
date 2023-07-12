// Clase 15: Patron DAO, patron de diseño factory, practica de desarrollo backend completa, conexion front-back


// |----------------------------------------------|


// Patrón DAO: Data Access Object

// En cualquier aplicación, es necesario contar con una fuente de datos que permita el acceso y manipulación de la información. Esto puede ser una memoria temporal, archivos o una base de datos.

// El problema surge cuando se necesita cambiar la fuente de datos sin afectar la lógica de negocio. Para resolver esto, se utiliza el patrón DAO, que consiste en separar la lógica de acceso a los datos en un archivo independiente. De esta manera, si se cambia la fuente de datos, solo se requiere crear un nuevo DAO con los mismos métodos, evitando conflictos de acceso a la información.

// El DAO se encarga de conectar con la fuente de datos programada, ya sea en memoria, archivos, etc. Esto permite que en la lógica de negocio solo sea necesario importar y utilizar el DAO correspondiente. Si se necesita cambiar la persistencia, solo se necesita cambiar el DAO utilizado.


// |----------------------------------------------|


// 🟢🧑‍💻 ACTIVIDAD EN CLASE: Completitud del DAO


// Con base en el DAO presentado en el ejemplo

// Realizar un servidor de express que cuente con el resto del CRUD para el dao de memoria y de MongoDB

// Insertar dos usuarios en el DAO de memoria.

// Cambiar persistencia al DAO de MongoDB, realizar un método get() y corroborar que el resultado esté vacío (esto confirmará la separación de las dos persistencias). 


// |----------------------------------------------|


// Dinamizando la persistencia: Patrón Factory

// En ocasiones, es necesario cambiar la persistencia de una aplicación sin tener que modificar los imports manualmente. Para resolver esto, podemos utilizar el patrón Factory.

// El patrón Factory se basa en una variable de entorno o configuración para decidir qué tipo de persistencia utilizar. Esta "fábrica" devuelve el DAO adecuado según la configuración.

// Para utilizar el Factory, se debe importar solo las clases necesarias desde un archivo "index.js" o "factory.js". A partir de este punto, se puede controlar la persistencia inicializando con MONGO, MEMORY, FILE, etc., según sea necesario.

// ⚠️ Es importante tener en cuenta que el patrón Factory es una solución para casos específicos donde se requiere utilizar múltiples persistencias variables. No se recomienda aplicarlo sin justificación.


// |----------------------------------------------|


// DTO: Data Transfer Object

// Al trabajar con datos en nuestro servidor, nos enfrentamos a dos desafíos: manejar los datos provenientes del cliente y los datos devueltos por la base de datos. Para abordar estos desafíos, es importante considerar escenarios en los que se requiere mantener una estructura consistente de los datos.

// El patrón de diseño DTO resuelve estos casos de incertidumbre y nos permite transformar y preparar los datos antes de transferirlos. Un DTO es una clase que se crea a partir de un objeto y devuelve un objeto equivalente con las modificaciones necesarias para la transferencia.

// En el frontend, se utiliza principalmente a través de funciones en lugar de clases. Un DTO se puede utilizar para dar forma a un objeto antes de enviarlo al DAO o, inversamente, para dar forma a un objeto antes de enviarlo al cliente.

// No es necesario implementarlo en ambos lados, a menos que sea absolutamente necesario.


// |----------------------------------------------|


// Patrón de diseño: Repository

// El patrón repository es sumamente útil para poder desacoplar aún más la lógica del DAO y del negocio, contando con una capa de “servicios” el cual se encargará de ejecutar la instrucción para obtener la información del DAO.

// La idea de la capa de servicios es añadir un nivel extra de abstracción para dejar cada vez más limpio y entendible el negocio. 

// Podemos colocar los DTOs en un servicio, para que el DAO y el negocio nunca sepan del parseo que se está realizando


// |----------------------------------------------|


// 🟢🧑‍💻 ACTIVIDAD EN CLASE: Implementación de Repository


// Basado en la implementación del repository de Contactos

// Crear un DAO para productos (que sólo implemente el get, puede ser en memoria o en MongoDB.)

// Crear un Repositorio producto (que sólo implemente el get)

// Conectar el Repositorio al DAO en el archivo index de services.

// Crear un Router productos (que importe el Repositorio)

// Corroborar que al mandar a llamar al router, devuelva un arreglo vacío (indicando que sí se pudo acceder a la persistencia).


// |----------------------------------------------|

// Desarrollando un sistema de backend completo basado en capas: 📁ejemplo-backend-capas + frontend-react
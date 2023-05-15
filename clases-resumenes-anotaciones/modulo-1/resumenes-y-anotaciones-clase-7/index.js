// CLASE 7: MongoDB, Concepto de base de datos, bases de datos relacionales y no relacionales, concepto de instalación de MongoDB, CRUD, Filtros, CRUD'UD


// |------------------------------------------|


// Hasta este punto solo hemos trabajado con persistencia en memoria y persistencia en archivos 

// Sin embargo sabemos que la persistencia en memoria no es una opción y el uso de archivos tiene algunos problemas como:

// Tener que actualizar todo el archivo al mínimo cambio que queramos hacer
// Tener que leer todo el archivo cuando buscamos algún dato
// Sin protección al momento de querr mover o modificar algo. 

// Así se nos haría imposible trabajar con miles/millones de datos por eso para trabajar con grandes volúmenes de datos se trabajacon bases de datos.

// Tenemos las bases de datos relacionales y las no relacionales
// Vamos a estar trabajando con las no relacionales ya que hay mayor flexibilidad. Una base de datos no relacional se puede ajustar facilmente a nuestras necesidades.


// |------------------------------------------|


// Bases de datos no relacionales: MongoDB

// Base de datos no relacional orientada a documentos
// En lugar de tablas, oprta por utilizar colecciones
// Cada documento que ingresamos a una colección puede tener diferente estructura
// Puede utilizarse en modo local o en la nube

// La arquitectura de MongoDB consta del servidor propiamente dicho que contiene databases, puede ser una o mas, que a su vez estas databases contienen colecciones de documentos.


// |------------------------------------------|


// Documentos

// Los documentos en MongoDB se basan en el concepto de clave-valor, similar a un objeto en JavaScript. No son objetos propiamente dichos, sino que MongoDB utiliza una extensión llamada BSON para almacenarlos en la base de datos.
// Los esquemas de una base de datos en MongoDB son fáciles de manipular gracias a herramientas como mongoose, ya que se pueden definir con una estructura similar a la de un objeto.


// |------------------------------------------|


// Luego de instalar MongoDB, Mongo Shell y configurar nuestras variables de entorno para poder ejecutar mongoshell desde cualquier directorio vamos a ver algunos comandos para controlar mongodb desde mongoshell.

// Cambiar a una base de dato existente o crear una base de datos nueva:
// use <data base name>

// Ver la base de datos:
// show dbs

// Crear una collecion:
// db.createCollection('<collection name>')

// Crear un documento
// db.<collection name>.insertOne('<document name>')

// Ver el contenido de una coleccion:
// show collections


// |------------------------------------------|


// 🟢🧑‍💻ACTIVIDAD EN CLASE: Primeros pasos con Mongo

// Una vez que corrobores que mongo está instalado en computador, a partir del cliente CLI, crear una base de datos de nombre “estudiantes”

// Agregar 5 estudiantes diferentes con los campos “nombre”, “apellido”, “curso”, “correo”. Puedes utilizar db.collection.insertMany()

// Una vez agregados, listar a los estudiantes de dicha colección y corroborar su persistencia.


// |------------------------------------------|


// CRUD en MongoDB

// CRUD es un acrónimo que hace referencia a las cuatros operaciones fundamentales de una base de datosÑ

// C de Create (Crear)
// R de Read (Leer)
// U de Update (Actualizar/Modificar)
// D de Delete (Eliminar)


// |------------------------------------------|


// Comandos:
// No forman parte de las operaciones CRUD pero son útiles para movernos/gestionar nuestra base de datos

//[  show dbs  ]: Muestra las bases de datos existentes

//[  use <db name>  ]: Para cambiar de bases de datos o crearla si no exite

//[  db  ]: Muestra todas las colecciones disponibles en la base de datos actual.

//[  db.createCollection(<db name>)  ]: Crea una colección en la base de datos actual

//[  db.dropDatabase(<db name>)  ]:  Elimina la base de datos actual

//[  db.collection.drop(<db name>)  ]: Elimina la colección de la base de datos posicionada


// |------------------------------------------|


// Comandos CRUD: Create y Read

//[  db.collection.insertOne(<doc>)  ]: Añade un nuevo documento a la colección

//[  db.collection.insertMany(<docs>)  ]: Añade varios documentos a la colección

//[  db.collection.findOne(<opt>)  ]: Devuelve el primer el elemento que coincida con <opt>

//[  db.collection.find(<opt>).pretty()  ]: .pretty() se añadia para presentar el resultado de forma mas sencilla y bonita, en las ultimas versiones ya viene por defecto en cualquier busqueda que hagamos.


// |------------------------------------------|


// Comandos: Conteo de datos

// Los comandos de conteo para determinar el número de documentas en una colección son:

//[  db.collecttion.estimatedDocumentCount()  ]: Cuenta el estimado más próximo al número de documentos según su metadata.

//[  db.collection.countDocuments(<opt>)  ]: Cuenta los documentos que cumplan con el criterio definido en las opciones (<opt>)


// |------------------------------------------|


// 🟢🧑‍💻ACTIVIDAD EN CLASE: CRUD (Create y Read solamente por ahora)

// Sobre una base de datos llamada “colegio”, crear una colección “estudiantes” donde se agregarán documentos con los siguientes datos:

// nombre
// apellido
// curso
// edad
// correo
// sexo 

// Crear 5 estudiantes (Insert Many) con los campos mencionados arriba. Además, crear un estudiante sólo con nombre, apellido y curso. ¿Es posible?

// Realizar una búsqueda para obtener a todos los estudiantes.
// Realizar una búsqueda para obtener a todos los estudiantes de sexo H (hombre)
// Realizar un conteo para obtener el número de documentos totales.
// Realizar un conteo para obtener el número de documentos totales que cumplan con el criterio: “Es mujer”


// |------------------------------------------|


// Búsquedas más complejas: Filtros

// Muchas veces vamos a necesitar de filtrar los datos. Con filtros complejos vamos a poder realizar busquedas bajo criterios muy especificos.

// La sintaxis general es:
// db.collection.find( {key: {$operator: val}} )


// |------------------------------------------|


// Operadores para filtros de Query

// $and: Realizar operacion AND
// Sintaxis: {$and: [{}, {}]}

// $or: Realiza opareción OR
// Sintaxis: {$or: [ {},{} ] }

// $lt: Menor que
// Sintaxis: { campo: { $lt: valor } }

// $lte: Menor o igual que
// Sintaxis: { campo: { $lte: valor } }

// $gt: Mayor que
// Sintaxis: { campo: { $gt: valor } }

// $gte: Mayor o igual que
// Sintaxis: { campo: { $gte: valor } }

// $ne: Distinto a
// Sintaxis: { campo: { $ne: valor } }

// $eq: Igual que
// Sintaxis: { campo: { $eq: valor } }

// $exists: Selecciona los documentos según la existencia de un campo
// Sintaxis: { campo: { $exists: valor } }

// $in: Selecciona los documentos especificados en un array.
// Sintaxis: { campo: { $in: [array_de_valores] } }

// $nin: Coincide con ninguno de los valores especificados en un array.
// Sintaxis: { campo: { $nin: [array_de_valores] } }

// $size: Coincide con el número de elementos especificados.
// Sintaxis: { campo: { $size: valor } }

// $all: Coincide con todos los valores definidos dentro de un array.
// Sintaxis: { campo: { $all: [array_de_valores] } }

// $elemMatch: Coincide con algún valor definido dentro del query.
// Sintaxis: { campo: { $elemMatch: { query } } }


// |------------------------------------------|


// Busqueda Avanzada

// db.collection.distinct( val )
// Devuelve un array con los distintos valores que toma un determinado campo en los documentos de la colección.

// db.collection.find({doc.subdoc:value})
// Se utiliza para filtrar subdocumentos.

// db.collection.find({name: /^Max$/i})
// Filtra utilizando expresiones regulares


// |------------------------------------------|


// Proyecciones

// En ocasiones no necesitamos toda la info de un documento. Podemos definir solo las propiedades que queremos ver.

// Una proyección se incluye al momento de hacer una búsqueda , se lo pasamos como segundo argumento. Es el equivalente a decir 'De esta coleccion muestrame solo estas propiedades'

// Sintaxis: db.collection.find({<primer parámetro para filtrar>}, {name: 1})

// En la sintaxis, {name: 1} significa que solo queremos mostrar la propiedad name del documento.

// El número 1 indica que se incluirá esa propiedad en los resultados de la búsqueda.

// Si se utiliza 0 en lugar de 1, se excluirá la propiedad name del resultado. Puedes incluir o excluir múltiples propiedades separándolas por comas dentro de los corchetes.


// |------------------------------------------|


// Sort
// Sirve para definir un orden de la información. Permite ordenar los resultados de una consulta en orden ascendente o descendente.

// Sintaxis:
// db.collection.find().sort({ campo1: 1, campo2: -1 })

// campo1 y campo2 son los campos por los cuales se desea ordenar. El valor 1 indica orden ascendente, mientras que -1 indica orden descendente.

// La capacidad de agregar múltiples campos de ordenamiento es útil cuando dos o más documentos tienen el mismo valor en un campo, de esta forma se puede ordenar por otro criterio adicional para determinar el orden en esos casos.


// |------------------------------------------|


// Skip y Limit

// Se utilizan para controlar la paginación y limitar el número de documentos devueltos en una consulta.

// skip: Omite el número de documentos indicados. Se utiliza para IGNORAR un número específico de documentos, lo cual es útil para implementar la paginación.

// Sintaxis:
// db.collection.find().skip(offset)

// limit: LIMITA el número de documentos devueltos en una consulta. Permite definir cuántos documentos se deben devolver en los resultados de la consulta.

// Sintaxis:
// db.collection.find().limit(num)

// En la sintaxis, offset es la cantidad de documentos que se deben omitir antes de comenzar a devolver resultados. num es el número máximo de documentos que se deben devolver.


// |------------------------------------------|


// CRUD: Update

// Las operaciones de actualización (Update) se pueden realizar de dos maneras: actualizar un único documento o actualizar múltiples documentos.

// db.collection.updateOne(query, update, options)
// Actualiza un solo documento que cumple con el filtro especificado en el parámetro query. Se utiliza para actualizar un único documento de la colección.

// [  query  ]: Define el filtro para seleccionar el documento que se desea actualizar, utilizando los mismos filtros que se utilizan en la operación find.

// [ update  ]: Indica qué campos y valores actualizar en el documento que cumple con el filtro. Puedes utilizar operadores como $set, $unset, $inc, $rename, $mul, $min, $max para realizar actualizaciones específicas.

// [  options  ]: Proporciona opciones adicionales para la operación de actualización, como upsert, que inserta el documento si no existe.


// db.collection.updateMany(query, update, options)
// Actualiza múltiples documentos que cumplen con el filtro especificado en el parámetro query. Se utiliza para actualizar varios documentos en la colección.

// [  query  ]: Define el filtro para seleccionar los documentos que se desean actualizar.

// [  update  ]: Indica qué campos y valores actualizar en los documentos que cumplen con el filtro.

// [  options  ]: Proporciona opciones adicionales para la operación de actualización.


// |------------------------------------------|


// CRUD: Delete

// Existen dos operaciones principales para eliminar datos de una colección:

// db.collection.deleteOne({key: val})
// Elimina el primer documento que cumple con el criterio especificado. Se utiliza principalmente para eliminar un documento específico por su identificador único.
// Se recomienda tener precaución al utilizar esta operación si se espera que el valor a buscar no sea repetido.

// db.collection.deleteMany({key: val})
// Elimina todos los documentos que cumplen con el criterio especificado.
// Se utiliza cuando se desea realizar una eliminación masiva de documentos que cumplen con un determinado filtro.
// Es útil para hacer una limpieza general de datos.

// Estas operaciones permiten eliminar datos de una colección en MongoDB de forma selectiva (usando deleteOne) o en masa (usando deleteMany), según las necesidades específicas del caso.


// |------------------------------------------|


// 🟢🧑‍💻ACTIVIDAD EN CLASE: Operaciones con Filtros 

// Sobre la base y los datos cargados anteriormente:

// 1- Insertar cinco documentos más en la colección estudiantes con los siguientes datos:
// { "nombre" : "Pablo", "edad" : 25 }
// { "nombre" : "Juan", "edad" : 22 }
// { "nombre" : "Lucia", "edad" : 25 }
// { "nombre" : "Juan", "edad" : 29 }
// { "nombre" : "Fede", "edad" : 35 }

// 2- Listar todos los documentos de la colección estudiantes ordenados por edad descendente.
// db.estudiantes.find().sort({ edad: -1 })

// 3- Listar el estudiante más joven.
// db.estudiantes.find().sort({ edad: 1 }).limit(1)

// 4- Listar el segundo estudiante más joven.
// sdb.estudiantes.find().sort({ edad: 1 }).skip(1).limit(1)

// 5- Listar los estudiantes llamados 'Juan'
// db.estudiantes.find({ nombre: 'Juan' })

// 6- Listar los estudiantes llamados 'Juan' que tengan 29 años.
// db.estudiantes.find({ nombre: 'Juan', edad: 29 })

// 7- Listar los estudiantes llamados 'Juan' ó 'Lucia'.
// db.estudiantes.find({ $or: [{ nombre: 'Juan' }, { nombre: 'Lucia' }] })

// 8- Listar los estudiantes que tengan más de 25 años.
// db.estudiantes.find({ edad: { $gt: 25 } })

// 9- Listar los estudiantes que tengan 25 años ó menos.
// db.estudiantes.find({ edad: { $lte: 25 } })

// 10- Listar los estudiantes que NO tengan 25 años.
// db.estudiantes.find({ edad: { $ne: 25 } })

// 11- Listar los estudiantes que estén entre los 26 y 35 años.
// db.estudiantes.find({ edad: { $gte: 26, $lte: 35 } })

// 12- Actualizar la edad de Fede a 36 años, listando y verificando que no aparezca en el último listado.
// db.estudiantes.updateOne({ nombre: 'Fede' }, { $set: { edad: 36 } })

// 13- Listar los estudiantes que tengan más de 25 años.
// db.estudiantes.find({ edad: { $gt: 25 } })

// 14- Listar los estudiantes que tengan 25 años ó menos.
// db.estudiantes.find({ edad: { $lte: 25 } })

// 15- Listar los estudiantes que NO tengan 25 años.
// db.estudiantes.find({ edad: { $ne: 25 } })

// 16- Listar los estudiantes que estén entre los 26 y 35 años.
// db.estudiantes.find({ edad: { $gte: 26, $lte: 35 } })


// |------------------------------------------|
// Clase 9: Teoría de indexación, manejo de populations en Mongo, Aggregations, Paginación con mongoose.


// |---------------------------------------------------|


// 🗂️☝️🔎Indexación

// La indexación es una técnica utilizada en MongoDB para acelerar las consultas. Permite establecer una referencia previa al buscar un documento, evitando recorrer toda la colección.

// Los índices se asocian a atributos del documento y permiten realizar búsquedas desde puntos específicos en lugar de recorrer la colección completa. Esto mejora significativamente el rendimiento de las consultas.


// |---------------------------------------------------|

// Esta sección hace referencia al proyecto alojado en: Ejemplo tiempo de respuesta:

// 🤔Hasta ahora, nuestras consultas han sido rápidas y no han tenido problemas de rendimiento debido al bajo volumen de datos que hemos manejado.

// 💼Sin embargo, en entornos empresariales, es crucial garantizar consultas rápidas. Para lograrlo, es necesario tener un plan de indexación sólido.

// 📈En la clase vimos como en una base de datos de 5.000 usuarios haciendo una consulta sin indice la respuesta del servidor rondaba en los 3 milisegundos y con indice esto bajaba hasta 1 milisegundo. 

// ⚠️ Por lo general, el tiempo de busqueda con indice contra el tiempo de búsqueda por filtro es de un milisegundo (aprox). ¿Es realmente una problemática?

// En una base de datos con 5mil documentos? No, para nada. Pero... que va a pasar cuando tengamos 10mil o... un millón de documentos? Se puede volver bastante lento en relativamente poco tiempo.

// Por eso debemos anticiparnos y tener habituarnos a tener buenos planes de indexación.


// |---------------------------------------------------|


// 🥸☝️Conclusión

// Es evidente que hay una reducción en el tiempo de respuesta. Esta mejora será cada vez más notora conforme el numero de documentos crezca.

// Entonces debemos crear indexación de los campos que consideremos que puedan llegar a ocasionar problemas de lentitud en las peticiones al servidor.

// Parte de tu trabajo implica analizar los servicios utilizados por tu aplicación y desarrollar una estrategia de indexación acorde a las consultas realizadas en la base de datos.

// Aunque no tengamos los conocimientos y responsabilidades de un DBA, en ocasiones nos tocará tomar decisiones en este ámbito.

// ⚠️🚫No se deben usar índices en todos los campos⚠️🚫, solo en aquellos relevantes para las consultas. Indexar cada campo de cada documento ralentiza las operaciones de escritura y genera almacenamiento innecesario en la base de datos.


// |---------------------------------------------------|


// 🟢🧑‍💻ACTIVIDAD COLABORATIVA: Análisis de indexación

// Consigna: Se hará revisión de un conjunto de schemas. Analizar e identificar las propiedades de un documento y definir en cuáles deberíamos utilizar una indexación. 

// La decisión debe ser tomada según el contexto de cada Schema.

// Justificar en cada caso por qué se tomó dicho índice como una posible opción. Recuerda que las respuestas de esta actividad pueden llegar a ser subjetivas, según la justificación que brindemos para cada caso.

// PD: Recuerda que puede haber más de un índice por documento. 

// 1️⃣ Contexto: Schema de estudiante de un curso en específico (grade refiere a la calificación de dicho curso)

/* {
	first_name:String,
	last_name:String,
	*email:String,
	telephone:String,
	age:Number,
	grade:Number,
	gender:String,
	address:String
}*/

// Respuesta: La mayoría coincidimos en que "email" es un campo único y lo suficientemente significativo como para identificar a los estudiantes, y también suele ser una búsqueda recurrente.


// 2️⃣ //Contexto: Schema de ticket de compra generado desde un ecommerce

/* {
	*buyer_id : ObjectId,
	total_ammount:Number,
	products:Array,
	destination_address:String,
	destination_postal_code:String,
	comments:String,
}*/

// Respuesta: La mayoría coincidimos en que el "buyer_id" es el campo más consultado y único dentro del ticket de compra, por lo que no vimos necesario agregar más índices.

// 3️⃣Contexto: Schema de usuario de una aplicación de entregas y envíos
/* {
	first_name:String,
	last_name:String,
	email:String,
	telephone:String,
	age:Number,
	gender:String,
	*address:String,
	*postal_code:String,
}*/

// Respuesta: Si bien coincidimos la mayoría con el "postal_code", ya que sería una búsqueda habitual para organizar los envíos, también añadiría el "address", que es bastante recurrente y algo más único.

// 4️⃣Contexto: Schema de un libro correspondiente a un negocio de librería.

/* {
    *title:String,
	description:String,
	prize:Number,
	reviews:Array,
	rating:Number,
	images:Array,
	*author:ObjectId,
	num_of_pages:Number
}*/

// Respuesta: Coincidimos en que el título y el autor son dos campos que merecen tener indexación, ya que serían las dos consultas más recurrentes.


// |---------------------------------------------------|


// ↗️Esta sección hace referencia al proyecto alojado en: Ejemplo de population

// 🔎Populations
// 🗂️¿Obtener data dentro de la data?

// La población (population) en MongoDB implica obtener un documento referenciado dentro de otro documento en una sola búsqueda.

// Se realiza almacenando el ID de un documento como propiedad de otro documento, lo cual se conoce como "referencia".

// La operación de "populate" permite "poblar" un ID y obtener el documento completo asociado a ese ID.


// ⚠️🚫Aspectos a considerar antes de comenzar a usarlo:🚫⚠️

// populate es un método propio de mongoose

// Hay que tener siempre claro el nombre de la propiedad dentro del objeto, así también como la referencia de la colección, para poder hacer un populate efectivo.

// Jamás hagas una population bidireccional! Esto ocasionará que uno llame a otro, otro a uno, uno a otro, otro a uno… etc.


// |---------------------------------------------------|


// ↗️Ver el archivo dentro de Ejemplo de population > src > models > students.js

// 🧑‍💻🔎Middlewares para mongoose

// Los middlewares en Mongoose son utilizados para automatizar operaciones recurrentes en documentos y modelos.

// En particular, el middleware "pre" permite ejecutar acciones antes de ciertas operaciones.

// En el caso específico de la operación "populate" en la búsqueda de estudiantes, el uso de un middleware "pre" puede evitar la necesidad de llamar explícitamente a "populate" en cada ocasión, simplificando así el proceso.

// El middleware "pre" en Mongoose se ejecuta antes de finalizar la operación y entrega de los datos.

// En el contexto de la operación "find", se utiliza para definir acciones que deseamos que se realicen en un documento antes de devolver el resultado de la búsqueda. En nuestro caso, utilizaremos el middleware "pre" para realizar una operación de "population" antes de recibir el documento.


// |---------------------------------------------------|


// ↗️Esta sección hace referencia al proyecto alojado en: Ejemplo de aggregation

// 🟢Aggregation

// Permite realizar múltiples operaciones sobre varios documentos.
// Se utiliza para agrupar documentos según un criterio, realizar operaciones para obtener un único resultado y analizar cambios en la información a lo largo del tiempo.
// Es una herramienta poderosa para transformar datos y obtener información significativa.


// Los pipelines de agregación en MongoDB consisten en una serie de etapas (stages), donde cada etapa corresponde a una operación a realizar.

// Podemos definir tantas etapas como sean necesarias para alcanzar los resultados deseados. Los documentos resultantes de una etapa se utilizan como entrada para la siguiente etapa, y así sucesivamente hasta llegar al final.

// En un pipeline de agregación, podemos realizar diversas operaciones, como filtrar documentos, ordenarlos, realizar cálculos y generar nuevos campos. Algunas de las principales etapas disponibles son:

// $count: Cuenta el número de documentos en la etapa actual.
// $group: Agrupa documentos en nuevos grupos según un criterio especificado.
// $limit: Limita el número de documentos que pasan a la siguiente etapa.
// $lookup: Realiza una operación de "left join" entre colecciones de la base de datos.
// $set / $addFields: Agrega nuevas propiedades a los documentos.
// $skip: Omite los documentos iniciales según un offset especificado.
// $sort: Ordena los documentos en la etapa actual.
// $match: Filtra los documentos que cumplen con un criterio de búsqueda.
// $merge: Escribe los resultados del pipeline en una colección.

// Estas etapas permiten realizar transformaciones complejas en los datos y obtener los resultados deseados en la aggregation


// |---------------------------------------------------|


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


// |---------------------------------------------------|


// ↗️Esta sección hace referencia al proyecto alojado en: Ejemplo de paginate

// 📖 Paginación con mongoose

// Es genial ver cómo nuestras búsquedas pueden devolvernos todos los datos que necesitamos. Esto comienza a convertirse en un problema cuando el número de datos que tenemos incrementa considerablemente.

// Aprender a pensar en páginas nos permitirá segmentar los resultados en pequeños trozos de información, brindándonos al final una referencia de en qué página estamos, cuál es la página anterior y cuál la siguiente

// Paginación utilizando mongoose-paginate-v2

// mongoose-paginate-v2 es un plugin para mongoose que nos permite realizar paginaciones eficiantes para los modelos que especifiquemos.

// Para instalarlo con npm el comando es: 
// npm install mongoose-paginate-v2

// Nociones de mongoose-paginate-v2:

// docs: Los documentos devueltos en la página
// totalDocs: Los documentos totales de la consulta realizada.
// limit: Límite de resultados por página.
// page: Página actual en la que nos encontramos
// totalPages: Páginas totales que pueden ser solicitadas en la búsqueda.

// docs: Los documentos devueltos en la página
// totalDocs: Los documentos totales de la consulta realizada.
// limit: Límite de resultados por página.
// page: Página actual en la que nos encontramos
// totalPages: Páginas totales que pueden ser solicitadas en la búsqueda.


// |---------------------------------------------------|


// Hands on Lab: Sistema de paginación de estudiantes


// En esta instancia de la clase crearemos una paginación elemental con los estudiantes del ejercicio pasado, a partir de  un ejercicio práctico

// ¿Cómo lo hacemos? Se creará una vista simple con Handlebars donde se podrán mostrar los estudiantes

// Los estudiantes serán mostrados en la vista “/students”
// Debe existir un enlace “Anterior”” para regresar a los estudiantes anteriores, siempre que haya una página anterior
// Debe existir un enlace “Siguiente” para continuar con la paginación de estudiantes, siempre que haya una página siguiente
// Debe indicarse la página actual.
// En su totalidad debe vivir en un servidor de express escuchando en el puerto 8080.

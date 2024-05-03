# CRUD en MongoDB

CRUD es un acrónimo que hace referencia a las cuatro operaciones fundamentales de una base de datos:

- **Create:** Crear un dato
- **Read:** Leer un dato
- **Update:** Actualizar un dato
- **Delete:** Eliminar un dato

### Comandos de apoyo

En nuestro cliente CLI contamos con comandos que, si bien no forman parte de la clasificación del CRUD, son útiles para poder gestionar correctamente nuestra base de datos.

- **show dbs**: Muestra todas las bases de datos
- **use < db name >**: Crea una nueva base de datos (en caso de no existir) y se posiciona sobre ella.
- **db**: Muestra la base de datos en la que esta estas posicionado
- **show collections**: Muestra todas las colecciones ne la base de datos posicionada
- **db.createCollection(name)**: Crea una colección en la base de datos posicionada
- **db.dropDatabase()**: Elimina la base de datos actual.
- **db.collection.drop()**: Elimina la colección de la base de datos posicionada.


### Comandos CRUD

- **db.collection.insertOne(doc)**: Agrega un nuevo documento a la colección seleccionada.

- **db.collection.insertMany(docs)**: Agrega múltiples documentos a la colección seleccionada (dado un arreglo de documentos).

- **db.collection.findOne(opt)**: Busca un elemento que cumpla con los criterios de búsqueda (opt), devuelve el primer documento que cumpla con dicho criterio.

- **db.collection.find(opt)**: Devuelve todos los documentos que cumplan con dicho criterio. 

- **db.collection.find(opt).pretty()**: Añadido para hacer más presentables los resultados de un find().


### Conteo de datos

Los comandos de conteo para determinar el número de documentos en una colección son:

- **db.collection.estimatedDocumentCount()**: Cuenta el estimado más próximo  al número de documentos según su metadata.

- **db.collection.countDocuments(opt)**: Cuenta los documentos que cumplan con el criterio definido en las opciones (opt).

### Agregando opciones

En muchas consultas encontramos el elemento (opt), esto hace referencia a las opciones de filtros de búsqueda que podemos realizar al momento de buscar un valor, la sintaxis elemental de un opt es:

**db.users.find({ gender: "M" })**


## Actividad en clase

Sobre una base de datos llamada “colegio”, crear una colección “estudiantes” donde se agregarán documentos con los siguientes datos:

- nombre
- apellido
- curso
- edad
- correo
- sexo

Crear 5 estudiantes (Insert Many) con los campos mencionados arriba. Además, crear un estudiante sólo con nombre, apellido y curso. ¿Es posible?

- Realizar una búsqueda para obtener a todos los estudiantes.

- Realizar una búsqueda para obtener a todos los estudiantes de sexo H (hombre)

- Realizar un conteo para obtener el número de documentos totales.

- Realizar un conteo para obtener el número de documentos totales que cumplan con el criterio: “Es mujer”


### Filtros

Las búsquedas del mundo real no siempre requieren que un valor sea igual a otro. En ocasiones necesitamos que sea menor, mayor, diferente de, entre otras cosas. 

Podemos agregar más de un filtro para asegurarnos que el documento se ajuste a criterios muy específicos.

Entonces, la sintaxis general será:

**db.collection.find({ key: { $operador: valor }})**


### Filtros de Query

- **$and**: Realiza operación AND -> sintaxis: {$and: [ {},{} ] }

- **$or**: Realiza operación OR -> sintaxis: {$or: [ {},{} ] }

- **$lt**: Coincide con valores que son menores que un valor especificado.

- **$lte**: Coincide con valores menores o iguales a un valor especificado.

- **$gt**: Coincide con valores mayores a un valor especificado.

- **$gte**: Coincide con valores mayores o iguales a un valor especificado.

- **$ne**: Coincide con valores que no son iguales a un valor especificado.

- **$eq**: Selecciona los documentos que son iguales a un valor especificado.

- **$exists**: Selecciona los documentos según la existencia de un campo.

- **$in**: Selecciona los documentos especificados en un array. sintaxis: {key:{$in: [array of values] } }

-  **$nin**: Coincide con ninguno de los valores especificados en un array.

- **$size**: Coincide con el número de elementos especificados.

- **$all**: Coincide con todos los valores definidos dentro de un array.

- **$elemMatch**: Coincide con algún valor definido dentro del query.

### Búsqueda avanzada

- **db.collection.distinct(val)**: Devuelve un array con los distintos valores que toma un determinado campo en los documentos de la colección.

- **db.collection.find({doc.subdoc:value})**: Se utiliza para filtrar subdocumentos.

- **db.collection.find({name: /^Max$/i})**: Filtra utilizando expresiones regulares


### Proyecciones

En ocasiones no necesitamos toda la información de un documento. Si tenemos un documento con 100 propiedades, podemos definir sólo las propiedades que queremos obtener. 

Una proyección se incluye al momento de hacer una búsqueda, (siempre como segundo argumento) y es el equivalente a decirle a la base de datos: “sólo necesito ésto”

Así, podríamos decir **db.users.find({},{name:1});** Lo cual indica que, el campo “name” es el único que necesitamos obtener por parte del documento, ahorrándonos espacio y complejidad en el resultado.

### Sort

Sirve para poder hacer un ordenamiento de la información. El ordenamiento se define con 1 o -1 para hacer el ordenamiento ascendente o descendente respectivamente.

La sintaxis es:

**db.collection.find().sort({val_A:1,val_B:-1})**

La razón por la cual podemos agregar múltiples valores de ordenamiento, es en caso de que dos documentos tengan el mismo valor, podamos ordenarlos bajo otro criterio

### Skip y Limit

**Skip**: Omite el número de documentos indicados: Podemos usarlo cuando hagamos paginaciones, cuando necesitemos ignorar un valor que sabemos que es innecesario, etc.

Su sintaxis es: **.skip(offset)**

**Limit**: Limita el número de documentos devueltos. De manera que podamos hacer diferentes niveles de paginación (Tu página puede devolver 5 elementos por página, o bien 100, tú decides). 

Su sintaxis es: **.limit(num)**

### CRUD - Update y Delete

Las operaciones Update se pueden realizar de dos maneras: Actualizar un documento, o actualizar múltiples documentos. 

**db.collection.updateOne(query,update,option)**

- **query**: sirve para filtrar qué elementos actualizar (usa los filtros iguales al find)

- **update**: Apartado para indicar qué actualizar de los documentos que cumplen con el filtro. Update tiene sus propios operadores como $set, $unset, $inc, $rename, $mul, $min, $max

- **option**: Opciones a tomar en cuenta para la actualización (como upsert, que inserta el valor en caso de que el documento a actualizar ni siquiera exista).

**db.collection.updateMany(query,update,options)** 
Actualiza múltiples documentos que cumplan con el criterio. 

Nuestra última operación es para eliminar datos, si bien hay muchas variantes de una eliminación, sólo veremos las dos principales.

- **db.collection.deleteOne({key:val})**: Elimina sólo el primer elemento que cumpla con el criterio, se usa principalmente para encontrar identificadores específicos. Se recomienda no utilizar si somos.

- **db.collection.deleteMany({key:val})**: Elimina todos los documentos que cumplan con el criterio, se usa cuando sabemos que más de un valor va a contar con ese valor y necesitamos hacer una limpieza general.

## Actividad en clase: Operaciones con Filtros

Sobre la base y los datos cargados anteriormente

1. Insertar cinco documentos más en la colección clientes con los siguientes datos

```json
{ "nombre" : "Pablo", "edad" : 25 }
{ "nombre" : "Juan", "edad" : 22 }
{ "nombre" : "Lucia", "edad" : 25 }
{ "nombre" : "Juan", "edad" : 29 }
{ "nombre" : "Fede", "edad" : 35 }
```
2. Listar todos los documentos de la colección clientes ordenados por edad descendente.

3. Listar el cliente más joven.

4. Listar el segundo cliente más joven.

5. Listar los clientes llamados 'Juan'

6. Listar los clientes llamados 'Juan' que tengan 29 años.

7. Listar los clientes llamados 'Juan' ó 'Lucia'.

8. Listar los clientes que tengan más de 25 años.

9. Listar los clientes que tengan 25 años ó menos.

10. Listar los clientes que NO tengan 25 años.

11. Listar los clientes que estén entre los 26 y 35 años.

12. Actualizar la edad de Fede a 36 años, listando y verificando que no aparezca en el último listado.

13. Actualizar todas las edades de 25 años a 26 años, listando y verificando que aparezcan en el último listado.

14. Borrar los clientes que se llamen 'Juan' y listar verificando el resultado.

15. Eliminar además todos los documentos de estudiantes que hayan quedado con algún valor.

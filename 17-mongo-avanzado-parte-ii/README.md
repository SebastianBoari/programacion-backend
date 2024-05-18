# Mongo Avanzado II

Temario:

- Aggregations
- Paginación con Mongoose

## Aggregations

Consiste en la realización de múltiples operaciones, generalmente sobre múltiples documentos.

Pueden utilizarse para:

- Agrupar documentos con base en un criterio específico.

- Realizar alguna operación sobre dichos documentos, con el fin de obtener un solo resultado.

- Analizar cambios de información con el paso del tiempo.


### Funcionamiento

Los aggregation pipelines consistirán en un conjunto de pasos (stages), donde cada paso corresponderá a una operación a realizar.

Podemos definir tantas stages como necesitemos con el fin de llegar a los resultados esperados.

Los documentos resultantes de la stage que finalice, se utilizan como “input” de la siguiente stage, y así sucesivamente hasta llegar al final.

1. Primero filtra los documentos que tengan un valor x mayor a 20

2. Luego ordénalos de mayor a menor

3. Luego en un nuevo campo devuelve el valor máximo

4. Luego en un nuevo campo devuelve el valor mínimo

5. Luego en un nuevo campo devuelve la suma total de todos los documentos

### Principales stages disponibles en un aggregation pipeline

**$count:** Cuenta el número de documentos disponibles que se encuentren en la stage actual.

**$group:** Permite agrupar los documentos disponibles en nuevos grupos según un criterio especificado. cada grupo cuenta con un _id nuevo, además de los valores acumulados.

**$limit:** Limita el número de documentos que saldrán de dicha stage.

**$lookup:** Permite realizar un “left join” (combinación de campos), de una colección de la misma base de datos a los documentos de la stage actual.

**$set / $addFields:** Agregan una nueva propiedad a los documentos que se encuentren en dicha stage.

**$skip:** Devuelve sólo los documentos que se encuentren después del offset indicado.

**$sort:** Ordena los documentos en la stage actual.

**$match:** Devuelve sólo los documentos que cumplan con un criterio de búsqueda, podemos colocar filtros comunes aquí

**$merge:** escribe los resultados del pipeline en una colección. Debe ser la última stage del pipeline para poder funcionar.


Suponiendo que tenemos una pizzeria y en las que tenemos distintos tipos y tamaños de pizzas.

Podriamos hacer consultas como estas:

```javascript

let orders = await orderModel.aggregate({
    {
        // Stage 1
        // Filtrar las ordenes para obtener solo aquellas que tengan el tamaño mediano.
        $match: { size: 'medium' }
    },
    {
        // Stage 2
        // Agrupar por sabores y acumular el numero de ejemplares de cada sabor.

        // $group necesitara crear un nuevo _id, este correspondera al campo "name" de la pizza
        $group: { _id: '$name', totalQuantity: { $sum: 'quantity' }}
    }
})

```

### Ventajas de los aggregations

En el caso de alguien del equipo necesite la información presentada de una forma distinta a la que esta estructurada en el código podremos crear consultas personalizadas y cada vez mas especificas sin modificar nada del código existente o agregando stages.


## Pagination

Cuando incrementa considerablemente la cantidad de datos y nuestras consultas se hacen lentas es conveniente generar una paginacion, que de los 10.000 usuarios nos entregue de a 100 usuarios o de a 1.000

Aprender a pensar en páginas nos permitirá segmentar los resultados en pequeños trozos de información

Mongoose de forma nativa no trae un paginación pero podemos instalar el siguiente paquete:

### mongoose-paginate-v2

mongoose-paginate-v2 es un plugin para mongoose que nos permitirá realizar paginaciones eficientes para los modelos que nosotros especifiquemos.
Cuenta con una gran optimización y agregado de funcionalidades frente a su v1

`npm i mongoose-paginate-v2`

- docs: Los documentos devueltos en la página

- totalDocs: Los documentos totales de la consulta realizada.

- limit: Límite de resultados por página.

- page: Página actual en la que nos encontramos

- totalPages: Páginas totales que pueden ser solicitadas en la búsqueda.

- hasNextPage: Indica si es posible avanzar a una página siguiente.

- nextPage: Página siguiente en la búsqueda

- hasPrevPage: Indica si es posible retroceder a una página anterior

- prevPage: Página anterior en la búsqueda.

- pagingCounter: Número de documento en relación con la página actual.


Implementación en el modelo

```javascript
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const usersCollection = 'users'

const usersSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String
})

usersSchema.plugin(mongoosePaginate)

const usersModel = mongoose.model(usersCollection, usersSchema)

export default usersModel
```
Como utilizarlo en nuestras consultas:

```javascript
 let users = await usersModel.paginate({ gender:'Female' }, { limit:20, page:1 })
```


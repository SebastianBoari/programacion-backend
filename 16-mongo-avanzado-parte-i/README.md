# Mongo Avanzado I

Temario:
- Teoría de indexación
- Manejo de populations en Mongo

## Indexación

Se utiliza para poder hacer consultas mucho más rápidas.

Cómo el indice de un libro este nos permite tener una referencia al momento de buscar un documento para evitar recorrer toda la colección documento por documento.

Nuestras consultas hasta ahora no repercuten en performance, debido a que los datos que consultamos son muy pequeños.

A nivel enterprise es una práctica necesaria prever un plan de indexación al momento de configurar los schemas y los distintos modelos.

Nuestros schemas/models se ven algo asi:

```javascript
import mongoose from 'mongoose'

const userCollection = 'users'

const userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String
})

const userModel = mongoose.model(userCollection, userSchema)

export default userModel
```

Con tan solo agregar `index: true` bastará para indexar el campo deseado.

```javascript
import mongoose from 'mongoose'

const userCollection = 'users'

const userSchema = mongoose.Schema({
    first_name:{
        type: String,
        index: true
    },
    last_name: String,
    email: String,
    gender: String
})

const userModel = mongoose.model(userCollection, userSchema)

export default userModel
```
### ¡Importante!
Un índice no debe ser utilizado en todos los campos, sólo deben ser utilizados en los campos que sepamos tienen repercusión en nuestras búsquedas. 

Colocar un índice en cada campo de cada documento, significa alentar procesos de escritura en cada insert, así también como generar un almacenamiento adicional e innecesario en la base de datos.

## Funcionamiento interno de un índice

Cuando creas un índice sobre un campo de un documento, MongoDB organiza los valores de ese campo en una estructura ordenada conocida como B-tree (árbol B). El B-tree es un tipo de árbol de búsqueda binaria equilibrado.

*Búsqueda en un índice*

Cuando ejecutas una consulta que utiliza un índice, MongoDB realiza los siguientes pasos:

1. **Inicio en la Raíz:** La búsqueda comienza en la raíz del B-tree.

2. **Desplazamiento a través del Árbol:** Desde la raíz, MongoDB sigue los punteros de los nodos del árbol, que actúan como guías, hacia los nodos que contienen los valores de interés.

3. **Acceso Directo:** Una vez que encuentra el nodo que contiene el valor buscado o el rango de valores, MongoDB accede directamente a los documentos correspondientes.

### Otros tipos de índice

- Índices compuestos (compound): Se utiliza cuando requerimos utilizar más de una indexación y queremos definir el orden con el cual se realiza el ordenamiento (ordenando con 1 para ascendente y -1 para descendente, igual que un sort:  { campo: 1 , campo: -1 }

- Índice de múltiple llave (multikey): Se utiliza cuando requerimos hacer una indexación de valores que se encuentran de manera interna en un array.

- Índice de texto (text): Se utiliza para poder basarse en búsquedas de palabras “específicas” con el fin de poder tomar referencia de un texto a partir de dichas palabras.

- Índice geoespacial (geospatial): Se utiliza para almacenar data geoespacial de dos coordenadas, utiliza una esfera 2d para poder trabajar los datos. 


## Populations

Una population implica obtener un documento referenciado dentro de otro documento, con el fin de obtener ambos en una sola búsqueda.

Consiste en almacenar el id de un documento, como propiedad de otro documento. A esto se le conoce como “referencia”.

### Algunas cosas a considerar antes de comenzar con su uso

- populate es un método propio de mongoose, por lo que tenemos que instalarlo. 

- Hay que tener siempre claro el nombre de la propiedad dentro del objeto, así también como la referencia de la colección, para poder hacer un populate efectivo. 

- Recuerda no guardar directamente el valor a referenciar en el _id, sino asignarle otro nombre (se profundizará en el ejemplo)

```javascript
import mongoose from 'mongoose'

const userCollection = 'users'

const userSchema = mongoose.Schema({
    first_name:{
        type: String,
        index: true
    },
    last_name: String,
    email: String,
    gender: String,
    courses: {
        type: [
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'courses'
            }
        ]
    }
})

const userModel = mongoose.model(userCollection, userSchema)

export default userModel
```

La estructura del campo courses indica que cada elemento que se ingrese al arreglo debe tener un campo “course”, el cual será un id que hará referencia a la colección courses. 

Este “ref” es el que utilizamos para saber que haremos un populate a la colección indicada. 

Cada vez que hagamos una consulta debemos agregar la funcion populate y pasarle como argumento el campo a poblar por ejemplo

```javascript
let student = await userModel.find({_id: "620dasdokasd130128"}).populate('courses.course')
```
### ¡Importante!

Una population es un puente entre dos documentos, como una relación unidireccional. 

¡Jamás hagas una population bidireccional! Esto ocasionará que uno llame a otro, otro a uno, uno a otro, otro a uno… etc.


## Configurando un population por default: Middlewares para mongoose

Tener que colocar el populate puede resultar molesto si  utilizamos constantemente el modelo de estudiante

Mongoose tiene la posibilidad de definir “middlewares” para sus documentos y modelos con el fin de automatizar operaciones que consideremos recurrentes. 

En esta ocasión utilizaremos un middleware conocido como “pre”

```javascript
import mongoose from 'mongoose'

const userCollection = 'users'

const userSchema = mongoose.Schema({
    first_name:{
        type: String,
        index: true
    },
    last_name: String,
    email: String,
    gender: String,
    courses: {
        type: [
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'courses'
            }
        ]
    }
})

userSchema.pre('find', function() {
    this.populate('courses.course')
})

const userModel = mongoose.model(userCollection, userSchema)

export default userModel
```
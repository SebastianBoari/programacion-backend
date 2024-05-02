# Mongo DB

Temario: 

- Concepto de Base de datos
- Bases de datos relacionales y no relacionales
- Concepto e instralación de MongoDB

## La persistencia: archivos

Hasta ahora hemos trabajado con el módulo nativo **fileSystem** para almacenar información.

Pero este tipo de persistencia de información tiene algunos problemas:

- Tener que actualizar todo el archivo cuando hacemos algún cambio.

- Tener que leer todo el archivo cuando buscamos algún dato.

- Sin protección al momento de querer mover o modificar algo.

Tal vés hasta el momento no has notado estos problemas, sin embargo, cuando tratamos con miles, millones o miles de millones de datos realmente nos encontramos con un **enorme problema de performance**.

Cuando se empezó a buscar una solución optima para trabajar con grandes volúmenes de datos surgieron las **bases de datos**.

## Base de datos

Una base de datos no es más que una recopilación organizada de datos. Dichos datos deben compartir algún contexto y son almacenados con poder convertirse posteriormente en información útil para utilizarse dentro de algún sistema. 

Aspectos importante a destacar sobre la utilidad de una base de datos:

- **Almacenamiento mas seguro:** Los datos que viven en una base de datos no son modificables directamente, por lo que éstos no pueden ser cambiados tan fácilmente. 

- **Segmentación de datos:** Podemos separar los datos en “contextos”, permitiendo así tener separados los datos de interés.
    - Separar clientes potenciales de clientes sólo interesados
    - Separar productos existentes de productos fuera de stock
    - Separar diferentes usuarios por género, nacionalidad, plan, etc

- **Gestión sencilla una vez configurada:** Una vez que hemos definido los esquemas principales de nuestra base de datos, podremos realizar operaciones sobre estos datos como:
    - Filtrar
    - Ordenar
    - Buscar datos específicos.
    - Actualizar un conjunto de datos sin afectar o tocar otros datos.

## Modelo relacional y No relacional

Una vez que entendimos que la base de datos nos sirve para mantener los datos organizados, toca entender cuándo utilizar un modelo relacional o un modelo no relacional. 

- Una base de datos relacional refiere a estructura, relación, dependencia y de cambio controlado.

- Una base de datos no relacional refiere a algo menos estructurado, con relaciones y dependencias más flexibles, y de cambios sumamente rápidos. 

## Modelo relacional

Refiere a modelos de datos donde se requieren estructuras más firmes y estrictas sobre los datos. Además, se utilizan en datos más controlados

- Se basan en tablas, columnas y filas para gestionar sus datos.

- Permiten conectar las tablas a partir de “relaciones” basadas en llaves primarias y foráneas.

Sirve para datos de control como:

- Sistemas bancarios
- Sistemas de clima (no tiempo atmosférico)
- Sistemas de películas

Su lenguaje es SQL (Structured Query Language). Algunos sistemas SQL son:

- PostgreSQL
- Oracle
- MySql
- MariaDB
- Micosoft SQL server


### El problema de las bases de datos relaciones:

Cuando las aplicaciones que necesitamos incrementan sus requisitos, los datos cambian más rápido y son más complejos, son más inconsistentes y por lo tanto nuestra base de datos relacional comienza a volverse lenta.

### Solución

**Introduciendo el modelo no relacional**

Se desarrolla un modelo donde los datos sean más flexibles, tanto en estructura, como en asociación.

Todo esto con el fin de crear datos pensados para desempeño, no para consistencia inmediata.

## Modelo no relacional

La flexibilidad de los datos lo hace considerablemente más rápido en cuanto a su accesibilidad.

Son bases de datos muy útiles para organizar y gestionar información no estructurada, o cuando no se tiene una noción clara de los datos a almacenar.

- Clave valor
- Documentos
- Gráficos
- Memoria
- Alto grado de escalabilidad y de performance
- No utiliza SQL como lenguaje

Algunos sistemas No SQL son:

- MongoDB
- Redis
- DynamoDB

### Importante

Las bases de datos relacionales en la mayoría de casos es lo mejor y la primera opción a implementar.

### ¿Cuándo usar cada modelo?

| Modelo Relacional                                                                 | Modelo no-relacional                                                                                 |
|-----------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| Cuando el volumen de los datos no crece, o bien lo  hace poco a poco              | Cuando el volumen de los datos crece rápidamente                                                     |
| Cuando las necesidades del proceso pueden atenderse en un solo servidor           | Cuando las necesidades del proceso son tan altas y tan constantes, que se requieren multi servidores |
| Cuando no existen picos de uso por parte de los usuarios que utilizan el sistema. | Cuando los usuarios saturan el sistema y generan “picos de uso”.                                     |



## MongoDB

- Base de datos no relacional orientada a documentos
- En lugar de tablas, opta por utilizar colecciones
- Cada documento que ingresamos a una colección puede tener diferente estructura
- Puede utilizarse en modo local o en la nube

**Otras características:**

- Almacena datos en documentos flexibles similares a JSON: la estructura de datos se puede cambiar con el tiempo.

- El modelo de documento se asigna a los objetos en el código de su aplicación para facilitar el trabajo con los datos

- Las consultas ad hoc, la indexación y la agregación en tiempo real ofrecen maneras potentes de acceder a los datos y analizarlos.

- MongoDB es una base de datos distribuida en su núcleo, por lo que la alta disponibilidad, la escalabilidad horizontal y la distribución geográfica están integradas y son fáciles de usar.

- MongoDB es de uso gratuito.

## Documentos

Una de las grandes ventajas de un documento es que éste se basa en el concepto de clave-valor, esto, como sabrás, se asemeja muchísimo a un objeto como el que has trabajado tanto tiempo en javascript

No son propiamente un “objeto” como para llamarlos de tal forma, sino que MongoDB trabaja con una extensión de los archivos conocidos como BSON. Esto es lo que realmente permanece en la base de datos

## Colección

Cada vez que pensemos en un grupo de datos, lo mencionaremos como una colección, en ésta almacenaremos cada documento individual (similar a una tabla con sus registros).

- Coleccion de usuarios
- Coleccion de productos
- Coleccion de mascotas

## Instalar MongoDB

1. Comenzamos instalando el community Server que se encuentra en el apartado de Productos, en la pestaña de  Community Edition.

2. Seleccionamos nuestro sistema operativo y presionamos el botón de descarga.

3. Ejecutamos el instalador y seguimos los pasos aceptando todo.

## Actividad en clase 

**Primeros paso con Mongo**

- Una vez que corrobores que mongo está instalado en computador, a partir del cliente CLI, crear una base de datos de nombre “estudiantes”

- Agregar 5 estudiantes diferentes con los campos “nombre”, “apellido”, “curso”, “correo”. Puedes utilizar db.collection.insertMany()

- Una vez agregados, listar a los estudiantes de dicha colección y corroborar su persistencia.



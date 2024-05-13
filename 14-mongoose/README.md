# Mongoose

Temario:

- Clientes de bases de datos
- Database As a Service (DBaaS)
- Mongoose en NodeJS

## Clientes de base de datos

Cuano accedemos a una base de datos, nos convertimos en clientes de esa base d edatos.

Podemos acceder de diferentes maneras a la base de datos:

- Cliente CLI
- Cliente GUI
- Cliente Web
- Cliente app

Ya fungimos como CLI, ahora veremos otras formas de ser clientes.

### Cliente GUI

Accedemos a la base de datos desde un programa gráfico destinado a ello.

El cliente GUI mas popular para trabajar con MongoDB es MongoDB Compass

Suele instalarse al momento en el que instalamos Mongo.

### Cliente App

Como desarrolladores Backend este será nuestro fuerte. Podemos manipular la base de datos a partir de código.

### Cliente Web

Cuando conseguimos tener nuestra base de datos en la nube, podemos conectarnos a un servidor en la web para poder manipular la base de datos.

El cliente web pro excelencia para MongoDB es MongoDB Atlas, además de fungir como DBaaS

## Database as a Service (DBaaS)

*EL problema: Escalabilidad y factibilidad*

- ¿Qué pasa cuando la base de datos va creciendo y necesitamos almacenar enormes cantidades de informacion?

- ¿Estamos dispuestos a dedicar cuartos completos con bases de datos?

- ¿Que costos puede llegar a tener la infraestructura física para el negocio? ¿Valdrá la pena?

Todos estos puntos se los considera en las empresas que utilizan bases de datos. La alternativa es rentar dicho espacio e infraestructura.

### La solución: DBaaS

Utilizar una base de datos como servicio, implica el poder hacer uso de una base de datos, sin preocuparse en tener que gestionar todo el aspecto físico que éste implica.

*Ventajas del modelo DBaaS*

- Se elimina la infraestructura física

- Ahorro de costos generalizado

- Estabilidad

- Ahorro en personal cualificado (Lo ofrecen las empresas especializadas en forma de soporte)

## MongoDB Atlas

- Puesta en marcha de un cluster en segundos.

- Implementaciones replicadas sin interrupcion.

- Total escalabilidad: escalado horizontal o vertical sin interrumpir la actividad.

- Revisiones automáticas y actualizaciones simplificadas.

- Autentificación y cifrado.

- Copias de seguridad continuas con recuperación temporal.

- Supervisión detallada y alertas personalizadas.

## Mongoose (00-ejemplo)

Mongoose es un ODM (Object Document Mapping), el cual nos permitirá definir esquemas para poder gestionar colecciones y documentos entre una aplicación de nodejs y una base de datos en MongoDB

Una vez que comprendemos que MongoDB permite gestionar documentos similar a un objeto. Además, mongoose nos permitirá conectar con la base de datos gestionada desde Mongo Atlas, con el fin de poder mantener la gestión de la base de datos desde la nube.




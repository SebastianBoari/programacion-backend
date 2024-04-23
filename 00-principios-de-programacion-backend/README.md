# Principios de programación Backend

Temario:

- Programacion web
- Distintas maneras de probar JavaScript
- Tipos de datos en JavaScript

Objetivos de la clase:

- Conocer las diferencias entre programación frontend y backend.

- Familiarizarse con las nociones básicas para programar utilizando Javascript y el MERN stack.

### Programación web

#### *¿Qué es el desarrollo web?*

Construccion y mantenimiento de sitios que pueden encontrarse en la World Wide Web (www) y sus redes derivadas.

Al principio solo se basaba en el desarrollo de páginas estáticas. Sin embargo, con el paso del tiempo estas fueron requiriendo más dinamismo, al putno de comenzar a desarrollar sitios web completos o incluso aplicaciones web.

#### *Las dos caras de una misma moneda*

A medida que las necesidades del desarrollo web fueron creciendo, surgió la necesidad de separar el desarrollo en dos aspectos importantes: **Frontend** y **Backend**.

#### *Frontend y Backend*

El **frontend** comprende la parte visual y de interacción directa con el usuario.

- Imágenes
- Colores
- Botones
- Interacciones

El **backend** comprende toda la parte lógica y de manejo de información.

- Almacenamiento de información
- Los cálculos complejos
- Los servidores donde viven las páginas


#### *Stack MERN*

Un **stack** es un conjunto de tecnologias que nos brindarán la posibilidad de desarrollar sistemas completos.

#### *Componentes de MERN Stack*

- MongoDB: base de datos no relacional
- ExpressJS: framework para crear servidores en NodeJS
- ReactJS: libreria para desarrollar interfaces de usuario
-NodeJS: entorno de ejecución de JavaScript

#### *¿Cómo probamos JavaScript?*

- Cliente web: utilizado desde la consola del navegador.

- NodeJS: instalando NodeJS y ejecutando el codigo en nuestro sistema.


#### *Cliente Web*

En el cliente web disponemos de la **consola de desarrollo** para correr JavaScript y probar nuestro codigo.

- console.log()
- console.warn()
- console.error()
- console.clear()

#### *NodeJS*

Cuando trabajamos en backend debemos tener instalado un runtime donde correr el codigo, en nuestro caso sera NodeJS. 

- NodeJS levantara un entorno completo para probar nuestro codigo
- Debe correrse desde un CLI para poder visualizar los avances del código


#### *Tipos de datos en Javascript*

Es el atributo que especifica la clase de dato que almacena la variable.

Especifica con qué estaremos trabajando, para que la computadora reconozca qué operaciones puede hacer con él.

**Tipos primitivos**: 
- String: cadenas de texto
- Boolean: verdadero o false
- Number: números
- Null: nulo
- Undefined: indefinido

**Tipo objeto**:
- Tipos predefinidos de Javascript: Date (fecha), RegExp (expresciones regulares), Error (datos de error)

- Tipos definidos por el programador: Funciones simples, clases

- Arrays: Serie de elementos o formacion tipo vector o matriz. Lo consideramos un objeto especial que carece de métodos

- Objetos especiales: Objeto global, objeto prototipo, otros

#### *Variables en Javascript*

Una variable es un espacio de memoria apartado para guardar un dato.

Una variable puede cambiar su valor si asi el programa lo necesita.

#### Actividad en clase

Definir variables que almacenen datos (nombre, edad, precio, nombres de series y películas), mostrar esos valores por consola, incrementar la edad en 1, una serie a la lista y volver a mostrarlas. Compartir la definición en el Visual Studio Code
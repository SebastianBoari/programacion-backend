// Clase 14: Arquitectura por capas, capas adicionales para nodejs, flujo de arquitectura, patrones de diseño, patrones en express, comunicacion front-back


// |-----------------------------------------------|


// Arquitectura de capas

// Arquitectura de capas
// La arquitectura de capas es un patrón de diseño que permite la separación de los módulos de una aplicación en diferentes capas, donde cada capa cumple un rol específico.

// Cada capa en esta arquitectura tiene una función particular dentro de la aplicación. Por ejemplo, en una capa de vistas se encargan de mostrar la interfaz al usuario sin realizar cálculos adicionales más allá de la renderización.

// La utilización de capas permite tener un mejor control y comprensión de la aplicación, facilitando la identificación de errores y la realización de modificaciones en puntos específicos.


// |-----------------------------------------------|


// Capas base

// En esta arquitectura, se requiere contar con tres capas base:

// 📁Capa de Modelo o Persistencia: Esta capa se encarga de establecer la conexión con el modelo de persistencia utilizado, ya sea en memoria, archivos o bases de datos. Su principal función es realizar las operaciones de CRUD (Crear, Leer, Actualizar, Eliminar) correspondientes a la persistencia.

// 🧑‍💼Capa de Controlador o Negocio: En esta capa se desarrolla la lógica de negocio de la aplicación. Aquí se llevan a cabo todas las operaciones necesarias para completar una función o acción específica. El controlador depende de la capa de persistencia para acceder y modificar los datos, utilizando una instancia de esta capa.

// 🪟Capa de Vista o Renderización: Esta capa se encarga de tomar los datos necesarios para ser renderizados en la interfaz. Es la capa más subjetiva, ya que la forma en que se realiza el renderizado puede variar según el enfoque del equipo de desarrollo. En algunos casos, la capa de renderizado puede acceder directamente a la capa de persistencia si su única función es mostrar la información correspondiente. También es posible utilizar aplicaciones externas para el renderizado, como React.

// Es importante destacar que en arquitecturas más complejas, se suele separar el renderizado interno y utilizar un front-end externo para manejar la complejidad del sistema.


// |-----------------------------------------------|


// Capas adicionales para Node.js

// En la arquitectura de capas en Node.js, se pueden incluir capas adicionales para mejorar la estructura y el flujo de la aplicación.

// Capa de routing

// La capa de routing contiene los archivos de tipo "router", los cuales se encargan de redireccionar las solicitudes hacia puntos específicos de la API. Esta capa está estrechamente relacionada con la capa de renderización cuando se utilizan motores de plantillas y un views router.

L// a capa de routing es fundamental para organizar y separar las rutas de las diferentes entidades de la aplicación. Sin esta capa, todas las rutas se encontrarían en un mismo archivo, lo que dificultaría la lectura y el mantenimiento del código.

// Capa de servicio

// La capa de servicio actúa como una capa intermedia entre el controlador y la capa de persistencia. Su función principal es proporcionar un "túnel" de conexión para que el controlador pueda acceder de manera estandarizada a la persistencia.

// Tener una capa de servicio evita que los accesos a la persistencia se realicen de manera descontrolada, con argumentos erróneos, etc. Además, esta capa es el lugar adecuado para aplicar el patrón repository.

// Es importante destacar que la capa de servicio no debe confundirse con la capa de negocio, ya que solo actúa como un punto intermedio de conexión.


// |-----------------------------------------------|


// 🟢🧑‍💻 ACTIVIDAD EN CLASE: Creación de un servidor por capas

// Levantar un servidor de express que contemple una juguetería

// Este sistema deberá poder gestionar (guardar/leer) juguetes y usuarios, contemplando los siguientes puntos:

// Una capa de ruteo
// Una capa de controlador

// No será necesario contemplar la capa de vistas, todo será probado con información plana. para la creación se utilizará Postman o Thunderclient


// |-----------------------------------------------|


// Flujo de interacción entre capas en un proyecto:

// En el flujo de interacción entre las capas de un proyecto, podemos seguir el recorrido desde que el cliente realiza una consulta al servidor hasta que se resuelve y envía la respuesta.

// 1- Capa de vista o renderizado: El cliente realiza una petición al servidor a través de una página web o una acción. Desde esta capa se hace un consumo para obtener los datos necesarios.

// 2- Capa de ruteo: La petición pasa por la capa de ruteo, donde se determina qué ruta corresponde a la acción solicitada por el cliente.

// 3- Capa de controlador: Cada ruta está asociada a un método o función en el controlador. El router redirige la petición al controlador correspondiente para realizar la operación requerida.

// 4- Capa de servicio: Para obtener los datos, el controlador se comunica con la capa de servicio, que actúa como intermediario entre el controlador y la capa de persistencia.

// 5- Capa de persistencia: El servicio de usuarios accede a la persistencia (memoria, archivos, base de datos) según lo establecido. La capa de persistencia obtiene los datos necesarios.

// 6- Retorno de datos y envío al cliente: Una vez que se obtienen los datos de la persistencia, el controlador los procesa y los envía al cliente como respuesta a la solicitud realizada.

// ❓Es importante destacar que el servicio considera una determinada persistencia, lo que plantea la pregunta: ¿Es posible cambiar la persistencia sin modificar el servicio?


// |-----------------------------------------------|


// Puntos clave para desarrollar un servidor

// Al desarrollar un servidor, es importante tener en cuenta los siguientes aspectos:

// Código reutilizable: Contar con funciones que puedan ser reutilizadas en diferentes partes del código mejora la legibilidad y evita repeticiones innecesarias.

// Pensar en código escalable: Considerar la escalabilidad del código desde el principio evita ajustes complejos en el futuro y facilita la incorporación de nuevos casos.

// Homologación de patrones de diseño: Acordar y documentar los patrones de diseño utilizados en el equipo de trabajo ayuda a mantener la coherencia y comprensión del código.

// Adoptar un modelo por capas: Mantener una estructura de código bien segmentada en capas evita mezclar responsabilidades y facilita el mantenimiento y escalabilidad del código.

// Manejo de entornos: Tener en cuenta los diferentes entornos (desarrollo, pruebas, producción) y adaptar las variables en consecuencia para evitar problemas y errores.

// Prácticas de testing: Adoptar prácticas de testing, como el TDD (Desarrollo Dirigido por Pruebas), garantiza un código más confiable y reduce los posibles errores en el despliegue.

// Loggear y documentar: Utilizar herramientas de registro (logging) y documentar adecuadamente el código mejora el control y la comprensión de la aplicación.


// |-----------------------------------------------|


// Patrones de diseño en Express.js

// Al trabajar en el desarrollo de soluciones, no siempre es necesario crear una solución desde cero. Podemos aprovechar los patrones de diseño, que son soluciones replicables para problemas comunes de desarrollo.

// Los patrones de diseño no son código predefinido, sino descripciones de cómo resolver un problema. Es responsabilidad del desarrollador implementarlos en la tecnología correspondiente.

// En Express.js, se reconocen varios patrones de diseño:

// Cadena de responsabilidades: Permite procesar una petición en varios objetos o funciones, agregando filtros y reenviando el objeto con las alteraciones correspondientes. En Express.js, esto se logra a través de middlewares, donde cada middleware puede procesar la petición antes de pasarla al siguiente.

// Decorador: Permite transformar un objeto a lo largo del flujo del proceso. En Express.js, esto se evidencia en el uso de middlewares que modifican el objeto request, agregando propiedades o transformándolo para su posterior uso.

// Proxy: Implica tener un sustituto que recibe una petición y controla el acceso a otro objeto. En Express.js, esto se aplica al crear un nuevo router y redirigir las peticiones a diferentes routers.


// |-----------------------------------------------|


// Patrón MVC (Modelo-Vista-Controlador)

// El patrón MVC es ampliamente utilizado en el desarrollo de aplicaciones web, incluyendo frameworks como Express.js. Proporciona una estructura organizada y separada en capas para facilitar el desarrollo y mantenimiento del código.

// Modelo: Representa la capa de persistencia de datos. Aquí se definen las estructuras de datos, la lógica de acceso a la base de datos y las operaciones CRUD (Crear, Leer, Actualizar, Eliminar). El modelo se encarga de almacenar y recuperar la información, sin preocuparse de cómo se muestra o interactúa con ella.

// Vista: Es la capa encargada de la presentación visual de los datos al usuario. Muestra la información proporcionada por el modelo de una manera comprensible y atractiva. En una aplicación web, la vista generalmente está compuesta por archivos HTML, CSS y plantillas de renderizado.

// Controlador: Actúa como intermediario entre el modelo y la vista. Responde a las interacciones del usuario y se encarga de procesar las solicitudes, realizar las operaciones necesarias en el modelo y enviar los resultados a la vista correspondiente. El controlador se encarga de la lógica del negocio y coordina la interacción entre el modelo y la vista.

// El patrón MVC permite una separación clara de responsabilidades y promueve la reutilización del código. Cada capa se puede desarrollar y modificar de forma independiente, lo que facilita el mantenimiento y la escalabilidad de la aplicación. Además, fomenta la legibilidad y el entendimiento del código, ya que cada componente cumple un propósito específico.

// Patrón Singleton

// El patrón Singleton es utilizado cuando se necesita garantizar que una clase tenga una única instancia en toda la aplicación. Esto puede ser útil en situaciones en las que se requiere un objeto global que sea accesible desde diferentes partes del código.

// En el contexto de Express.js, un caso común de uso del patrón Singleton es la gestión de conexiones a la base de datos. Al abrir una conexión a la base de datos, se puede utilizar el patrón Singleton para asegurarse de que solo exista una instancia de la clase que maneja la conexión. Esto evita la sobrecarga de crear múltiples conexiones y asegura la consistencia en el acceso a la base de datos.

// El patrón Singleton se implementa mediante una clase que tiene un constructor privado y un método estático para obtener la instancia única. Cuando se solicita la instancia, el patrón Singleton verifica si ya existe y, si es así, la devuelve. Si no existe, crea una nueva instancia y la retorna. De esta manera, se garantiza que siempre se utilice la misma instancia de la clase en toda la aplicación.


// |-----------------------------------------------|


// Comunicación entre Frontend y Backend

// En la comunicación entre el frontend y el backend, se utilizan diferentes enfoques de renderizado y se establece una comunicación mediante el intercambio de datos y headers.

// Server Side Rendering (SSR):
// En este enfoque, la lógica para generar las vistas se realiza en el servidor y se envían vistas completas al cliente. Esto reduce la necesidad de realizar cálculos complejos en el cliente, ahorrando recursos y tiempo de carga. Es útil para páginas minimalistas o estáticas.

// Client Side Rendering (CSR):
// En este modelo, la carga de la página y la solicitud de datos se realiza principalmente en el cliente. El cliente hace múltiples peticiones al servidor para obtener datos y actualizar la página dinámicamente. Es adecuado para sitios altamente dinámicos que no requieren recargar toda la página al realizar cambios.

// La comunicación entre el cliente y el servidor se realiza a través de headers y datos:

// Headers: Contienen información importante, como tokens de autorización, formato de envío de datos e identificadores de elementos que realizan la petición.

// Datos a enviar: El cliente puede enviar información a través de diferentes métodos, como headers, query params, route params y body, dependiendo de la API y el método de la petición.

// Es esencial comprender el origen de la petición, ya que el servidor debe reconocer si proviene de una fuente legítima. Si el origen es diferente al del servidor, se producirá un error, ya que no se aceptará un origen desconocido.


// |-----------------------------------------------|


// De forma nativa en express.js lo podemos solucionar con estas lineas de codigo:

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

// O podemos instalar cors con el comando:

// npm install cors

// Luego lo usamos como middleware:

app.use(cors());

// Si bien no es necesario instalar ninguna libreria para manejar los permisos de acceso al servidor cors es una libreria muy popular por facilitar muchisimo la configuracion. 

// Si no es necesario configurar mucho el acceso al servidor el profesor recomienda directamente hacerlo sin libreria.


// |-----------------------------------------------|
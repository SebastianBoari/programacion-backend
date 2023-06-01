// Clase 9: Cokies Session, Storage, Session Storage con Mongo Atlas, Primer LogIn

// |--------------------------------------------------------|

// 🧑‍💻La necesidad de conocer información del cliente
//  Dado que la forma de interactuar de cada cliente con nuestro sitio web suele ser diferente, surge la necesidad de contar con algún recurso para obtener información sobre ciertos detalles del comportamiento de un cliente. Una solución son las cookies.

// 🔎¿Qué es una cookie?
// Es un pequeño archivo de texto que se almacena dentro del navegador del cliente. Sirve como un ligero contenedor de información necesaria para poder procesar ciertas peticiones.

// Algunos de los datos que suelen guardarse en una cookie son:

// Nombres de usuarios.
// IDs de sesiones (lo veremos más adelante en la clase).
// Preferencias de navegación (modo oscuro/claro, idioma, región).


// |--------------------------------------------------------|


// ❓Diferencias entre localStorage/sessionStorage y las cookies

// Tanto localStorage/sessionStorage como las cookies son mecanismos de almacenamiento en el navegador con características y usos distintos.

// localStorage/sessionStorage son útiles para almacenar datos en el lado del cliente de manera persistente o temporal, y tienen un límite de tamaño más generoso.

// Por otro lado, las cookies se utilizan principalmente para mantener el estado de sesión y realizar un seguimiento del comportamiento del usuario. La elección entre ellos dependerá de las necesidades específicas de la aplicación y los requisitos de almacenamiento de datos.


// |--------------------------------------------------------|


// 🍪Rastros que suele dejar un usuario al navegar en la web

// Por ejemplo:

// Si el cliente inicia sesión, la cookie almacena el ID de la sesión.

// Si el cliente activa el modo oscuro, la cookie almacena las preferencias/configuración del sitio.

// Si el cliente busca productos específicos, la cookie almacena las búsquedas recientes.

// ⚠️IMPORTANTE⚠️
// Las cookies son fácilmente accesibles por múltiples elementos externos.
// Bajo ningún motivo debemos guardar información sensible en una cookie.
// Nunca almacenamos información de métodos de pago, contraseñas ni cualquier dato que pueda comprometer la seguridad del cliente.


// |--------------------------------------------------------|


// 🔎 Características de una cookie

// 👶Se les puede configurar un tiempo de vida, una vez finalizado el tiempo de vida, la cookie se autodestruye💥.

// 📁Espacio limitado, elegir de forma inteligente lo que se vaya a guardar.

// 🤐🔐Se pueden cifrar

// 🚫Prohibido guardar datos sensibles


// |--------------------------------------------------------|


// 🏁Comenzamos a utilizar cookies

// Para poder acceder a las cookies de nuestro navegador debemos ii al inspector, accedemos a "application"  y en la sección de "storage" encontraremos las "cookies".

// ↗️En la carpeta "ejemplo-cookie-nativa" muestro cómo podemos crear una cookie con document.cookie de forma nativa en JavaScript. Sin embargo se suele utilizar librerías que nos brindan una experiencia de desarrollo mucho más amigable, con mejores resultados y de forma más segura.


// ↗️"ejemplo-cookie-parser": En un proyecto express a los que estamos habituados haremos los siguientes pasos:

//  Instalamos cookie-parser:
// npm i cookie-parser

// 📝 Una cookie debe setearse dentro del flujo de vida de una petición, por lo tanto, llamaremos un endpoint llamado /setCookie donde utilizaremos el objeto res, para poder asignar una cookie al cliente en su navegador. 

// 📖 Para leer la cookie seteada, utilizaremos el objeto req en el endpoint /getCookies, ya que, como el cliente tiene la cookie en su navegador, deberá enviarla por dicho objeto. 

// 💥Además, llamaremos también un endpoint llamado /deleteCookie donde utilizaremos el objeto res, para poder limpiar la cookie asignada al cliente en su navegador. 


// |--------------------------------------------------------|


// 🔐Agregando seguridad a la cookie: Signed Cookies (Cookies Firmadas)

// ❓¿Qué es “firmar” una cookie?

//  Dado que las cookies se guardan en el navegador del cliente, pueden ser fácilmente alteradas. Para verificar si han sido alteradas, podemos firmarlas. Si la cookie es modificada, el servidor podría reconocerla como una cookie alterada y decidir no utilizarla.

// ↗️En "ejemplo-cookie-parser" podemos firmar las cookies de forma sencilla proporcionando un argumento de tipo string: "cookieParser('cookieSuperSecreta')".

// Para poder acceder a una signed cookie debemos acceder a req.signedCookies.
// Si tratamos de acceder a una cookie firmada que fue alterada al querer acceder a ella solo se devolverá un false. 


// |--------------------------------------------------------|


// 🟢🧑‍💻 ACTIVIDAD EN CLASE: Inyectar cookies en frontend

// Crear una única vista de frontend en nuestro servidro express, la cual contará, con dos campos input y dos botones

// El primer campo input deberá ser el nombre del cliente.

// El segundo campo input deberá contener el correo electrónico

// El botón getCookie debe enviar una petición de tipo GET para recibir la cookie, solo mostrar por consola la cookie.

// El botón submit, deberá enviar una petición POST, la cual deberá crear una cookie con el formato {user:correoDelInput}

// La cookie debe tener un tiempo de vida de 10 segundos. Corroborar que la cookie se borre después del tiempo indicado.


// |--------------------------------------------------------|


// 🔎 Sesiones
// Dándole identidad al cliente: sesiones

// ❓ ¿Y cuál es la diferencia con el almacenamiento local (local storage) o almacenamiento de sesión (session storage)?
// 💡Aunque tienen propósitos similares, existen diferencias clave entre ellos. Como mencionamos anteriormente, las cookies, aunque son muy útiles, tienen limitaciones en términos de capacidad de almacenamiento y pueden ser vulnerables a problemas de seguridad, como el robo de información personal.
// 💡 Una sesión es un mecanismo más seguro y robusto para almacenar información del usuario. Se basa en un identificador único, llamado ID de sesión, que se almacena en una cookie.

// ❓ ¿Qué tipo de información se suele guardar en los datos de una sesión?
// 💡 La información de la sesión puede incluir datos temporales, como el carrito de compras en línea o el estado de inicio de sesión.

// ❓ ¿Pero qué es una sesión exactamente?
// 💡 La conexión sin estado es una característica importante de nuestra API REST. Esto significa que el servidor responde a las solicitudes del cliente sin tener en cuenta el contexto previo.

// ❓ ¿Y cómo sabe el servidor quién es el usuario que realiza una petición?
// 💡 El servidor debe obtener/consultar la identidad del cliente en cada petición. Actualmente, esta información se envía desde el front-end a través de queries, params, body y cookies. Sin embargo, podemos mejorar esto implementando un sistema de sesiones.

// ❓ ¿Qué podemos lograr con un sistema de sesiones?
// 💡 Este sistema permitirá que el servidor almacene información sobre el cliente para mantenerlo identificado durante sus peticiones. Una vez que el cliente inicia sesión, podemos procesar esa información y ofrecer respuestas personalizadas de acuerdo con su rol en la página.


// |--------------------------------------------------------|


// 🔎Almacenamiento de información del cliente con el módulo Session en Node.js

// El módulo Session nos permite almacenar información del cliente en el servidor, y podemos acceder a ella a través del elemento req.session.

// Algunas características de la sesión son las siguientes:

// 🟢La información que deseamos guardar en la sesión se almacena en el servidor.

// 🟢En el lado del cliente, se crea un identificador único para acceder a esa información desde el navegador.

// 🟢Los datos almacenados en la sesión se eliminan cuando se cierra la ventana del navegador.

// 🟢La sesión se utiliza principalmente para guardar los datos del usuario al iniciar sesión.


// |--------------------------------------------------------|


// ↗️ "ejemplo-session": Implementando nuestro primer sistema de sesiones


// |--------------------------------------------------------|


// 🟢🧑‍💻 ACTIVIDAD EN CLASE: Sesiones de usuario en el server

// Realizar un programa de backend que establezca sesiones de usuarios en el servidor.

// Cuando un cliente visita el sitio por primera vez en la ruta 'root', se presentará el mensaje de “Te damos la bienvenida”. 

// Con los siguientes request de ese mismo usuario, deberá aparecer el número de visitas efectuadas. El cliente podrá ingresar por query params el nombre, en cuyo caso se añadirá a los mensajes devuelto.

// Por ejemplo: “Bienvenido Juan” o “Juan visitaste la página 3 veces”. Ese nombre, solo se almacenará la primera vez que el cliente visite el sitio.


// |--------------------------------------------------------|


// 🔎Storage

// ❓Una sesión es el vínculo que se establece cuando un cliente se conecta a un servidor. Esta conexión se representa mediante una sessionId, que se guarda en el navegador del cliente como identificador de la sesión. Pero, ¿dónde se guarda la sesión en el servidor?

// 📁Memory Storage

// 🔎El almacenamiento de una sesión en memoria es similar a la persistencia en memoria que vimos en clases anteriores. Como pudimos ver en clases anteriores esto es peligroso porque si se reinicia el servidor las sesiones se van a perder.

// ❓¿Cómo solucionar el problema del almacenamiento en memoria?
// 💡Utilizaremos el almacenamiento en archivos, es decir, guardaremos nuestras sesiones en un archivo para poder acceder a ellas desde una ubicación diferente a la memoria del servidor.


// 📁File Storage

// 🔎El almacenamiento en archivos permitirá que las sesiones persistan, de modo que el servidor pueda acceder a ellas en caso de reinicios o caídas. De esta manera, los usuarios podrán seguir realizando consultas con sus sessionid y el servidor podrá acceder a ellas desde el archivo que se mantiene.

// ⚠️Si bien esta solución es simple y tiene sus limitaciones, es una forma sencilla de resolver el problema de las sesiones sin depender de recursos externos.


// Con File Storage:
// Si reiniciamos el servidor, la sesión se mantendrá guardada durante el tiempo especificado.
// Si la sesion expira, el servidor creará un nuevo archivo para la consulta, con un nuevo sessionId.
// Los archivos antiguos no se eliminan automáticamente, lo cual puede causar problemas en el futuro.


// |--------------------------------------------------------|


// 🔎Session Storage con Mongo Atlas

// 💡Si FileSystem presenta problemas, ¿podríamos solucionarlos utilizando bases de datos, como lo hicimos con nuestros carritos y productos? La respuesta es si.

// 💡Session puede trabajar en conjunto con MongoDB y Mongo Atlas para guardar sesiones en una base de datos. Esto proporcionará una gestión más eficiente de las sesiones y permitirá la eliminación automática de sesiones expiradas.


// |--------------------------------------------------------|


// 🟢🧑‍💻 ACTIVIDAD EN CLASE: Pruebas de sesiones

// ↗️ Actividad resuelta en "ejemplo-session-mongo-atlas"

// Con base en un servidor de express

// Desarrollar un sistema de storage para Mongo en Atlas y realizar pruebas siguientes:

// Coloca el ttl = 15. Analiza el comportamiento de la sesión si hago peticiones constantes al endpoint de login. Revisa el tiempo de expiración.

// Retira el ttl de la configuración y genera una nueva sesión. Analiza el tiempo de expiración que se genera por default


// |--------------------------------------------------------|


// 🟢🧑‍💻 ACTIVIDAD EN CLASE: Reajustando autorización

// Con base en el proyecto realizado en el Hands on lab:

// Cambiar la validación de rutas por middlewares de rutas públicas o privadas. 

// Las rutas públicas deben regresar siempre a la pantalla de login en caso de que no se reconozca una session activa.

// Las rutas privadas deben regresar siempre a la pantalla de profile en caso de que haya una sesión activa en session.

// Realizar un botón “logout” en la vista de perfil, que permita destruir la sesión y redireccionar a la vista de login.


// |--------------------------------------------------------|
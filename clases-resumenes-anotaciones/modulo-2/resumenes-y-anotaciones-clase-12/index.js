// Clase 12: Passport Avanzado & Ruteo avanzado y estrategias avanzadas de autorización


// |------------------------------------------------------|


// JWT

// JsonWebToken es un estándar para la creación de tokens de acceso utilizados en la autenticación y autorización de aplicaciones web.


// El flujo de trabajo con JWT se puede resumir en los siguientes pasos:

// 1️⃣ El servidor crea y firma digitalmente un token JWT que contiene la información del usuario.

// 2️⃣ El servidor envía el token JWT al cliente como respuesta a una solicitud de autenticación exitosa.

// 3️⃣ El cliente almacena el token JWT en el navegador

// 4️⃣ El cliente incluye el token JWT en cada consulta que haga al servidor.

// 5️⃣ El servidor verifica la firma del token JWT para asegurarse de su autenticidad y, si es válido, extrae la información del usuario del token.

// ⚠️ IMPORTANTE: en JWT no se encripta ni se desencripta en el servidor. En cambio, se firma digitalmente utilizando una clave secreta o una clave pública/privada, lo que permite al servidor verificar la integridad del token y extraer la información del usuario sin necesidad de acceder a una base de datos o almacenamiento adicional.


// 🎉Ventajas contra session

// La principal ventaja de JSON Web Tokens (JWT) en comparación con las sesiones tradicionales es la capacidad de ser un mecanismo stateless (sin estado). A continuación, se detallan algunas de las ventajas clave de JWT:

// 1. Sin necesidad de almacenamiento en el servidor: En las sesiones tradicionales, el servidor necesita mantener un registro de cada sesión activa y sus datos asociados. Esto puede requerir almacenamiento adicional y puede ser un desafío para aplicaciones de gran escala. En cambio, JWT almacena toda la información necesaria en el propio token, lo que permite que el servidor sea stateless y no requiera almacenar información adicional.

// 2. Escalabilidad y rendimiento: Debido a que no se requiere almacenamiento en el servidor, las aplicaciones que utilizan JWT pueden escalar fácilmente distribuyendo las solicitudes en varios servidores. No hay necesidad de sincronizar o compartir información de sesión entre servidores, lo que mejora el rendimiento y la escalabilidad de la aplicación.

// 3. Independencia del servidor: JWT permite que el servidor de autenticación y el servidor de recursos sean independientes. El servidor de autenticación emite un token firmado, y el servidor de recursos puede verificar la validez del token utilizando una clave de firma compartida o pública. Esto permite que los sistemas distribuidos y los servicios web sean más flexibles y se comuniquen de manera segura.

// 4. Facilidad de integración con APIs y servicios web: JWT se ha convertido en un estándar popular para la autenticación y autorización en aplicaciones web y servicios API. Debido a su simplicidad y portabilidad, JWT es fácil de integrar con diferentes lenguajes de programación y marcos de desarrollo.


// |--------------------------------------------------------|


// 📩Formas de envio de JWT

// Envío desde headers de autorización 

// Una manera de implementar JWT es utilizando el Local Storage. 

// El local storage se utilizaria para guardar el token generado en el navegador del cliente

// Cuando el cliente haga una consulta debera enviarnos en e header del fetch un header llamado "Authorization" donde nos enviara el token

// Una convencion muy popular es la de anteponer la palabra "Bearer" antes del token

// Ejemplo de un header que envia al servidor el token de auth
// Authorization : “Bearer asLKcU132zccllfxzl34.asLKcU132zccllfxzl34.asLKcU132zccllfxzl34”


// |--------------------------------------------------------|


// Vulnerabilidad en LocalStorage: no es del todo seguro

// Utilizar JWT y almacenar el token en la memoria del navegaodr puede prestarse a ataques maliciosos. La mayor amenaza a considerar es un ataque de tipo XSS (Cross Site Scripting) donde se puede inyectar script malicioso a la informacion, con el fin de tomar informacion sensible.

// Una de tantas soluciones suele ser el crear una conexion entre nuestro front y nuestro back a partir de un header personalizado sin embargo podemos evitar el uso de soluciones como estas  si optamos  guardar nuestro JWT desde una cookie para el cliente.

// Enviar token desde cookie

// El cliente enviará sus credenciales para su proceso de autenticación

// En vez de responder con el token la consulta, respondemos con un mensaje de exito y guardamos el token en una cookie 

res.cookie("coderCookieToken", token, {
    maxAge: 60*60*1000
}).send({ message: "Logged In" })

// Aun sin responder directamente con el token y guardandolo en una cookie es posible acceder al token desde el lado del cliente 

// Por ello, no permitiremos que nuestra cookie pueda ser accedida por medio de código ajeno a una petición. Se configura entonces la cookie para que sólo exista en el proceso de la petición HTTP

res.cookie("coderCookieToken", token, {
    maxAge: 60*60*1000,
    httpOnly: true
}).send({ message: "Logged In" })


// |--------------------------------------------------------|


// 🧑‍💻🟢 ACTIVIDAD EN CLASE: Jwt desde cookie


// Desarrollar un sistema sencillo de express

// Colocar una vista en public (No utilizar motores de plantillas), dicha vista contará con dos campos: correo y contraseña, deberá además mandar a llamar un servicio de login que devuelva el token por medio de una cookie como lo visto en el ejemplo

// No colocar el httpOnly. Intenta el proceso de login y setea la cookie en el navegador. Después, hacer un console.log simple en el archivo js con el comando document.cookie, corroborar que se muestre en la consola del navegador la cookie asociada a tu token. ¡Peligroso!

// Limpiar esta cookie y colocar el httpOnly en la configuración, repite el proceso del primer punto y corrobora si la cookie aparece en la consola.


// |--------------------------------------------------------|


// Passport y JWT

// Como vimos en la clase anterior passport nos presenta varias estrategias de autentificacion y autorizacion de usuarios. 

// Passport nos ofrece una estrategia con JWT la misma se configura como ya aprendimos en la clase anterior

// Instalamos passport e instalamos la estrategia

// npm i passport passport-jwt

// La estrategia de jwt permitirá obtener el token, descifrarlo, verificarlo y parsearlo en el usuario que corresponda a ese token. 


// ⚠️ Nociones Importantes:

// Como vimos hace un momento el cliente nos puede enviar el token de JWT a traves del body, a traves de los headers o bien de una cookie. Necesitamos saber a través de que método nos va a estar enviando el token el cliente.

// Passport no controla las cookies por si solo. Ocupara una funcion personalizada por nosotros para extraer la cookie.

// Utilizaremos cookie-parser

// Si se configura correctamente la estrategia, passport contendrá el usuario ya parseado a partir de un campo jwt_payload.


// |--------------------------------------------------------|


// Control interno de mensajes y sistema de roles con passport

// Como gestionar un error en passport? 

// En muchas ocaciones necesitamos obtener informacion mas especifica sobre la informacion que estamos tratando de obtener. Un status 401 significa unauthorized, mas no sabemos realmente por que esta ocurriendo dicho error.

// Si enviamos un token adulterado vamos a obtener el error "Unauthorized". Si no enviamos token vamos a obtener el mismo error, si el token expiro tambien vamos a recibir el mismo mensajes. Ves el problema? Nos falta informacion sobre el error.

// Cuando desarrollamos es crucial tener un registro claro de la razon del error, por lo que necesitamos encontrar un a forma de saber las razones por las cuales ocurre dicho codigo 401


// |--------------------------------------------------------|


// PARTE 2 🟢

// Routeo Avanzado y manejo de politicas de autorizacion

// Hasta este momento hemos podido relacionarnos ya con el router en cuanto a:

// Su URL
// Sus Middlewares
// Su callback

// Sin embargo, conforme el proyecto crece, notaremos que algunos conceptos son aplicados de una manera un tanto diferente a lo que vimos en clases previas

// En esta clase abordaremos algunos conceptos y tecnicas necesarias para profesionalizar el uso de router y poder encontrar soluciones optimas para problemas del mundo real.


// |--------------------------------------------------------|


// Restringiendo parametros

// No todos los parametros son buenos: imagina que tienes un router que es un diccionario. El mismo recibe una palabra por url param y devuelve el significado de la misma. Por ejemplo:

app.get("api/dictionary/:word", async(req, res) => {

});


// Esto indica que la ruta debe recibir una palabra pero el cliente puede enviarnos una palabra en mayusculas "GATO", un numero 123123 o una cadena mixta "asdad13123a" y esto puede generar errores.

// Cual es el problema de los errores? Que el servidor tuvo que procesar la peticion y responder con el error y eso tiene un costo de computo. 


// |--------------------------------------------------------|


// Como recibir solo lo que esperamos? 

// Primero que nada... que esperamos? En este caso solo esperamos una cadena de texto que solo contenga caracteres de a la z.

// Luego existen multiples tecnicas para poder abordar esta situacion. Primero, bajo este ejemplo, podemos separar la logica de nuestro dictionary en un router propio. Y posteriormente aplicar una expresion regular que permita tomar solo la ruta indicada

import { Router } from "express";

const router = Router();

// La expresion regular [a-zA-Z]+ significa que solo podra reconocer valores alfabeticos
router.get("/:word([a-zA-Z]+)", async (req, res) => {
    res.send(req.params.word);
});


// Al utilizar expresiones regulares en un parametro dicho parametro puede ser tomado solo si se cumple con lo que la expresion regular representa.

// Como hispanoparlantes sabemos que los caracteres con tilde son de uso comun, por lo tanto para este ejemplo de una api de un diccionario deberiamos tener en cuenta que es muy importante que se incluyan los caracteres especiales que se utilizan en nuestro idioma


// |--------------------------------------------------------|


// Que hacer con todas las rutas que no coinciden con ningun endpoint?

// Para los casos donde la palabra no cumpla con la expresión regular indicada, podemos indicar un get * a nivel router para indicar que no se está cumpliendo con la ruta. 

router.get("*", async (req, res) => {
    res.status(404).send("Cannot get the specified word");
});


// |--------------------------------------------------------|


// Validando parametros

// El método router.param es utilizado para validar y procesar parámetros en las rutas de un router.

// Permite definir un middleware específico que se ejecuta cada vez que se encuentra un determinado parámetro en una ruta, lo que evita tener que repetir la misma lógica de validación y procesamiento en múltiples endpoints.

// En el escenario de tener un router que va creciendo con múltiples endpoints relacionados con palabras de un diccionario. En estos endpoints, se necesita realizar una operación común que implica obtener el parámetro word, buscarlo en una base de datos para validar su existencia en el sistema de persistencia, y luego continuar con la operación deseada.

// Para evitar repetir esta lógica de validación en cada endpoint que utiliza el parámetro word, se puede utilizar router.param. Este método permite definir un middleware que se ejecutará cuando se encuentre el parámetro word en una ruta.

// Este middleware se ejecuta después de los middlewares principales y tiene la función principal de generalizar las operaciones relacionadas con ese parámetro.

// Ej: router.param("paramName", callback);


// |--------------------------------------------------------|


// 🟢🧑‍💻ACTIVIDAD EN CLASE: Router de mascotas

// Desarrollar un sistema sencillo de express

// Crear un router para manejo de mascotas en una ruta base ‘/api/pets’, éste gestionará diferentes mascotas en un arreglo como persistencia. Posteriormente, desarrollar los siguientes endpoints:

// POST (‘/’): deberá insertar una nueva mascota. El formato de cada mascota será {name:String, specie: String}

// GET(‘/:pet’): Deberá traer la mascota con el nombre indicado. Utilizar una expresión regular para que sólo se puedan recibir letras e incluso espacios (recuerda cómo se lee un espacio a nivel URL). No debe permitir números.

// PUT (‘/:pet’): Deberá traer la mascota y añadirle un campo “adopted:true” a dicha mascota en caso de existir. 

// Generar además un router.param que permita acceder de manera directa a la mascota, colocándola en req.pet


// |--------------------------------------------------------|


// Creando un CUSTOM ROUTER

// ¿Por qué crear un router personalizado?

// A medida que nuestra aplicación y equipo de desarrollo crecen, es fundamental tener implementaciones normalizadas y adaptadas a las necesidades de nuestra empresa. Aunque ya existen routers en Express, a menudo enfrentamos limitaciones en cuanto a la escalabilidad y la limpieza de nuestro código.

// Ventajas de un router personalizado

// 1- Respuestas sistematizadas: ¿Cómo le explicarías a un nuevo desarrollador el formato específico que debe utilizar para cada operación? Al personalizar el router, podemos crear "respuestas predefinidas" en el objeto 'res', lo que permite que el equipo las utilice sin preocuparse de cometer errores en el formato. Podemos abstraer el uso habitual de 'res.send()' y reemplazarlo por respuestas más intuitivas, como 'res.sendSuccessMessage', 'res.sendError', 'res.sendSuccessPayload', etc.

// 2- Gestión interna de middlewares: Al usar 'app.use(middleware)', aplicamos el mismo middleware a todos nuestros endpoints. Sin embargo, ¿qué sucede si necesitamos que cada endpoint tenga un middleware con una entrada dinámica? En ese caso, debemos crear middlewares a nivel de router y agregar explícitamente sus entradas a los endpoints correspondientes. Personalizar el router nos permite dinamizar el middleware generalizado como si fuera un parámetro adicional para cada endpoint.

// Custom responses

// Una forma limpia y escalable de trabajar en equipo en el desarrollo backend es mantener un formato específico para todas las respuestas, evitando que el frontend tenga que lidiar con diferentes formatos de respuesta.

// Establecer una respuesta personalizada implica definir respuestas predefinidas para que los desarrolladores solo necesiten llamarlas y completar los datos requeridos.

// Utilizaremos un middleware interno del router para crear y asociar estas respuestas, el cual estará vinculado no solo a una ruta, sino también a los métodos get, post, put y delete del router.

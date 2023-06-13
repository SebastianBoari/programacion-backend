// Clase 11: Autorización y autenticación & Estrategia de autenticación por terceros + JWT. Concepto de autenticación por terceros. Autenticación para Github y JWT.


// |-------------------------------------------------|


// 🔎Autenticación y Autorización

// Hemos observado que es muy común la necesidad de identificar a un usuario para que pueda acceder a un recurso. El primer paso en la interacción entre el cliente y el servidor es la AUTENTICACIÓN.

// Para que un cliente pueda autenticarse, debe existir un registro previo almacenado en algún lugar.
// El cliente envía un identificador (por ejemplo, un correo electrónico) y el servidor lo busca.
// Si el identificador existe, el servidor responde con las credenciales completas.
// Si no existe ningún registro del identificador, el servidor no encontrará las credenciales y no se realizará la autenticación.


// |-------------------------------------------------|


// 🔎 Métodos de autenticación

// Usuario y contraseña: Método tradicional y más utilizado. El usuario ingresa un correo electrónico o nombre de usuario junto con una contraseña para autenticarse.

// Sin contraseña (passwordless): Cada vez que deseemos iniciar sesión, se nos enviará un enlace al correo electrónico que nos permitirá acceder.

// Redes sociales: Consiste en utilizar las credenciales de otra aplicación (como las redes sociales) para autenticarse.

// Datos biométricos: Autentica a los usuarios utilizando huellas dactilares e identificación facial.

// JWT (JSON Web Token): Este método de código abierto permite la transmisión segura de datos entre las diferentes partes. Comúnmente se utiliza para la autorización, utilizando un par de claves que consta de una clave privada y una clave pública.

// OAuth 2.0: Permite que el usuario se autentique y acceda a los recursos del sistema que necesita mediante una API.


// |-------------------------------------------------|


// 🪪🔐Autorización

// Una vez que el usuario está identificado, autenticado y posee sus credenciales, aún tiene limitaciones para acceder a ciertos recursos. Esto se logra a través de la autorización.

// Debemos tener conjuntos de servicios jerarquizados para:

// - 👥Usuarios comunes (Por ejemplo: Empleados)
// - 👨‍💼Usuarios premium (Por ejemplo: Jefes)
// - 🧑‍💻⚙️Administradores (Por ejemplo: Administrador)


// ⚠️Las respuestas del servidor en cada caso deben tener códigos de estado diferentes:

// - ❌Para procesos fallidos de autenticación: 401
// - 🔐Para usuarios rechazados al intentar acceder a un recurso no autorizado: 403

// Los códigos de estado no son intercambiables. Nunca los uses de manera superficial.


// |-------------------------------------------------|


// Dijimos que entre las opciones que tenemos para registrar y autenticar usuarios, tenemos varios métodos como usuario y contraseña, sin contraseña, credenciales de terceros, datos biométricos, JWT y OAuth 2.0.

// En clases anteriores intentamos implementar el clásico método de usuario y contraseña, pero el problema es que estábamos almacenando las contraseñas en texto plano en nuestra base de datos, lo cual no es seguro.

// Lo correcto es aplicar un proceso de hash a las contraseñas, de manera que en caso de una posible filtración de datos o ataque al servidor, no se obtenga información sensible de los usuarios. Además, es éticamente incorrecto tener acceso a esa información.


// |-------------------------------------------------|


// ↗️ejemplo-bcrypt

// 🔐Utilizaremos bcrypt.

// El uso de bcrypt para el hash de contraseñas es una buena práctica, pero no es la única opción disponible. Hay otras bibliotecas y métodos que también se pueden utilizar con seguridad.

// npm i bcrypt

// Antes usabamos algo asi: body.password == user.password.  

// Si una contraseña hasheada no puede ser revertida ni siquiera por nosotros mismos ¿Cómo sabremos si el cliente se loguea correctamente?

// bcrypt tiene un proceso de comparación de passwords a partir de su función compare.


// Configuramos bcrypt: 
// En nuestro archivo utils.js importamos bcrypt

// funcion hashSync:
//hashSync toma el password que pasemos y procedera a aplicar un proceso de hasheo a partir de un "salt"

// funcion genSaltSync:
//genSaltSync generara un salt de 10 caracteres. Un salt es un string random que hace que el proceo de hasheo se realice de manera impredecible
// Retorna un string con el password hasheado.

// funcion compareSync:
// compareSync tomara primero el password sin hashear y lo comparara con el password hasheado en la base de datos.
// Retorna true o false dependiendo si el password coincide o no


// |-------------------------------------------------|


// 🧑‍💻🟢 ACTIVIDAD EN CLASE: Restauración de contraseña

// A partir del sistema de login de la clase anterior, se implementará:

// Un link desde la vista de login que diga “Restaurar contraseña”, el cual llevará a una nueva vista. 

// Esta nueva vista de restauración solicitará dos campos: el correo electrónico y la nueva contraseña a cambiar. 

// NO REQUERIREMOS VERIFICACIÓN DE CORREO, esto lo haremos más adelante, solo indicaremos el correo y se deberá sustituir el password.

// El nuevo password deberá estar Hasheado también.

// Reintentar el login y corroborar que el usuario se pueda loguear correctamente.


// |-------------------------------------------------|


// Estrategias de autenticación: 🪪Passport

// Es poco habitual, en el ambiente profesional, realizar toda la estrategia de autenticación del usuario desde 0 como estuvimos haciendo con bcrypt. Por lo general se trabaja con librerias de autenticacion como passportjs.

// Passport nos ofrece trabajar con todas las formas de autentificacion posibles (Usuario y contraseña, passwordless, credenciales de terceros,datos biométricos, JWT y OAuth 2.0) de forma simple, estructurada y altamente configurable.


// |-------------------------------------------------|


// ↗️ejemplo-passport

// Primero debemos instalar passport y la estrategia que vamos a utilizar. Como vamos a utilizar la estrategia local (usuario y contraseña) ingresamos en la terminal lo siguiente:

// npm i passport passport-local

// Podes ver todas las estrategias disponibles a traves de la pagina de passportjs: https://www.passportjs.org/

// En la carpeta raiz de nuestro proyecto deberemos crear un archivo de configuracion para passport. Lo llamaremos passport.config.js

// En el mismo importaremos los modulos instalados y las funciones de bcrypt para hashear la contraseña y el modelo de mongoose del usuario.

// 🔎Conceptos clave de Passport:

// Passport local siempre requiere dos elementos: nombre de usuario (username) y contraseña (password). Si Passport no encuentra alguno de estos dos elementos, devolverá un error y no permitirá continuar con la estrategia.

// Podemos personalizar el campo "nombre de usuario" para que tome el campo que deseemos utilizar como identificador. En nuestro caso, estamos interesados en el correo electrónico, por lo que podemos cambiarlo usando {usernameField: 'valor'}.

// ⚠️Passport utiliza un callback llamado "done", que se resuelve de la siguiente manera:

// ✅ El primer parámetro de "done" es el error. Si pasamos done(null), indicamos que no hay error.

// ✅ El segundo parámetro debe ser el usuario generado. Para devolver un usuario, usamos done(null, user).

// ✅ Si pasamos done(null, false), indicamos que no hay error, pero el usuario no estará disponible.

// Cada estrategia que queramos configurar en Passport es un middleware por sí misma. Utilizaremos el método passport.use() para configurar diferentes middlewares/estrategias.


// ❓Y... cambio en algo?

// Si hicimos las cosas correctamente, no notaremos ningún cambio. El registro se habrá realizado exactamente igual a la primera implementación realizada. No hicimos esta reestructura para obtener algún resultado nuevo

// La razón de implementar estas estrategias es dejar la lógica de autenticación y autorización a passport para que todo se encuentre controlado en una capa interna. 

// En futuras aplicaciones tuyas o de tu empresa tendrás que autenticar a tus usuarios de MUCHAS formas, así que mejor controlar todas estas estrategias en un módulo específico para ello. 


// |-------------------------------------------------|


// 🔎 Autenticación por terceros

// 🔐🧑‍💻 El registro en sitios web puede ser un obstáculo para los usuarios.

// ✅ La autenticación por terceros permite a los usuarios acceder rápidamente a un sitio web utilizando sus datos de registro en otra aplicación.

// 👨‍💼 Esta estrategia se basa en plataformas populares en las que los usuarios ya están registrados.

// ⚙️ Para implementar la autenticación por terceros, es necesario formar parte de la red interna de desarrollo de la aplicación y cumplir con sus requisitos.

// 🔧 Es importante comprender y seguir adecuadamente las documentaciones y configuraciones de los sitios externos utilizados para la autenticación por terceros.


// |-------------------------------------------------|


// Pasos generales:

// 1- Me registro como developer de app del sitio y creo un aplicacion interna

// 2- Configuro el servidor donde utilizare dicha aplicacion

// 3- Configuro callback utilizable para mi servidor


// |-------------------------------------------------|


// Conceptos básicos de autenticación de terceros (usando GitHub como ejemplo):

// 1. Necesitas tener una aplicación privada en el sitio web correspondiente (puede ser Facebook, Twitter, GitHub, etc.).

// 2. El sitio web te pedirá una URL de Callback. Es muy importante que esta URL coincida con la configuración del router en tu aplicación. Para cada estrategia, tu router debe tener dos rutas:
// Ruta inicial: Esta ruta llama al middleware de Passport y activa la redirección.
// Ruta de Callback: Aquí es donde llega la información del usuario final proporcionada por Passport.

// 3. Selecciona los datos que necesitas para crear el perfil de usuario. Un sitio web externo no almacena los datos de la misma manera que tú, así que es posible que no encuentres todos los datos que necesitas en tu base de datos.

// 4. Si el perfil del usuario está configurado como privado, no obtendrás información y no podrás utilizar este método de autenticación. Esto sucede en sitios como Facebook, GitHub, etc.

// 5. Si tienes problemas para ver tu perfil de GitHub en el código cuando lo ejecutas, asegúrate de que tu cuenta de GitHub esté configurada como pública.


// |-------------------------------------------------|


// Que es un URL de callback?

// Una URL de callback es una dirección web a la que el sitio web de autenticación de terceros redirige al usuario después de que este haya completado el proceso de inicio de sesión. Es la forma en que el sitio web devuelve los datos del usuario autenticado a tu aplicación.

// Cuando configuras la autenticación de terceros en tu aplicación, debes proporcionar una URL de callback al sitio web correspondiente. Esta URL debe ser específica de tu aplicación y estar configurada en tu router para que tu aplicación pueda manejar la respuesta del sitio web de autenticación.

// Cuando el usuario inicia sesión correctamente en el sitio web de autenticación de terceros, se le redirige automáticamente a la URL de callback que hayas especificado. En esta URL, tu aplicación puede recibir los datos del usuario autenticado y llevar a cabo las acciones necesarias, como crear una sesión para el usuario en tu aplicación.


// |-------------------------------------------------|


// 🧑‍💻Check list:

// ✅ El botón redireccionó al login de Github.

// ✅ Github extrae los datos del usuario y se los devuelve a passport.

// ✅ Tomamos los datos que necesitamos de ese usuario y los guardamos según nuestro propio formado del schema de mongoose.

// ✅ Devolvemos a ese usuario a nuestro callback. 

// ✅ El callback agrega al usuario al objeto de session.

// ✅ ¡Tenemos un usuario nuevo gracias a Github! 🎉


// |-------------------------------------------------|


// 🔎Un panorama distinto a session: JWT

// JWT es una implementación sin estado que mantiene el ciclo de vida de la sesión de un usuario sin almacenamiento adicional.

// Su funcionamiento difiere de las sesiones convencionales de la siguiente manera:

// El servidor genera un token con los datos del usuario y lo envía al navegador, que lo almacena y lo incluye en cada solicitud mediante los encabezados.

//  Cuando el servidor recibe las solicitudes, busca el token JWT en los encabezados. Si lo encuentra, procede; de lo contrario, se requiere una nueva autenticación.


// |-------------------------------------------------|


// ⚠️El almacenamiento de sesiones en el servidor o en una base de datos puede generar problemas.

// 📁Almacenar grandes cantidades de usuarios puede ser complicado en términos de almacenamiento, y acceder a la base de datos para cada consulta de sesión puede afectar el rendimiento y requerir particiones adicionales.

// 👨‍💼JWT delega la responsabilidad al cliente, lo que aligera la carga en el servidor. 

// 🏁El servidor otorga un token de acceso al cliente, quien lo almacena en una cookie en el navegador. De esta manera, el cliente envía las credenciales de la sesión al servidor de forma stateless. El servidor solo necesita descifrar el token para acceder a las credenciales del usuario, lo que mejora su agilidad.


// |-------------------------------------------------|


// Aplicacion sencilla utilizando JWT

// ↗️ejemplo-jwt

// Primero debemos instalar la dependencia:

// npm i jsonwebtoken

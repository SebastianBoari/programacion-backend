// CLASE 13: Skills, practica integradora, proceso principal del servidor + global & child process


// |---------------------------------------------------|


// La primer parte de la clase se va a dedicar a realizar un proyecto de integracion donde se van a poner en practica todas las skills vistas hasta el momento en el curso:

// MONGO AVANZADO

// COmprender el uso de una referencia por ObjectId

// Saber definir referencias en un schema de mongoose

// Comprender el uso de populations

// Aplicar una population en mongoose entre dos esquemas como una referencia

// Comprender la necesidad de la utilizacion de paginaciones

// Aplicar paginaciones en consultas con mongoose-paginatev2


// COOKIES

// Entender el funcionamiento de una cookie

// Saber setear una cookie

// Saber configurar el tiempo de vida de una cookie

// Saber limpiar una cookie

// Comprender la conexion de una cookie con JWT


// AUTENTICACION Y AUTORIZACION

// Comprender la logica de registro de un usuario

// Comprender el concepto de autenticacion y la logica de login de un usuario

// Comprender la diferencia entre autenticacion y autorizacion

// Construir middlewares de autorizacion y control de codigos de estado 401 y 403

// Manejo de politicas


// PASSPORT

// Comprender el uso de una estrategia

// Comprender la logica de una estrategia local y sus configuraciones

// Comprender la logica de una estrategia por terceros y sus configuraciones

// Comprender la logica de una estrategia de tokenizacion y su configuracion.


// JWT: JsonWebToken

// Comprender la diferencia entre una sesion y una tokenizacion

// Firmar informacion en un token

// Guardar tokens en cookies HTTP- Only

// Utilizar passport-JWT


// |---------------------------------------------------|


// Process

// ¿Qué es process?

// Es un objeto que se crea cuando ejecutamos un programa en nodejs. Tiene información sobre:

// La memoria que usa el programa

// El identificador del programa en el sistema operativo

// El tipo de sistema operativo o plataforma donde se ejecuta

// El tipo de entorno donde se ejecuta

// Los argumentos que tiene el entorno


// |---------------------------------------------------|

s
// Algunos elementos importantes de process:

// Directorio actual del proceso:
process.cwd()

// ID del proceso en el sistema:
process.pid

// Evuelve un objeto que describe el uso de memoria en bytes del proceso Node.js:
process.MemoryUsage()

// Accede al objeto del entorno actual:
process.env

// Muestra los argumentos pasados por CLI:
process.argv

// Muestra la version del proceso
process.version

// Permite setear un listener de eventos 
process.on()

// Permite salir del proceso
process.exit()


// |---------------------------------------------------|


// Manejo de argumentos: Argumentos en consola

// Los argumentos permiten iniciar la ejecucion de un programa a partir de ciertos elementos iniciales. Con argumentos podemos: 

// Setear configuraciones de arranque

// Agregar valores predeterminados

// Resolver outputs especificos

// Podemos acceder a los argumentos a partir de process.argv

// 💡 Por defecto process.argv viene con 2 argumentos


// |---------------------------------------------------|


// Commander

// Commander es una libreria que nos permite manejar argumentos eso que vimos de forma nativa en nodejs (process.argv) pero de una forma mas facil.

// Convertir flagas directamente en booleanos

// Limitar solo las flags configuradas (Cualquier otra impide el proceamiento del programa)

// Colocar argumentos predeterminados

// Se instala con el siguiente comando

// npm i commander


// |---------------------------------------------------|


// Manejo de Variables de entorno

// Hasta este punto hemos estado trabajando sin variables de entorno. Algo que es muy habitual en el ambito profesional es contar con variables de entorno, por que?

// Las variables de entorno nos sirven para ocultar informacion sensible y para que los valores de las variables cambien en base a si estamos en produccion o estamos en etapa de desarrollo

// Por ejemplo la MONGO_URI en un entorno de produccion va a tener la URL con la contraseña del servicio de MONGO ATLAS que la empresa esta pagando por ese serivicio. Algo que no tenemos que publicar ni ser visible para nadie ajeno al desarrollo de la aplicacion

// En cambio en modo desarrollo la MONGO_URI puede apuntar a una base de datos local para hacer pruebas 


// |---------------------------------------------------|


// Utilizando dotenv

// Existe una libreria muy utilizada en nodejs llamada dotenv

// En C# con .NET o en Java con SpringBoot ya vienen soluciones propuestas por el framework pero en nodejs no hay una propuesta por defecto pero dotenv es la libreria mas popular para realizar esto mismo.

// El archivo es un .env en donde la sintaxis es muy simple

// NOMBRE=VALOR

// Sin commillas ni nada mas que tener en cuenta

// Se instala con el comando:

// npm i dotenv


// |---------------------------------------------------|


// Múltiples entornos

// En el mundo laboral como dijimos tenemos distintas etapas por las que pasan las aplicaciones y para cada etapa necesitamos unas variables de entornos u otras.

// Trabajar con multiples entornos solo significa una cosa: Multiples archivos .env


// |---------------------------------------------------|


// Para esta clase subiremos los archivos al repositorio remoto pero tener en cuenta que a la hora de realizar nuestros desarrollos deberemos agregar los archivos .env en nuestro .gitignore y no subirlos al repositorio remoto.


// |---------------------------------------------------|


// Continuando con process... GLOBAL & CHILD PROCESS

// Ademas de las funcionalidades que hemos visto de process tenemos otra mas para trabajar: el metodo on.

// Permitira poner nuestro proceso principal a la escucha de algun evento para poder ejecutar alguna accion en caso de que un evento ocurra

// Los listeners mas utilizados son:

// on "exit": Ejecuta un codigo justo antes de la finalizacion del proceso

// on "uncaughtException": Atrapa cualquier excepcion que no se haya capturado en un catch dentro del codigo

// on "message": para poder comunicarse con otro proceso

// Ejemplo:
process.on("uncaughtException", exception => {
    console.log("Este codigo atrapa el error, por ejemplo llamar una funcion que no este declarada");
});

// Códigos de salida de process

// Cuando ejecutamos una salida con process.exit() como argumento, podemos enviar un código que sirve como identificador para el desarrollador sobre la razón de la salida

// Hay que conocer los códigos de salida para saber cómo utilizarlos. También podemos crear nuestros propios códigos.

// Algunos de los códigos importantes son:

// 0 : proceso finalizado normalmente.

// 1 : proceso finalizado por excepción fatal

// 5 : Error fatal del motor V8. 

// 9 : Para argumentos inválidos al momento de la ejecución.


// |---------------------------------------------------|


// CHILD PROCESS

// Hasta el momento si un endpoint realiza una operacion demasiada complicada como lectura de archivos enormes, consultas a bases de datos muy complejas, etc... nuestro servidor bloqueara todos los endpoints hasta terminar de responder la consulta que requiere de esa operacion complicada. 

// Para esos casos hay muchisimas soluciones y muchisimas mas profesionales que la que vamos a ver hoy pero hoy vamos a empezar con una solucion simple.

// Un proceso de nodejs que crea otro proceso para que haga la consulta complicada asi no bloquea las otras consultas.

// Como crear un child process?

// Existen 4 operadores para que un proceso de nodejs pueda ejecutar otro proceso.

// En esta clase aprenderemos sobre el metodo fork(). Sin embargo, recomendamos que investigues e indagues los diferentes metodos

// spawn(), execFile(), exec() y fork()

// Cada uno tiene su contexto y aplicacion para cada caso.


// |---------------------------------------------------|


// 🟢🧑‍💻ACTIVIDAD EN CLASE: Calculo bloqueante con contador (Resuelto en ejemplo-child-process-fork)

// Realizar un servidor en express que contenga una ruta raíz '/' donde se represente la cantidad de visitas totales a este endpoint

// Se implementará otra ruta '/calculo-bloq', que permita realizar una suma incremental de los números del 0 al 100000 con el siguiente algoritmo.

// Comprobar que al alcanzar esta ruta en una pestaña del navegador, el proceso queda en espera del resultado. Constatar que durante dicha espera, la ruta de visitas no responde hasta terminar este proceso.

// Luego crear la ruta '/calculo-nobloq' que hará dicho cálculo forkeando el algoritmo en un child_process, comprobando ahora que el request a esta ruta no bloquee la ruta de visitas. 


// |---------------------------------------------------|

// FIN
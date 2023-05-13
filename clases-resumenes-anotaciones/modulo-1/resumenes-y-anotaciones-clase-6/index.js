// CLASE 6: Websockets, Sockets en Express con Socket.io, desarrollo de chat con websockets, deploy de nuestra primera aplicacion con glitch.com


// |------------------------------------------------------------|


// 💡Websocket
// Es un protocolo de comunicación basado en TCP para poder establecer una conexión entre cliente y el servidor. Es el mismo objetivo que cubre HTTP.


// |------------------------------------------------------------|


// ⚠️ TCP ( Transmission Control Protocol) es un protocolo de red utilizado para establecer Y MANTENER comunicación entre dos dispositivos.
// Funciona de la siguiente manera:

// 1- El cliente envía una solicitud al servidor a través de una conexión TCP establecida previamente.

// 2- El servidor recibe y procesa la solicitud, generando una respuesta.

// 3- El servidor envía la respuesta al cliente a través de la misma conexión TCP.

// 4- El cliente recibe y procesa la respuesta.

// 5- La conexión TCP se cierra cuando la comunicación ha terminado.

// Durante todo el proceso, TCP garantiza la entrega confiable y ordenada de los datos, detectando y corrigiendo cualquier pérdida o corrupción de datos. Además, TCP también se encarga de garantizar la seguridad y privacidad de la comunicación.


// |------------------------------------------------------------|


// 💡 Que hace websocket diferente?

// Su protocolo TCP, establece dos endpoints de comunicación (socket). El contar con estos dos sockets permite establecer comunicación bidireccional cliente/servidor.
// Esto significa que:
// El cliente solicita info cuando lo requiera (como en HTTP)
// El servidor puede entregar informacion al cliente sin que el cliente realice petición.


// |------------------------------------------------------------|


// ❓ Pero que problematica resuelve?

// Hoy en día es relativamente normal encontrar sitios de compra y venta que integren la función de subastas pero al principio era todo un problema. 

// ACTUALIZAR INFORMACION EN TIEMPO REAL.

// Se imaginan 100 personas pujando por un producto y refrescando su navegador segundo a segundo para poder ver las pujas de los otros participantes de la subasta? Que tan consistente será la información? Que tan eficiente es refrescar la página cada vez que quiera ver la informacion actualizada?


// |------------------------------------------------------------|


// 💡Primer intento: HTTP Polling

// HTTP Polling es una técnica en la que el cliente envía una solicitud HTTP al servidor en intervalos regulares para obtener actualizaciones de información. El servidor responde a cada solicitud con la información actualizada, aunque no haya habido cambios en los datos.

// El mayor problema de esta técnica: Muy costosa en términos de recursos. Al estar realizando constantes consultas incluso cuando no hubo cambios en los datos, el servidor sigue teniendo que procesar y responder a cada solicitud llevando a una sobrecarga de solicitudesm que afectan el rendimiento y la latencia del servidor 


// 💡Segundo Intento: HTTP Long Polling

// En HTTP Long Polling, el cliente envía una solicitud HTTP al servidor y el servidor no responde inmediatamente. En su lugar, el servidor mantiene la conexión abierta y espera hasta que tenga nuevos datos para enviar al cliente o hasta que expire un tiempo límite.

// Cuando el servidor tiene nuevos datos, responde a la solicitud del cliente con los datos actualizados. Si no hay nuevos datos antes de que expire el tiempo límite, el servidor envía una respuesta vacía al cliente y cierra la conexión. En este caso, el cliente envía inmediatamente una nueva solicitud al servidor para comenzar el proceso de nuevo.

// La problemaica de los recursos se habia solucionado parcialmente pero el tiempo límite debía ser ajustado cuidadosamente para equilibrar la latencia y la sobrecarga del servidor. Además era posible la pérdida de datos si se producía una desconexión entre el cliente y el servidor.


// 💡Solución Optima: Websocket

// WebSocket es un protocolo de comunicación bidireccional en tiempo real que permite una conexión continua entre el cliente y el servidor. En lugar de enviar solicitudes HTTP repetitivas, WebSocket mantiene una conexión abierta y permite el envío de datos entre el cliente y el servidor en ambos sentidos de manera eficiente.

// WebSocket soluciona los problemas que presentan HTTP Polling y HTTP Long Polling, ya que permite una comunicación bidireccional en tiempo real más eficiente y reduce la sobrecarga del servidor y la latencia. Además, WebSocket también proporciona una capa adicional de seguridad y cifrado para garantizar la privacidad de los datos.

// WebSocket se ha convertido en una solución ampliamente utilizada para la comunicación en tiempo real entre el cliente y el servidor en la web, y es compatible con la mayoría de los navegadores web modernos y plataformas de desarrollo web. Sin embargo, en algunos casos, como en sistemas altamente escalables o de alta disponibilidad, pueden ser necesarias soluciones personalizadas basadas en TCP.


// |------------------------------------------------------------|


// ❓Cómo funciona Websocket?

// Primero el cliente envia una solicitud HTTP llamada HANDSHAKE (apretón de manos). Esta petición es un "acuerdo" o "contrato" para que el servidor pueda actualizar al cliente sin que éste se lo pida.

// Cuando el cliente envía el Handshake el servidor "responde al saludo" y a esto se le llama "Abrir conexión".

// A partir de ese punto el canal queda abierto de manera bidireccional. 

// La comunicación es "persistente" hasta que alguno de los dos lados decida cerrar el canal.


// |------------------------------------------------------------|


// ⚠️ Ejemplos de uso de Websockets:

// Chats
// Paneles de noticias
// Actualización de bolsa
// Juegos en tiempo real
// Plataformas de compra/venta (subastas)


// |------------------------------------------------------------|


// 💡Sockets en Express con Socket.io

// Es una biblioteca de JavaScript para poder implementar los sockets anteriormente mencionados.

// Debido al funcionamiento que hemos visto en clase socket.io debe instanciarse tanto del lado del cliente como del servidor.

// Caracteristicas:

// Fiabilidad: Las conexiones se establecen incluso en presencia de:
    // Proxies y balanceadores de carga. 
    // firewall personal y software antivirus

// Soporte de reconexión automática: A menos que se le indique lo contrario, un cliente desconectado intentará siempre volver a conectarse, hasta que el servidor vuelva a estar disponible.

// Detección de desconexión: Se implementa un mecanismo de heartbeat, lo que permite que tanto el servidor como el cliente sepan cuando el otro ya no responde.

//Soporte binario:  Se puede emitir cualquier estructura de datos serializable, que incluye:
    // ArrayBuffer y Blob en el navegador
    // ArrayBuffer y Buffer en Node.js


// |------------------------------------------------------------|


// 🟢🧑‍💻 ACTIVIDAD EN CLASE: Servidor con Websockets

// Sobre el proyecto de websocket que venimos desarrollando:

// Basado en el ejercicio que venimos realizando, ahora los mensajes enviados por los clientes deberán ser almacenados en el servidor y reflejados por debajo del elemento de entrada de texto cada vez que el usuario haga un envío.

// La estructura de almacenamiento será un array de objetos, donde cada objeto tendrá la siguiente estructura:
// { socketid: (el socket.id del que envió el mensaje), mensaje: (texto enviado)}

// Cada cliente que se conecte recibirá la lista de mensajes completa.

// Modificar el elemento de entrada en el cliente para que disponga de un botón de envío de mensaje.

// Cada mensaje de cliente se representará en un renglón aparte, anteponiendo el socket id.


// |------------------------------------------------------------|


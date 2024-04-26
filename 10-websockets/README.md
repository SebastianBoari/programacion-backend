# Websockets

Temario:

- Websockets
- Sockets en Express con Socket.io


Websocket es un protocolo de comunicación basado en TCP para poder establecer esa conexión entre el cliente y el servidor, justo como sabemos, es el mismo objetivo que cubre HTTP.


## ¿Qué hace que websocket se destaque?

Su protocolo TCP establece dos endpoints de comunicación, a cada endpoint se le conoce como socket. 

El contar con estos dos sockets permitirá establecer una comunicación bidireccional entre el cliente y el servidor.

- El cliente puede obtener recursos del servidor cuando lo solicite (al igual que en HTTP).

- El servidor puede entregar información al cliente sin necesidad de que el cliente haga una petición.

## Caso práctico: sistema de subastas en línea.

En un sistema de subastas necesitaríamos actualizar constantemente la información.

Si algo cambia en el servidor debemos enviarle esa información a todos los clientes.

Si alguien puja un precio mas alto, el resto de participantes deben ser rápidamente notificados de la puja.

Con HTTP tendríamos que estar refrescando la página como locos para poder refrescar los datos a menos que...


## Primer intento: Polling

El cliente hace solicitudes periódicas al servidor para obtener datos. Por ejemplo, cada 30 segundos, el cliente consulta al servidor para ver si hay nueva información disponible.

No tardaron en aparecer sus puntos débiles como que las solicitudes al ser un intervalo regular se dependía exclusivamente de la carga adicional que el servidor podría soportar para lograr el efecto de en "tiempo real".

## Segundo intento: Long Polling

El HTTP Long polling consiste en que el cliente vuelva a hacer una petición tan pronto como reciba una respuesta del servidor, es decir, bombardea al servidor constantemente de peticiones para emular respuestas “en tiempo real”

Aunque este método era mejor que el anterior en consumo recursos seguía siendo un problema y seguía siendo un tanto lento para considerarse "tiempo real" a medida que creciera la cantidad de usuarios en simultaneo.

## Solución óptima: Websockets

*Websockets es un protocolo excelente para esta situación ya que:*

- El cliente no tendrá que estar actualizando la página constantemente

- En cuanto el servidor reciba una actualización de una nueva puja, actualizará a todos los clientes conectados, permitiendo dar información en tiempo real.

- Una vez que termina la subasta, el socket se cierra y el servidor deja de notificar innecesariamente al cliente. 


## ¿Cómo funciona Websocket?

Primero, el cliente tiene que enviar una solicitud HTTP llamada Handshake (apretón de manos). Este apretón de manos será un “acuerdo” o “contrato” de confianza para que el servidor pueda actualizar al cliente sin que éste se lo pida. 

*El servidor recibe la petición de Handshake y procede a “responderle el saludo”, a esto se le llama “Abrir conexión”.*

A partir de este punto, el canal queda abierto de manera bidireccional, por lo que el cliente se puede comunicar con el servidor cuando quiera y viceversa. 

*La comunicación es “persistente” hasta que alguno de los dos lados decida cerrar el canal de comunicación.*

## Sockets en Express con Socket.io

- **Sencillez**: Nos permite implementar websockets en el servidor y el cliente.

- **Reconexión automática**: Hará que el cliente siempre esté intentando conectarse en caso de una caída del servidor.

- **Fiabilidad**: Incluye proxies, balanceadores de carga, firewall personal y software antivirus.

- **Detección de desconexión**: Se implementa un mecanismo de heartbeat, lo que permite que tanto el servidor como el cliente sepan cuando el otro ya no responde.

- **Soporte binario**: Se puede emitir cualquier estructura de datos serializable

## Instalación y configuración de Socket.io


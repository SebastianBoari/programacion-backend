# Aplicación chat con websocket

Temario:

- Desarrollo de chat con websockets
- Deploy de nuestra primera aplicación con Glitch

## Aplicación chat con websocket 

### Descargo:
*Debido a que ya he hecho aplicaciones similares de prueba he decidido hacer una mejor y mas completa en 00-actividad-en-clase*

Como aprendimos la clase pasada, las aplicaciones de websocket son bastante amplias. Una de las mejores formas de comprender su aplicación, es realizando un chat comunitario. 

Nuestro chat comunitario contará con:

- Una vista que cuente con un formulario para poder identificarse. El usuario podrá elegir el nombre de usuario con el cual aparecerá en el chat. 

- Un cuadro de input sobre el cual el usuario podrá escribir el mensaje.

- Un panel donde todos los usuarios conectados podrán visualizar los mensajes en tiempo real

- Una vez desarrollada esta aplicación, subiremos nuestro código a glitch.com, para que todos puedan utilizarlo.


## Actividad en clase(00-actividad-en-clase)

**Chat websocket ampliado**

Con base en el servidor con chat de websocket que se ha desarrollado. Crear nuevos eventos para que:

- Cuando el usuario se autentique correctamente, el servidor le mande los logs de todo el chat.

- Cuando el usuario se autentique correctamente, todos los demás usuarios (menos el que se acaba de registrar) reciban una notificación indicando qué usuario se acaba de conectar. (utiliza Swal toast).



## Deploy en Glitch

- Hacer “Deploy” de nuestra aplicación, significa que ésta pueda estar accesible para el uso general de todos los usuarios que tengan acceso al link donde resida nuestro servidor.

- Actualmente nuestra aplicación vive en localhost, que, como indica el nombre, es sólo local, sólo para mí.

- Una vez que nuestra aplicación haya sido desplegada, vivirá en la nube y podremos compartirla a quien nosotros queramos. 

- Glitch.com es una plataforma para hacer deploy de nuestras aplicaciones. 

- Glitch.com se basa en el concepto de tratar de hacer cada vez más sencilla la experiencia de hacer deploy de una aplicación. 

- Si bien no es lo más recomendado para deploys profesionales, nos servirá para entender el concepto y aplicarlo en nuestro chat.

- Podemos conectarlo a nuestro repositorio de Github.


1. Tener el codigo en un repositorio público de Github/Gitlab

2. Crear una cuenta en Glitch.com

3. Crear un nuevo proyecto a partir de Github
# Administrador de Paquetes - NPM

Temario: 

- NodeJS
- Módulos nativos
- NPM
- Instalaciones globales y locales

**Archivo:** Secuencia de información que permite ser almacenada en algún disco resolviendo persistencia en memoria.

**Persistencia en memoria:** modelo de almacenamiento que sólo persiste a lo largo del programa, si el programa termina o se reinicia, la información se pierde. Usualmente son arrays y objetos.

**Persistencia de archivos:** Modelo de almacenamiento utilizando archivos a partir de un FileSystem, previendo la perdida de información al reiniciar un programa.

**fs:** Abreviación para "fileSystem", que es el modulo interno de Node.JS para trabajar con archivos.

**Sufijo Sync:** Se utiliza al frente de las operaciones de fs para indicar que el proceso sera síncrono y, por lo tanto, bloqueante.

**fs.promises:** Se utiliza para indicar que las operaciones de archivos deben realizarse como una promesa y, por lo tanto, no bloqueantes. Se trabajan con async/await o con .then y .catch.


### Nuestra herramienta de trabajo: NodeJS

NodeJS no es solo un modula mas o una libreria para trabajar. Sino que es un entorno de desarrollo completo sobre el cual viven y se ejecutan nuestros programas de javascript.

### NodeJS

Cuenta con el mismo motor V8 de Google Chrome, el cual permite convertir el código javascript a código maquina para poder ser procesado correctamente.

Ademas, cuenta con muchas funcionalidades internas del mismo lenguaje javascript gracias a a sus ajustes con ECMAScript.


### El poder de NodeJS en backend

Node js fue pensado de manera primaria para backend, lo cual significa que su desarrollo se basó pensando en éste en primera instancia. Su sistema de desarrollo basado en eventos, le permite al desarrollador construir aplicaciones ligeras, rápidas e incluso en tiempo real.

Esto sin obviar que el soporte de esta maravilla tecnológica se basa en utilizar y procesar Javascript, el cual cuenta con una infinidad de funciones y estructuras que permiten resolver diferentes problemas día con día. 

### Actividad en Clase (00-actividad-en-clase)

- Crear un proyecto de node que genere 10000 números aleatorios en un rango de 1 a 20.

- Crear un objeto cuyas claves sean los números salidos y el valor asociado a cada clave será la cantidad de veces que salió dicho número. Representar por consola los resultados.

#### Módulos nativos en NodeJS


Conforme necesitemos realizar operaciones mas complejas necesitaremos herramientas mas útiles.

Desde que instalamos NodeJS en nuestro computador, contamos ya con una serie de módulos nativos.

Ejemplos:

- filesystem: modulo utilizado para manejo de archivos.

- crypto: encriptación y cifrado de información sensible

- http: crear servidor básico bajo el protocolo http

- path: correcto manejo de rutas


### Hands on Lab

¿Cómo lo hacemos? Se creará una clase “UserManager” que permitirá guardar usuarios en un archivo. El usuario se recibirá con una contraseña en string plano, y se deberá guardar la contraseña hasheada con crypto. Utilizar los módulos nativos  fs y crypto.

 El manager debe contar con los siguientes métodos:

El método “Crear usuario” debe recibir un objeto con los campos:

    - Nombre
    - Apellido
    - Nombre de usuario
    - Contraseña

El método debe guardar un usuario en un archivo “Usuarios.json”, recordando que la contraseña debe estar hasheada por seguridad

El método “Validar Usuario” recibirá el nombre de usuario que quiero validar, seguido de la contraseña,  debe poder leer el json previamente generado con el arreglo de usuarios y hacer la comparación de contraseñas, Si coinciden el usuario y la contraseña, devolver un mensaje “Logueado”, caso contrario indicar error si el usuario no existe, o si la contraseña no coincide.


### Manejando módulos de terceros: NPM

NPM se refiere a las siglas "Node Package Manager", el cual refiere aun manejador de paquetes.

Los desarrolladores pueden crear sus propios módulos, subirlos a la nube y compartirlos con otros desarrolladores.

Los módulos/paquetes de código descargados en nuestro proyecto se detallan en el archivo package.json.

**Que es el package.josn?**

Es un archivo que generamos dentro de nuestros proyectos, el cual contiene información del mismo como:

- El nombre del proyecto
- La version de tu proyecto
- Scripts para correr el proyecto
- Lista de módulos instalados en el proyecto

**Dependencias**

En el apartado "dependencies" se van a reflejar todas las dependencias/modulos/paquetes de terceros que instalemos en nuestro proyecto junto al detalle de la version instalada.

### Instalaciones globales y locales

Al instalar con el comando "npm i nombre_del_paquete" o en su defecto "npm install nombre_del_paquete" se instalará por defecto de forma local. 

Esto significa que el modulo/paquete sólo va a estar disponible para el proyecto en cual se instala

En cambio si anteponemos el flag "-g" de esta manera: "npm install -g nombre_del_modulo" podemos indicarle a npm que queremos tener el modulo disponible para todos los proyectos que realicemos para evitarnos la necesidad de instalarlo individualmente. 

Se recomienda instalar de manera global módulos o paquetes de uso general que utilices mucho en todos tus proyectos. Además hay que tener cuidado ya que cuando uno instala de forma global instala una version y puede quedar obsoleta en un tiempo.

### Versionado de dependencias

Las dependencias de terceros, como nuestros proyectos, van cambiando de version a traves del tiempo.

v2.1.4 

**Major version (version mayor - primer dígito)**: Hace referencia a grandes cambios, tanto que ya no son compatibles con otras versiones anteriores.

**Minor version (version menor - segundo dígito)**: Hace referencia a cambios en ciertas características y funcionalidades que no afectan a versiones anteriores, es decir podemos actualizar sin  afectar nuestro proyecto.

**Patches (parches - ultimo dígito)**: Hace referencia a arreglos de bugs, arreglo de defectos en el código. No se esta cambiando nada estructuralmente hablando, simplemente arreglos.


### Operadores para actualizar versiones:

En nuestro package.json podemos colocar operadores que permitan tener un mejor control de versiones.

El operador ^ le indica a npm que puede actualizar a la ultima minor version (version menor) disponible.

El operador ~ le indica a npm que solo puede actualizar parches.

**npm outdated**: Es un comando que leerá las dependencias instaladas en nuestro package.json y, según el operador que hayamos colocado, nos indicará qué es lo que nos “conviene”. También nos indica cuál es la última versión encontrada en internet, en caso de que nos interese

Luego utilizaremos el comando **npm update** el cual se encargará de  realizar los cambios que indicamos.

### Actividad en clase - Calculadora de Edad

Realizar un programa que utilice la  dependencia momentjs  (deberá instalarse por npm install).

- Debe contar con una variable que almacene la fecha actual (utilizar moment())

- Debe contar con una variable que almacene sólo la fecha de tu nacimiento (utilizar moment).

- Validar con un if que la variable contenga una fecha válida (utilizar el método isValid());

- Finalmente, mostrar por consola cuántos días han pasado desde que naciste hasta el día de hoy. (utilizar el método diff()

- Extra: Cambia tu moment a la versión 1.6.0, al no ser la misma versión mayor, nota el cambio al correr el programa.





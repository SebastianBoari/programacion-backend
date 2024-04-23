# Manejo de archivos en Javascript

**Temario:**

- Archivos sincronos
- Manejo de archivos
- File System
- Promesas

**Repaso:**

**Función definida:** funcion que se declara con un nombre desde el inicio. Usualmente se usan para tareas especificas y no suelen reasignarse.

**Funcion anonima:** Funcion que se declara sin tener un nombre, si no que se asigna a una variable desde el inicio. Se suele utilizar para reasignaciones o para callbacks.

**Callback:** Bloque de codigo que encapsula una o mas instrucciones, para ser utilizadas en cualquier otro momento del programa.

**Promesa:** Operacion asincrona que tiene dos canales de salida: resolverse o rechazarse. Permiten mejor control que los callbacks.

**Operacion sincrona:** Operacion bloqueante en la cual, una tarea no puede comenzar hasta que haya finalizado la otra tarea.

**Operacion asincrona:** Operacion no bloqueante en la cual se pueden iniciar multiples tareas independientemente de que no hayan finalizado las tareas previas.

### Sincronismo

Las operaciones sincronicas o bloqueantes, nos sirven cuando necesitamos que las operaciones se ejecutan una detrás de otra, es decir, se utiliza cuando deseamos que las tareas sean secuenciales, independientemente del tiempo que demore cada operación.

### Asincronismo

Las operaciones asincronas o no bloqueantes nos sirven cuando necesitamos que haya multiples tareas ejecutandose, sin tener que esperar las tareas que ya no estan ejecutando. usalas cuando necesites hacer alguna operacion, sin afectar al flujo principal.

### setTimeoute

setTimeout se utiliza para establecer un temporizador que ejecute una tarea después de un determinado tiempo. Permite entender en un par de líneas la idea del asincronismo.

A diferencia de una operación síncrona, podremos notar como setTimeout inicia su ejecución, y una vez que haya transcrurrido el tiempo, veremos el resultado, aun cuando el resto de las operaciones hayan terminado.


### setInterval

setInterval funciona como setTimeout, la diferencia radica en que éste reiniciará el conteo y ejecutará la tarea nuevamente cada vez que se cumpla dicho intervalo de tiempo.

Un timer devuelve un apagador el cual permite detener el intervalo cuando se cumpla cierta operación.

Suele utilizarse mucho para poner tiempos límites en alguna página para llenar formularios. Hay ciertas páginas que te dan tiempo límite para hacer la operación.

### Manejo de archivos

*El problema: persistencia en memoria*

Hasta el momento has trabajado con persistencia en memoria la cual nos limita mucho ya que una vez finalizada la ejecución del programa perdemos toda la información.

La primer solución al problema de persistencia en memoria fue guardar información en archivos.

### Node.js filesystem

Node.js nos ofrece un módulo por defecto para crear, leer, actualizar o eliminar un archivo. El cual se llama filesystem.

Cabe destacar que como programador te vas a topar con un monton de estas soluciones para no tener que manipular o crear el medio para hacer algo sin tener que hacer todo nosotros desde 0.

### FileSystem síncrono

El uso de fs de manera síncrona es bastante sencillo. Hay muchas operaciones para trabajar con archivos, pero sólo abarcaremos las principales.

**writeFileSync:** Para escribir contenido en un archivo. Si no existe lo crea. Si existe lo sobreescribe.

**readFileSync:** Obtener el contenido de un archivo.

**appendFileSync:** Para añadir contenido a un archivo. No sobreescribe archivos existentes.

**unlinkSync:** Eliminar un archivo.

**existsSync:** Corrobora que un archivo exista.

### FileSystem con callbacks

Muy similar a las operaciones síncronas. Sólo que al final recibirán un último argumento que debe ser un callback.

Respeta las convenciones de callbacks, el primer argumento suele ser un error.

Solo readFile maneja un segundo argumento con el resultado de la lectura del archivo.

El manejo por callbacks es totalmente asíncrono, así que cuidad dónde lo usas.

**writeFile:** Para escribir contenido en un archivo. Si no existe lo crea. Si existe lo sobreescribe.

**readFile:** Obtener el contenido de un archivo.

**appendFile:** Para añadir contenido a un archivo. No sobreescribe archivos existentes.

**unlink:** Eliminar un archivo.

**access:** Corrobora que un archivo exista.


### FileSystem utilizando promesas

Ya sabemos trabajar con archivos, ya vimos cómo trabajarlos de manera asíncrona, ahora viene el punto más valioso: trabajar con archivos de manera asíncrona, con promesas. 
Esto lo haremos con si propiedad fs.promises.

Podremos manipular los resultados con then y catch o bien con async/await

**fs.promises.writeFile:** Escribir archivo, si no existe lo crea.

**fs.promises.readFile:** Obtener contenido de un archivo.

**fs.promises.appendFile:** Añadir contenido a un archivo. No sobreescribe.

**fs.promises.unlink:** Eliminar el archivo.


### Manejo de datos complejos con fs.promise

Hasta el momento trabajamos con archivos de texto plano .txt, que va a pasar cuando queramos guardar contenido de una variable como objetos o un array?

Los archivos con los que solemos trabar para almacenamiento son los archivos tipo JSON.

Para poder trabajar con este tipo de archivos javascript nos ofrece JSON.stringify() el cual convierte un objeto javascriot en una cadena JSON y JSON.parse() el cual convierte el JSON en un objeto javascript.

### Ventajas y desventajas de utilizar archivos

- Son excelentes para empezar a aprender persistencia.
- Tienen soporte nativo de Node.js sin hacer instalaciones.
-  Es muy facil de manipular 

- Conforme la inforacion crece se vuelve lento ya que para modificar una sola cosa necesitamos leer yodo el archivo.
- Al realizar una modificacion se debe reescribir completamente el archivo.
- Vulnerable a ataques o a perder informacion
# Programación sincrónica y asincrónica

Temario: 

- Funciones en Javascript
- Callbacks
- Promesas
- Sincronismo vs Asincronismo


### Funciones en Javascript

Recordemos que las funciones son bloques de código que pueden ser llamados en diferentes momentos de la ejecución de nuestro programa.

Pueden tener identificador al declararse, o ser anónimas. Además, estas son reasignables.

- ¿Por qué querríamos reasignar una función?

- ¿Por qué querríamos utilizar una función sin definirla primero?


### Callbacks

Un callback es una función como cualquier otra, la diferencia está en que ésta se pasa como parámetro (argumento) para poder ser utilizado por otra función.

Permite que las funciones ejecutan operaciones adicionales dentro de sí mismas.

Lo hacemos porque no siempre sabemos qué queremos que se ejecute en cada caso de la función.

Algunos ejemplos donde se utiliza callbacks son:

- Método onClick
- Método forEach
- Método map
- Método filter


### Algunas convenciones

- El callback siempre es el último parámetro.

- El callback suele ser una función que recibe dos parámetros.

- La función llama al callback al terminar de ejecutar todas sus operaciones.

- Si la operación fue exitosa, la función llamará al callback pasando null como primer parámetro y si generó algún resultado este se pasará como segundo parámetro.

- Si la operación resultó en un error, la función llamará al callback pasando el error obtenido como primer parámetro.


Ejemplo de convenciones

![Imgur](https://i.imgur.com/mvNbmY2.png)

Desde el lado del callback, estas funciones deberán saber cómo manejar los parámetros. Por eso muy a menudo nos encontramos con esta estructura.

### Callbacks anidados

En algún momento el mundo laboral te exige hacer más que sólo una suma o una resta. Nos encontramos con procesos que requieren operaciones de más pasos. 

Si nosotros trabajamos con callbacks, podemos encadenar un conjunto de operaciones secuenciales.

Así, un callback puede llamar a otro callback, y este puede llamar a otro callback, y este a otro

![Imgur](https://i.imgur.com/C5qmxxq.png)

### Importante

Mientras más callbacks  vamos anidando (según el tamaño del proceso) vamos formando una pirámide horizontal en nuestro código, a esto se le conoce como CALLBACK HELL o también conocida como Pyramid of Doom.

No es aconsejable anidar tantos callbacks ya que es  poco legible y es considerado mala práctica.

### Promesas

Es un objeto especial que nos permitirá encapsular una operación, la cual reaccionará a dos posibles situaciones dentro de una promesa.

- La promesa se cumple
- La promesa no se cumple

Una promesa funciona muy similar al mundo real. Al prometerse algo, es una promesa en estado pendiente (pending), no sabemos cuándo se resolverá esa promesa.

Cuando llega el momento, se nos notifica si la promesa se cumplió (fulfilled o resolved) o si no se pudo cumplir (rejected)

### Utilizando promesas

Ahora que entendimos que hay dos formas de resolver una promesa (Resolved/Fulfilled o Rejected), debemos aprender cómo utilizar estos dos estados.

- Ejecutaremos la función que acabamos de crear para que se ejecute la promesa.

- Utilizaremos el operador .then para recibir el caso en el que la promesa si se haya cumplido.

- Utilizaremos el operador .catch para recibir el caso en el que la promesa no se haya cumplido.


## Sincronismo vs Asincronismo

### Sincronismo

Cuando comenzamos a programar se enseña que las instrucciones se ejecutaban en casada, es decir, que la tarea 1 debía finalizar para que puedar comenzar la ejecución de la tarea 2 y asi sucesivamente. 

En este principio reposa el concepto de programacion sincronica.

Cabe aclarar que las operaciones síncronas son bloqueantes, esto significa que las otras tareas no pueden comenzar a ejecutarse hasta que la primera no haya terminado de ejecutarse.

### Asincronismo

Si lo que buscamos es que las tareas trabajen "en paralelo", entonces debemos buscar la manera de programar instrucciones asíncronas, lo cual significa que cada una seguirá el hilo de resolución que considere su ritmo.

Hay que ser cautelosos al utilizarlas, ya que:

- No controlamos cuándo terminará, sólo cuándo comienza.

- Si una tarea depende del resultado de otra, habrá problemas, pues esperará su ejecución en paralelo.

### Importante

Las operaciones asincronas son no bloqueantes, esto significa que las tareas pueden irse ejecutando en paralelo y no esperar por las demás tareas. Así, la tarea número 3 podría terminar incluso antes que la tarea número 1.

### Async / Await

*Problemas con .then y .catch*

El uso de then y catch tienen un problema de excesivo encapsulamiento, impidiendo o limitando que podamos acceder a los resultados y variables.

Cuando necesitamos un entorno completamente asincrono para trabajar es recomendable utilizar Async / Await.

Async / Await son unas palabras reservadas que trabajando juntas permiten gestionar un entorno asincrono, resolviendo las limites de .then y .catch.

- Async se colocara al inicio de una funcion indicando que todo el cuerpo de esa funcion debera ejecutarse de manera asincrona

- Await servira para esperar por el resultado de la promesa y extraer su resultado

- Al ser operaciones que podrian salir bien o mal es imporante encerrar el vuerpo en un bloque try {} catch {}


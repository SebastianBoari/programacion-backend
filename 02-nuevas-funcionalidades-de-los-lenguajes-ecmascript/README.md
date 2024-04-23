# Nuevas funcionalidades de los lenguajes ECMAScript

Temario:

- Nuevas funciones de ECMAScript
- Funciones más utilizadas en backend

### Repaso

En la primer clase se abordó el concepto de ECMAScript, y cómo éste influye en el lenguaje javascript.

ECMAScript definirá los estándares y funcionalidades que tendrá el lenguaje con el fin de que los navegadores se ajusten a ello y pueda existir una compatibilidad más controlada.

### Proceso de un cambio implementado por ECMAScript

1. Se definen las nuevas funciones a implementar y se eliminan las obsoletas.

2. Dichos cambios pasan a una etapa de prueba

3. Se hace "release" de la nueva versión, los navegadores deberán ajustarse a la nueva versión.

### Punto de partida: ECMAScript 6

Hasta ECMAScript 6 en 2015 marcó un cambio de era en el lenguaje que no recibía grandes actualizaciones desde ECMAScript 5 en 2009. 

El "javascript moderno" se refiere al lenguaje a partir de las actualizaciones del ECMAScript 6 en adelante.


### Javascript y ES7

Las principales funcionalidades de este release son: 

- Se introduce el operador exponencial ** (La libreria Math empezaba a perder uso)

- Nuevos métodos de array: includes. Este nos permitirá saber si algun elemento existe dentro del arreglo.

### Javascript y ES8

Las principales funcionalidades de este release son: 

- Async/await para mejor control asíncrono, sobre este ahondaremos más en futuras clases.

- Object.entries, Object.values, Object.keys, para un mejor control interno sobre las propiedades de un objeto.

### Javascript y ES9

Las principales funcionalidades de este release son: 

- Resolvedores de promesas con .finally(), para atender una promesa, se cumpla o no se cumpla.

- Mayor control a los objetos con operadores rest y spread (aplicable tambien a arrays)

### Nuevas implementaciones con ECMAScript 10 y 11

A partir de estas implementaciones están estrechamente ligados con otros conceptos que iremos aprendiendo a lo largo del curso. Haremos énfasis en los elementos con los que podemos trabajar a esta altura del curso.

### Javascript y ES10

Las principales funcionalidades de este release son: 

- String.trim(): Remueve los espacios innecesarios en una cadena. Sirve para validar cadenas enviadas vacías o eliminar los espacios iniciales y finales.

- Array.flat(): Remueve anidaciones internas de arrays para dejar un arreglo plano.

- Dynamic import: Permite importar sólo los módulos necesarios, ahorrando espacio y memoria.

### Dynamic Import

En los imports tradicionales terminamos importando TODOS LOS MÓDULOS, aun cuando no estamos utilizando todos al mismo tiempo.

Dynamic import permite importar sólo los módulos necesarios según una situación particular, lo cual permite optimizar la utilización de recursos, al pedir a la computadora sólo lo que se esté utilizando.

Es utilizado principalmente en códigos que utilizan el patrón de diseño Factory (más adelante lo abordaremos).


### Javascript y ES11

Las principales funcionalidades de este release son: 

- Operador nullish: Sirve para poder colocar un valor por default a variables que podrían ser nulas o indefinidas

- Variables privadas dentro de las clases, esto permite que algunas variables no sean accesibles desde el entorno de instancia de una clase.


# Principios básicos de JavaScript

Temario:

- Tipos de datos y variables en Javascript
- Javascript y ES6
- Funciones en Javascript

### Javascript y ES6

¿Qué es ECMAScript?

ECMAScript plantea compatibilidades, nuevas funciones, funciones en desuso y demás en cada una de sus nuevas versiones. 

Basicamente le da mantenimiento al lenguaje.

Cada nueva versión (release) de ECMAScript que sale, se lleva la denominacion ES+numero de version

Ejemplo:

ES6, ES7, ES11, etc...


### Cambios importantes de ES6: Let y const

let y const son dos formas de declarar variables en JS introducidas a partir de ES6 que limitan el ámbito de la variable al bloque en que fue declarada. 

Antes de la versión ES6 era comun utilizar "var" para crear variables. Ya no se recomienda su uso.

**Let**

Un bloque en JS se puede entender como "lo que queda entre dos llaves", ya sean definiciones de funciones o bloques if, while, for y loops similares

Si una variable es declarada con let en el ambito global o en el de una función, la variable pertenece al ámbito global o al ámbito de la función respectivamente.


**Const**

Al igual que en let, el ámbito (scope) para una variable declarada con const es el bloque.

Sin embargo, const además prohíbe la reasignación de valores (const proviene de constant).

### Mutabilidad y const

- Mientras que con let una variable puede ser reasignada, con const no es posible.

- Si se intenta reasignar una constante se obtendrá un error tipo "TypeError".

- Si el valor de una constante es algo "mutable", como un array o un objeto, se pueden cambiar los valores internos de sus elementos.

### Funciones en Javascript

**¿Qué es una función?**

Son bloques de instrucciones que trabajan sobre un scope interno (conocido como scope local). Pueden encontrarse en su sintaxis básica o en su notación flecha.

**Scopes**

El scope define el alcance de una variable o constante a un cierto contexto. Esto permite utilizar el mismo nombre para diferentes variables, sin confundir el computador.

El *scope global* afectará a todo el nivel del archivo en el que trabajemos, mientras que el *scope local* afectará a la función o bloque en el que esté declarado.

**Template Strings**

La mayoria de lenguajes cuentan con una herramienta que nos permita interpolar (mezclar) cadenas de texto (strings) con variables.

La forma de realizar esto en Javascript es con las comillas invertidas y el signo dolar y entre 
llaves la variable `Bienvenido ${nombreUsuario}`

### Closures en Javascript

Una cláusula o closure es una fúncion que puede mantener variables declaradas de manera interna, además de cortar con una función que pueda acceder a ambos ámbitos, tanto el suyo como el de su función padre, logrando así un efecto de *variable privada*.

Este efecto de encapsulamiento se utilizaba con anterioridad debido a la falta de una implementación de claes en Javascript, sin embargo, al introducirse las clases, el cambio fue muy notorio, dejando a las closures en desuso, o bien en casos de uso muy limitados e insuficientes para códigos enterprise.

### Uso de clases en Javascript

Una clase es una representación de una entidad. Nos sirve para modelar múltiples  cosas como: un auto, una persona, o bien cosas más abstractas como: un administrador de archivos, un conector a una base de datos, etc.

Las clases funcionan como *moldes*, por lo que una vez definida una de éstas, podemos crear multiples objetos con la misma forma y con las mismas funcionalidades. A éstas se les llaman *instancias*.



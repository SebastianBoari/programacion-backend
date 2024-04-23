# Express avanzado

Temario: 
- Código de estado en HTTP
- Métodos de petición

### Códigos de estado en HTTP

Cuando realizamos alguna petición el servidor mediante el protocolo HTTP, el servidor debe respondernos y esa respuesta ya sea la información solicitada o un error debe ser acompañada de un código que representa el estado del proceso.

El código de estado nos permite saber como se encuentra el proceso o como finalizo (si dio error, que tipo de error, si la petición fue satisfactoria, etc..)

### Indicadores

Si el código comienza con cierto numero tiene un significado general y la terminación del numero nos da mas información. 

Ejemplo:

- **1XX**: status "informativo"
- **2XX**: status "ok"
- **3XX**: status de redirección
- **4XX**: status error de cliente
- **5XX**: status error de servidor


### Algunos de los mas importantes

**200:** Indica que la petición se proceso correctamente. No hubo ningun error.

**300:** Referencia a redirecciones cuando un recurso se ha movido o necesitamos apuntar a otro servicio.

**400:** Mala consulta de parte del cliente.

**401:** Cliente no identificado bajo una credencial valida.

**403:** El cliente esta identificado pero sus credenciales no le permiten ver el recurso solicitado.

**404:** No se encontró el recurso solicitado.

**500:** Error interno del servidor.

**IMPORTANTE:** Ahora nosotros estamos a cargo del servidor y su comportamiento por ende debemos devolver el código de estado correcto.


### Comprendiendo una API REST

Una API funge como un "contrato" entre el front y el back. Es un conjunto de definiciones y reglas que permiten al cliente y al servidor interactuar.


### REST

Una API REST es como un acuerdo entre dos partes, el cliente y el servidor, para comunicarse de manera eficiente. 

Define cómo deben ser las reglas y la estructura de los mensajes para que la comunicación sea exitosa. 

REST establece el formato de los datos que se intercambian, como JSON o XML, siendo JSON el más común. 

Una API REST es un conjunto de reglas claras y definidas que facilitan la comunicación entre sistemas informáticos.


### Que caracteristicas debe tener una API REST?

- **Mensaje HTTP informativo:** Cada mensaje HTTP contiene toda la información necesaria.

- **Estado independiente:** Cliente y servidor no necesitan recordar ningún estado entre mensajes.

- **Débilmente acoplado:** Cliente y servidor no necesitan conocer los detalles internos del otro.

- **Caché compatible:** Debe permitir almacenamiento en caché para evitar conexiones repetidas.

- **Soporte de red para la caché:** La infraestructura de red debe ser compatible con la caché.

- **Acceso a recursos mediante HTTP:** Todos los recursos deben ser accesibles a través de peticiones HTTP.

- **Operaciones CRUD:** Preferiblemente, las operaciones principales deben ser compatibles (POST, GET, PUT, DELETE).

- **Códigos de estado en respuestas:** Las respuestas deben incluir códigos de estado para informar resultados.

- **Identificador único (URI):** Cada recurso debe tener una URI única para acceder y compartir.

- **Hipervínculos de navegación:** Las respuestas pueden incluir hipervínculos a otros recursos.

- **Navegación sin registros adicionales:** Es posible navegar a través de recursos solo con hipervínculos.

### Métodos de petición:

Los métodos son acciones definidas en el protocolo HTTP que especifican el tipo de operación que se realiza en un endpoint. Los principales métodos son:

- **GET:** Obtener un recurso.
- **POST:** Crear o añadir un recurso.
- **PUT:** Modificar un recurso.
- **DELETE:** Eliminar un recurso.

### Enfoque de diseño en una aplicación RESTful:

**Contrario a RPC:** Se aleja del enfoque basado en llamadas a procedimientos remotos (RPC). RPC (Remote Procedure Calls) basa su funcionamiento en las operaciones que puede realizar el sistema (acciones, usualmente verbos). Ej: getUsuario()

**Énfasis en recursos:** Se centra en los recursos, generalmente sustantivos, asignándoles nombres específicos, como "Usuarios".

**Identificadores y peticiones específicas:** Cada funcionalidad relacionada con un recurso tiene sus propios identificadores y peticiones HTTP.

### POSTMAN
*(O cualquier otra herramienta para gestionar peticiones simulando clientes).*

**El problema:** El navegador sólo puede enviar peticiones con método GET desde la url, (por ello es que podíamos utilizarlo desde el navegador sin problema la clase pasada), sin embargo, para poder utilizar el resto de métodos, no será posible con el navegador

**La solución:** POSTMAN es un software profesional que nos permitirá gestionar peticiones simulando ser un cliente. De esta manera rompemos la limitante del navegador y podemos probar todos nuestros endpoints. 

### Metodo POST

Sirve para “crear” recursos, POST se utiliza para operaciones donde no necesitamos obtener un recurso, sino añadir uno. Algunos de los casos donde se utilizan son:

- Registrar un usuario
- Loguear un usuario
- Crear un producto
- Crear una mascota
- Crear un carrito de compra
- Enviar información para un correo electrónico. 

Se apoya del recurso req.body, donde el body representa la información que el cliente envía para crear. 

### ¡Importante!

Para que nuestro servidor express pueda interpretar en forma automática mensajes de tipo JSON en formato urlencoded al recibirlos, debemos indicarlo en forma explícita de la siguiente forma:

`app.use(express.json())`

### Atención

{extended:true} precisa que el objeto req.body contendrá valores de cualquier tipo en lugar de solo cadenas. 
¡Sin esta línea, el servidor no sabrá cómo interpretar los objetos recibidos!

`app.use(express.urlencoded({ extended: true }))`

### Método PUT

Sirve para modificar un recurso existente.
Requiere enviar el cuerpo (body) en la solicitud junto con el identificador del recurso (como el id) en los parámetros.

Se pueden actualizar solo los campos necesarios o enviar el objeto completo, dependiendo del contexto.


### Método DELETE

Como bien lo indica el nombre, este método lo utilizamos cuando queremos eliminar algún recurso. Aquí no es necesario enviar nada desde el body, sin embargo, sí es importante indicar en el req.params el identificador para que el servidor reconozca qué recurso debe eliminar.


### Actividad en clase - Servidor con GET, POST, PUT, DELETE (00-actividad-en-clase)

Dada la frase: “Frase inicial”, realizar una aplicación que contenga un servidor en express, el cual cuente con los siguientes métodos: 

- GET '/api/frase': devuelve un objeto que como campo ‘frase’ contenga la frase completa

- GET '/api/palabras/:pos': devuelve un objeto que como campo ‘buscada’ contenga la palabra hallada en la frase en la posición dada (considerar que la primera palabra es la #1).

- POST '/api/palabras': recibe un objeto con una palabra bajo el campo ‘palabra’ y la agrega al final de la frase. Devuelve un objeto que como campo ‘agregada’ contenga la palabra agregada, y en el campo ‘pos’ la posición en que se agregó dicha palabra.

- PUT '/api/palabras/:pos': recibe un objeto con una palabra bajo el campo ‘palabra’ y reemplaza en la frase aquella hallada en la posición dada. Devuelve un objeto que como campo ‘actualizada’ contenga la nueva palabra, y en el campo ‘anterior’ la anterior.

- DELETE '/api/palabras/:pos': elimina una palabra en la frase, según la posición dada (considerar que la primera palabra tiene posición #1).

- Utilizar POSTMAN para probar funcionalidad

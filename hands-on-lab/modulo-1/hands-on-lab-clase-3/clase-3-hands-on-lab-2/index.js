// Hands on Lab

// Práctica de módulos nativos: fs + crypto

// ¿Cómo lo hacemos? Se creará una clase “UserManager” que permitirá guardar usuarios en un archivo. El usuario se recibirá con una contraseña en string plano, y se deberá guardar la contraseña hasheada con crypto. Utilizar los módulos nativos  fs y crypto, El manager debe contar con los siguientes métodos:

// El método “Crear usuario” debe recibir un objeto con los campos:

// Nombre
// Apellido
// Nombre de usuario
// Contraseña

// El método debe guardar un usuario en un archivo “Usuarios.json”, recordando que la contraseña debe estar hasheada por seguridad

const UserManager = require('./UserManager');

const miUserManager = new UserManager();

miUserManager.CrearUsuario("Julio Argentino", "Roca", "jaroca", "locurascontigo2016");

miUserManager.ConsultarUsuarios();


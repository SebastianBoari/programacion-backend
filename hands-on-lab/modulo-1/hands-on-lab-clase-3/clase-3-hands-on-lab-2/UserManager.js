const fs = require('fs');
const crypto = require('crypto');

class UserManager {
  constructor() {
    console.log('Se ha instanciado la clase UserManager');
    this.usuarios = [];
    
  }

  CrearUsuario = async(nombre, apellido, username, password) => {
    try {
      const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

      const usuario = {
        nombre: nombre,
        apellido: apellido,
        username: username,
        password: hashedPassword
      };

      this.usuarios.push(usuario);

      await fs.promises.writeFile('./Usuarios.json', JSON.stringify(this.usuarios));

      console.log('Usuario creado.');
    } catch (error) {
      console.error(error);
    };
  };

  ConsultarUsuarios = async() => {
    try {
        if (fs.existsSync('./Usuarios.json')) {
            const data = await fs.promises.readFile('./Usuarios.json', 'utf-8');

            const dataString = JSON.stringify(data)

            console.log(dataString);
        } else {
            console.warn('No hay usuarios registrados.');
        };
    } catch (error) {
        console.error(error);
    };
  };
};

module.exports = UserManager;

const fs = require('fs');

class UserManager {

    constructor(){
        console.log('Se ha instanciado la clase UserManager');
        this.usuarios = [];
    };

    CrearUsuario = async(nombre, apellido, edad, curso) =>{
        try{
            const usuario = {
                nombre: nombre,
                apellido: apellido,
                edad: edad,
                curso: curso
            };
    
            this.usuarios.push(usuario);

            await fs.promises.writeFile('./Usuarios.json', JSON.stringify(this.usuarios));

            console.log('Usuario creado.');
        } catch (error){
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
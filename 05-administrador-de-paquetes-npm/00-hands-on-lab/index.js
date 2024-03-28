/*  

Hands on Lab

¿Cómo lo hacemos? Se creará una clase “UserManager” que permitirá guardar usuarios en un archivo. El usuario se recibirá con una contraseña en string plano, y se deberá guardar la contraseña hasheada con crypto. Utilizar los módulos nativos  fs y crypto.

 El manager debe contar con los siguientes métodos:

El método “Crear usuario” debe recibir un objeto con los campos:

    - Nombre
    - Apellido
    - Nombre de usuario
    - Contraseña

El método debe guardar un usuario en un archivo “Usuarios.json”, recordando que la contraseña debe estar hasheada por seguridad

El método “Validar Usuario” recibirá el nombre de usuario que quiero validar, seguido de la contraseña,  debe poder leer el json previamente generado con el arreglo de usuarios y hacer la comparación de contraseñas, Si coinciden el usuario y la contraseña, devolver un mensaje “Logueado”, caso contrario indicar error si el usuario no existe, o si la contraseña no coincide.
*/

import fs from 'fs'
import crypto from 'crypto'

class UserManager {
    #path
    #users

    constructor(path) {
        this.#path = path
        this.#users = this.#loadUsers()
    }

    #loadUsers() {
        const users = fs.readFileSync(this.#path, 'utf-8')

        const parsedUsers = JSON.parse(users)

        return parsedUsers
    }

    async getUsers() {
        try {
            const users = await fs.promises.readFile(this.#path, 'utf-8')

            const parsedUsers = JSON.parse(users)

            this.#users = parsedUsers

            return this.#users
        } catch (error) {
            throw Error(error)
        }
    }

    async createUser(email, password, name, surname, age, course) {
        try {
            const newUser = {
                email: email,
                password: password,
                name: name,
                surname: surname,
                age: age,
                course: course,

            }

            newUser.salt = crypto.randomBytes(128).toString()
            newUser.password = crypto.createHmac('sha256', newUser.salt).update(newUser.password).digest('hex')

            let users = await this.getUsers()

            if (users.length <= 0) {
                let newUsers = [newUser]

                await fs.promises.writeFile(this.#path, JSON.stringify(newUsers, null, '\t'))

                users = await this.getUsers()

                return users
            }


            users.push(newUser)

            await fs.promises.writeFile(this.#path, JSON.stringify(users, null, '\t'))

            users = await this.getUsers()

            return users
        } catch (error) {
            throw Error(error)
        }
    }


    async validateUser(email, password) {
        try {
            let users = await this.getUsers()

            const user = users.find((user) => {
                return user.email === email
            })

            if (!user) {
                Error('User not found')
            }

            const cryptoPass = crypto.createHmac('sha256', user.salt).update(password).digest('hex')

            if (!cryptoPass === user.password) {
                Error('Invalid password or email')
            }

            return 'Logged in successfully'
        } catch (error) {
            throw Error(error)
        }
    }
}

const userManager = new UserManager('./users.json')

// console.log(await userManager.validateUser('jperez@gmail.com', 'juanperez123')) // ERROR

await userManager.createUser('jdoe@gmail.com', 'johndoe123', 'John', 'Doe', 32, 'web development')

await userManager.createUser('jperez@gmail.com', 'juanperez123', 'Juan', 'Perez', 38, 'backend')

console.log(await userManager.getUsers())

console.log(await userManager.validateUser('jperez@gmail.com', 'juanperez123'))

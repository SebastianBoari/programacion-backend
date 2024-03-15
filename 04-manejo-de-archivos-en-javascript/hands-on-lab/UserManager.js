import fs from 'fs'

class UserManager {
    #path

    constructor(pth) {
        this.#path = pth

        this.#createFile()
    }

    async #createFile() {
        await fs.promises.writeFile(this.#path, JSON.stringify([]))
    }

    async getUsers() {
        try {
            const users = await fs.promises.readFile(this.#path, 'utf-8')

            return users
        } catch (error) {
            throw Error(error)
        }
    }

    async createUser(name, surname, age, course) {
        try {
            const newUser = {
                name: name,
                surname: surname,
                age: age,
                course: course
            }

            const read = await this.getUsers()
            const users = JSON.parse(read)

            if (!users[0]) {
                const users = [newUser]

                await fs.promises.writeFile(this.#path, JSON.stringify(users, null, '\t'))

                return await this.getUsers()
            }

            users.push(newUser)
            console.log("ando por aqui")
            await fs.promises.writeFile(this.#path, JSON.stringify(users, null, '\t'))

            return await this.getUsers()
        } catch (error) {
            throw Error(error)
        }
    }
}

const userManager = new UserManager('./users.json')

console.log(await userManager.getUsers())

console.log(await userManager.createUser("Juan", "Moreira", 28, "Desarrollo Web"))

console.log(await userManager.createUser("Martin", "Fernandez", 32, "Programacion Java"))

console.log(await userManager.createUser("Julieta", "Ochoa", 22, "Programacion C#"))
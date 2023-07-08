import { Command } from "commander"

const program = new Command()

program
    .option('-d', 'Variables para debug', false)
    .option('-p <port>', 'Puerto del servidor', 8080)
    .option('--mode <mode>', 'Modo de trabajo', 'development')

program.parse()

console.log(program.opts())

// En consola ejecutar node src/app.js para ver el comportamiento
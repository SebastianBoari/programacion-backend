// Codigo de __dirname para utilizar rutas absolutas en vez de rutas relativas.
// SOLO VALIDO SI TRABAJAMOS CON TYPE:MODULE (ECMAScript MODULES).

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

// Luego importamos en nuestros archivos __dirname para poder anteponerlo al nombre del archivo que queremos rutear para que no tengamos problemas con las rutas relativas.
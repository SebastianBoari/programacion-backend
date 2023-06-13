import {fileURLToPath} from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;

// Importamos bcrypt
import bcrypt from 'bcrypt';

//hashSync toma el password que pasemos y procedera a aplicar un proceso de hasheo a partir de un "salt"

//genSaltSync generara un salt de 10 caracteres. Un salt es un string random que hace que el proceo de hasheo se realice de manera impredecible

// Retorna un string con el password hasheado.
export const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// compareSync tomara primero el password sin hashear y lo comparara con el password hasheado en la base de datos.

// Retorna true o false dependiendo si el password coincide o no
export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
};
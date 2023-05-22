import { Router } from 'express';
import { userModel } from '../models/users.model.js';

const router = Router();

// La funcion SIEMPRE debe de ser asíncrona al trabajar con mongoose:

// Read
router.get('/', async (req, res) => {
    try{
        let users = await userModel.find() // Nota que find es la misma consulta que haciamos por Mongo Shell

        res.send({result: 'success', payload: users});
    } catch(error) {
        console.log(`Cannot get users with mongoose: ${error}`);
    };
});

// Create
router.post('/', async (req, res) => {
    // Primero obtenemos los datos que necesitamos, según lo definido en nuestro schema
    let {first_name, last_name, email} = req.body;
    
    // Evaluamos que los valores sí existan
    if (!first_name || !last_name || !email) {
        return res.send({status: "error", error: "Incomplete values"});
    }

    // Si todo está en orden, pedimos a Mongoose que inserte el nuevo documento
    let result = await userModel.create({
        first_name,
        last_name,
        email
    });

    // Devolvemos el usuario recién creado
    res.send({status: "success", payload: result});
});

// Update
router.put('/:uid', async (req, res) => {
    // Obtenemos el userId (uid) por params
    let { uid } = req.params;

    // Tomamos todo el usuario a reemplazar
    let userToReplace = req.body;

    if (!userToReplace.first_name || !userToReplace.last_name || !userToReplace.email)
        return res.send({ status: "error", error: "Incomplete Values" });

    let result = await userModel.updateOne({ _id: uid }, userToReplace);

    res.send({ status: "success", payload: result });
});

router.delete('/:uid', async (req, res) => {
    // Obtenemos el userId (uid) de los params
    let { uid } = req.params;
    
    // Nota que estamos buscando un _id y no un id, Mongo maneja internamente el valor _id
    let result = await userModel.deleteOne({ _id: uid })

    res.send({status:"success", payload: result});
});

export default router;
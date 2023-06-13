import { Router } from "express";
import UserModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";

const router = Router()

//Vista para registrar usuarios
router.get('/register', (req, res) => {
    res.render('sessions/register')
})

// API para crear usuarios en la DB
router.post('/register', async(req, res) => {
    const userNew = req.body

    userNew.password = createHash(userNew.password)

    const user = new UserModel(userNew)
    await user.save()

    res.redirect('/session/login')
})

// Vista de Login
router.get('/login', (req, res) => {
    res.render('sessions/login')
})

// API para login
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await UserModel.findOne({email}).lean().exec()
    if(!user) {
        return res.status(401).render('errors/base', {
            error: 'User doesnot exists'
        })
    }

    if (!isValidPassword(user, password)) {
        return res.status(403).send({ status: 'error', error: 'Incorrect pass'})
    }

    delete user.password
    req.session.user = user
    res.redirect('/products')
})

// Cerrar Session
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            console.log(err);
            res.status(500).render('errors/base', {error: err})
        } else res.redirect('/session/login')
    })
})


// Vista para cambiar constrasenia
router.get('/resetPassword', (req, res) => {
    res.render('sessions/resetPassword')
});

// API para cambiar contraseña
router.post('/resetPassword', async (req, res) => {
    // Tomamos la informacion enviada a traves del formulario
    const email = req.body.email;
    const password = req.body.password;

    // Buscamos el usuario por el mail y cambiamos el password por el nuevo, ya hasheado obviamente.
    const user = await UserModel.findOneAndUpdate(
        { email },
        { $set: { password: createHash(password) } },
        { new: true }
    );

    // Si no se encuentra el usuario enviamos mensaje de error
    if(!user){
        return res.status(401).render('errors/base', {
            error: 'User does not exist'
        });
    };

    // Si sale todo bien borramos el password y seteamos la nueva informacion en la sesion.
    delete user.password;
    req.session.user = user;

    // Redirigimos a productos
    res.redirect('/products');
});


export default router
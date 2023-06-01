import { Router } from 'express';

const router = Router();

const auth = (req, res, next) => {
    if(req.session.user){
        return next();
    } else {
        return res.render('login', {
            style: 'index',
            script: 'login'
        });
    };
};

router.get('/register', (req, res) => {
    res.render('register', {
        style: 'index',
        script: 'register'
    });
});

router.get('/login', (req, res) => {
    res.render('login', {
        style: 'index',
        script: 'login'
    });
});

router.get('/profile', auth, (req, res) => {
    res.render('profile', {
        style: 'index',
        script: 'profile',
        user: req.session.user
    });
});


export default router;
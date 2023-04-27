const { Router } = require('express');
const router = Router();

const food = [
    {name:"Hamburguesa", price: 100},
    {name: "Banana", price: 20},
    {name: "Soda", price: 40},
    {name: "Ensalada", price: 120},
    {name: "Pizza", price: 150}
];

router.get('/', (req, res) => {
    let testUser = {
        name: "Hilda",
        lastName: "Martinez",
        role: "admin",
//      role: "user"
    };

    res.render('textUser',{
        user: testUser,
        style:"personalData",
        isAdmin: testUser.role === "admin",
        food
    });
});


router.get('/user', (req, res) => {
    res.render('register', {
        title: 'Register',
        style: 'register',
        script: 'register'
    });
});

const users = [];

router.post('/user', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    
    res.send(users);
});

module.exports = router;
const { Router } = require('express');

const router = Router();

const users = [
    { id: 1, name: "Mateo Mateolli", mail: "user@user.com" },
    { id: 2, name: "Martin Martinez", mail: "user@user.com" },
    { id: 3, name: "Gonzalo Gonzalez", mail: "user@user.com" }
];

router.get('/', (req, res) => {
    res.send({ users });
});

router.post('/', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.send({ users });
});

module.exports = router;
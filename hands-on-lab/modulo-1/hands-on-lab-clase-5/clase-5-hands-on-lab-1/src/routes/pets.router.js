const { Router } = require('express');

const router = Router();

const pets = [
    { id: 1, name: "Smokey", type: "cat" },
    { id: 2, name: "Max", type: "dog" },
    { id: 3, name: "Rosie", type: "hamster" }
];

router.get('/', (req, res) => {
    res.send({ pets });
});

router.post('/', (req, res) => {
    const newPet = req.body;
    pets.push(newPet);
    res.send({ pets });
});

module.exports = router;
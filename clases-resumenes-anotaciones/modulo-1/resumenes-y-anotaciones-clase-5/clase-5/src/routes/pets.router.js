const { Router } = require('express');
const uploader = require('../utils');

const router = Router();

const pets = [
    { id: 1, name: "Smokey", type: "cat" },
    { id: 2, name: "Max", type: "dog" },
    { id: 3, name: "Rosie", type: "hamster" }
];

router.get('/', (req, res) => {
    res.json({ pets });
});

router.post('/', uploader.single('file'), (req, res) => {
    const newPet = {...req.body, thumbnail: req.file.path};
    
    pets.push(newPet);
    res.json({ pets });
});

module.exports = router;
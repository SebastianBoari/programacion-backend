import { Router } from "express";

const router = Router();

const pets = [
    { name: "firulais", specie: "perro" },
    { name: "snowball", specie: "gato" }
];

router.post("/", (req, res) => {
    if(!req.body) return res.json({ "error": "no data to entry" });
    
    const { name, specie } = req.body;

    const newPet = {
        name: name,
        specie: specie 
    };
    
    pets.push(newPet);

    console.log(newPet);

    res.json({ "success": "Pet created", "pet": `${newPet}` });
});

const findName = (petName) => {
    return pets.find(pet => pet.name === petName)
};

router.param("pet", (req, res, next, petName) => {
    if(!findName(petName)) return res.json({ error: "pet doesnt exists" });

    req.pet = findName(petName);

    next();
});

router.get("/:pet", (req, res) => {
    const pet = req.pet;

    res.json({ "status": "success", "payload": pet });
});

router.put("/:pet", (req, res) => {
    const pet = req.pet;

    pet.adopeted = true

    res.json({ "status": "success", "payload": pet });
});

export default router;
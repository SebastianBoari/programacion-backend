import { Router } from 'express'

const router = Router()

let pets = []

router.get('/', (req, res) => {
    const pets = JSON.stringify(pets)

    res.json({ pets: pets })
})

router.post('/', (req, res) => {
    const newPet = req.body

    pets.push(newPet)

    res.json({ pets: pets })
})

export default router
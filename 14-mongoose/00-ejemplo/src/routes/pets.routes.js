import { Router } from 'express'
import { petsModel } from '../models/pets.model.js'


const router = Router()

router.get('/', async (req, res) => {
    const pets = await petsModel.find()

    res.json({ payload: pets })
})

router.post('/', async (req, res) => {
    const { name, species, age } = req.body

    await petsModel.insertMany({ name: name, species: species, age: age })

    res.json({ payload: 'ok' })
})

router.put('/:id', async (req, res) => {
    const id = req.params.id

    const { field, newData } = req.body

    await petsModel.updateOne({ _id: id }, { [field]: newData })

    res.json({ payload: 'ok' })
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    await petsModel.deleteOne({ _id: id })

    res.json({ payload: 'ok' })
})

export default router
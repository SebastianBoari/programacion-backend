import { Router } from 'express'
import { uploader } from '../utils.js'
const router = Router()

let pets = []

router.get('/', (req, res) => {

    res.json({ pets: pets })
})

router.post('/', uploader.single('image'), (req, res) => {

    res.send('ok')
})

export default router
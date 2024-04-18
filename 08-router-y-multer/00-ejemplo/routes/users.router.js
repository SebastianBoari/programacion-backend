import { Router, json } from 'express'

const router = Router()

let users = []

router.get('/', (req, res) => {

    res.json({ users: users })
})

router.post('/', (req, res) => {
    const newUser = req.body

    users.push(newUser)

    res.json({ users: users })
})


export default router
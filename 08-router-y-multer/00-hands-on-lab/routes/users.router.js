import { Router, json } from 'express'

const router = Router()

let users = []

router.get('/', (req, res) => {
    const users = JSON.stringify(users)

    res.json({ users: users })
})

router.post('/', (req, res) => {
    const newUser = req.body

    users.push(newUser)

    res.json({ users: users })
})


export default router
import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.render('index', { style: 'index' })
})

export default router
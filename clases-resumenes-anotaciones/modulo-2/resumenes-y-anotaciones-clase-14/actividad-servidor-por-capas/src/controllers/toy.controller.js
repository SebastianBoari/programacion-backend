import ToyService from '../services/toy.service.js'

const toyService = new ToyService()

export const getAll = (req, res) => {
    res.json(toyService.getAll())
}

export const create = (req, res) => {
    const data = req.body
    res.json(toyService.create(data))
}
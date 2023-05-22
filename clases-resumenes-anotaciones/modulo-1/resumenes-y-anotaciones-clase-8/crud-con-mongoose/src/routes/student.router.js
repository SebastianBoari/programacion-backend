import { Router } from 'express';
import { studentModel } from '../models/student.model.js';

const router = Router();

// Read
router.get('/', async (req, res) => {
    try{
        let students = await studentModel.find() 
        res.status(200).send({result: 'success', payload: students});
    } catch(error) {
        console.log(`Error while trying to fetch the students: ${error}`);
        res.status(409).send({result: 'error', description: error});
    };
});

// Create
router.post('/', async (req, res) => {
    try{
        let nombre = req.body.nombre;
        let apellido = req.body.apellido;
        let edad = Number(req.body.edad);
        let dni = req.body.dni;
        let curso = req.body.curso;
        let nota = Number(req.body.nota);
        if (!nombre || !apellido || !edad || !dni || !curso || !nota) {
            return res.send({status: "error", error: "Incomplete values"});
        };
        let result = await studentModel.create({
            nombre,
            apellido,
            edad,
            dni,
            curso,
            nota
        });
        res.status(200).send({status: "success", payload: result});
    } catch (error) {
        res.status(409).send({status: "error", description: error});
        console.error(`${error}`);
    };
});

// Update
router.put('/:id', async (req, res) => {
    try{
        let id = req.params.id;
        let currentData = req.body
        if (!currentData.nombre || !currentData.apellido || !currentData.edad || !currentData.dni || !currentData.curso || !currentData.nota) {
            return res.status(400).send({status: "error", error: "Incomplete values"});
        };
        let result = await studentModel.updateOne({ _id: id}, currentData);
        res.status(200).send({ status: "success", payload: result});
    } catch (error) {
        res.status(500).send({status: "error", error: error});
    };
});

router.delete('/:id', async (req, res) => {
    try{
        let id = req.params.id;
        let result = await studentModel.deleteOne({ _id: id })
        res.status(200).send({ status: "success", })
    } catch (error) {
        return res.status(400).send({status: "error", error: `${error}`});
    };
});

export default router;
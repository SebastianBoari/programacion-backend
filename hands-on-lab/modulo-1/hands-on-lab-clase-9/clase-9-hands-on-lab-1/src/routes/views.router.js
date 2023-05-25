import { Router } from 'express';
import studentsModel from "../models/students.model.js";

const router = Router();

router.get('/students', async (req, res) => {
    
    let page = parseInt(req.query.page);
    if (!page) page = 1;

    const result = await studentsModel.paginate({}, {page, limit: 5, lean: true})
    
    result.prevLink = result.hasPrevPage ? `/students?page=${result.prevPage}` : '';

    result.nextLink = result.hasNextPage ? `/students?page=${result.nextPage}` : '';

    console.log(result);

    res.render('students', {
        title: 'Estudiantes',
        students: result,
    });
});

export default router
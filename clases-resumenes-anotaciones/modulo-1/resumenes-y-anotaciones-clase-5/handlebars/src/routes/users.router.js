const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('index', { style: "styles1", title: "Bienvenido", name: "Gustavo" });
});

router.get('/list', (req, res) => {
    res.render('list', { style: "styles2", title: "Lista de usuarios."})
});

module.exports = router;
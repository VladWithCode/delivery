const { getSale, saveSale } = require('../../controllers/sale.ctrl');

const Router = require('express').Router;

const router = Router();

router.post('/', saveSale);

router.get('/:id', getSale);

module.exports = router;

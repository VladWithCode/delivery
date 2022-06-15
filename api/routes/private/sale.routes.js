const { getSales, updateSale } = require('../../controllers/sale.ctrl');

const Router = require('express').Router;

const router = Router();

router.get('/', getSales);

router.put('/:id', updateSale);

module.exports = router;

const { getSale } = require('../../controllers/sale.ctrl');

const Router = require('express').Router;

const router = Router();

router.get('/:id', getSale);

module.exports = router;

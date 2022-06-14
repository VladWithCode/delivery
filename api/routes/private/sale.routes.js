const { getSales } = require('../../controllers/sale.ctrl');

const Router = require('express').Router;

const router = Router();

router.get('/', getSales);

module.exports = router;

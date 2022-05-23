const { getProducts, getProduct } = require('../../controllers/product.ctrl');

const Router = require('express').Router;

const router = Router();

router.get('/', getProducts);

router.get('/:id', getProduct);

module.exports = router;

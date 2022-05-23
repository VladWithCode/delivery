const Router = require('express').Router;

const productRoutes = require('./public/product.routes');

const router = Router();

router.use('/products', productRoutes);

module.exports = router;

const Router = require('express').Router;

const productRoutes = require('./private/product.routes');

const router = Router();

router.use(['/products', '/product'], productRoutes);

module.exports = router;

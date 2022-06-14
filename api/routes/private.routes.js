const Router = require('express').Router;

const productRoutes = require('./private/product.routes');
const saleRoutes = require('./private/sale.routes');

const router = Router();

router.use(['/products', '/product'], productRoutes);

router.use(['/sales', '/sale'], saleRoutes);

module.exports = router;

const Router = require('express').Router;

const productRoutes = require('./public/product.routes');
const stripeRoutes = require('./public/stripe.routes');
const saleRoutes = require('./public/sale.routes');

const router = Router();

router.use('/products', productRoutes);

router.use('/stripe', stripeRoutes);

router.use('/sales', saleRoutes);

module.exports = router;

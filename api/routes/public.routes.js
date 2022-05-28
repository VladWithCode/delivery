const Router = require('express').Router;

const productRoutes = require('./public/product.routes');
const stripeRoutes = require('./public/stripe.routes');

const router = Router();

router.use('/products', productRoutes);

router.use('/stripe', stripeRoutes);

module.exports = router;

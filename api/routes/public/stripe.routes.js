const { createPaymentIntent } = require('../../controllers/stripe.ctrl');

const Router = require('express').Router;

const router = Router();

router.post('/payment-intent', createPaymentIntent);

module.exports = router;

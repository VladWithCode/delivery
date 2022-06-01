const {
  createPaymentIntent,
  saveSale,
} = require('../../controllers/stripe.ctrl');

const Router = require('express').Router;

const router = Router();

router.post('/payment-intent', createPaymentIntent);

router.post('/sale', saveSale);

module.exports = router;

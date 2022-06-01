const cartService = require('../services/cart.service');
const saleService = require('../services/sale.service');
const stripeService = require('../services/stripe.service');
const asyncHandler = require('../utils/asyncHandler');

const ctrl = {};

ctrl.createPaymentIntent = async (req, res, next) => {
  const { cart } = req.body;

  const [totals, calculateError] = await asyncHandler(
    cartService.safeCalculateTotals(cart)
  );

  if (calculateError) return next(calculateError);

  const [paymentIntent, createPaymentIntentError] = await asyncHandler(
    stripeService.createPaymentIntent({ total: totals.total })
  );

  if (createPaymentIntentError) return next(createPaymentIntentError);

  return res.json({
    status: 'OK',
    clientSecret: paymentIntent.client_secret,
  });
};

ctrl.saveSale = async (req, res, next) => {
  const { cart, customer, address, zip, intentId } = req.body;

  const [paymentIntent, retriveIntentError] = await asyncHandler(
    stripeService.retrivePaymentIntent(intentId)
  );

  if (retriveIntentError) return next(retriveIntentError);

  const [totals, calculateError] = await asyncHandler(
    cartService.safeCalculateTotals(cart)
  );

  if (calculateError) return next(calculateError);

  const chargeData = paymentIntent.charges.data[0];

  const sale = saleService.createSale({
    customer,
    address,
    zip,
    items: cart.items.map(i => {
      return {
        ...i,
        total: totals.itemTotals[i.sku],
      };
    }),
    payment: {
      method: chargeData.payment_method_details.type,
      isPayed: paymentIntent.status === 'succeeded',
      payedOn: Date.now(),
      subtotal: totals.total,
      tax: cart.tax || 0,
      shipment: cart.shipment || 0,
      total: chargeData.amount,
    },
    stripeData: {
      intentId: paymentIntent.id,
      customerId: chargeData.customer,
      paymentMethodId: chargeData.payment_method,
    },
  });

  const [savedSale, saveError] = await asyncHandler(saleService.saveSale(sale));

  if (saveError) {
    return next(saveError);
  }

  return res.json({
    status: 'OK',
    savedSale,
  });
};

module.exports = ctrl;

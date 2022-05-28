const stripe = require('../config/stripe');

class StripeService {
  async createPaymentIntent(data) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.total,
      currency: 'MXN',
    });

    return paymentIntent;
  }

  async retrivePaymentIntent(id) {
    return await stripe.paymentIntents.retrive(id);
  }
}

module.exports = new StripeService();

import makeServerRequest from '../utils/makeServerRequest';

class StripeService {
  async createPaymentIntent(saleData) {
    const res = await makeServerRequest('/public/stripe/payment-intent', {
      method: 'POST',
      body: saleData,
      headers: { 'Content-Type': 'application/json' },
    });

    return res;
  }

  async saveSaleToDB(intentId) {}
}

export default new StripeService();

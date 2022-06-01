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

  async saveSaleToDB(intentId, saleData) {
    if (!saleData || saleData.cart?.items.length === 0)
      return { message: 'La orden no puede estar vacia' };

    const reqBody = {
      cart: saleData.cart,
      customer: {
        name: saleData.customer.name,
        phone: saleData.customer.phone,
      },
      address: saleData.customer.address,
      zip: saleData.customer.zip,
      intentId,
    };

    const res = await makeServerRequest('/public/stripe/sale', {
      method: 'POST',
      body: reqBody,
      headers: { 'Content-Type': 'application/json' },
    });

    return res;
  }
}

export default new StripeService();

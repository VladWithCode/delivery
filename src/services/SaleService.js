import makeServerRequest from '../utils/makeServerRequest';

class SaleService {
  async saveCashSale(saleData) {
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
    };

    return await makeServerRequest('/public/sales', {
      method: 'POST',
      body: reqBody,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export default new SaleService();

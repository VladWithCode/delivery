import asyncHandler from '../utils/asyncHandler';
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

  async getSales() {
    const [res, fetchError] = await asyncHandler(
      makeServerRequest('/public/sales', {
        useAuth: true,
      })
    );

    if (fetchError) {
      console.error(fetchError);
      return {
        toastMessage: 'Ocurrio un error al conectar con el servidor',
        failed: true,
      };
    }

    if (res.status !== 'OK') {
      res.error && console.error(res.error);

      return {
        toastMessage: res.message || 'Ocurrio un error al recuperar las ventas',
        failed: false,
      };
    }

    return { sales: res.sales, failed: false };
  }
}

export default new SaleService();

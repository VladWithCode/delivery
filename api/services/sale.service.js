const Sale = require('../models/Sale');

class SaleService {
  createSale({ customer, address, zip, cart, payment }) {
    const sale = new Sale({
      customer,
      address,
      zip,
      items: cart.items,
      payment,
    });

    return sale;
  }

  async saveSale(sale) {
    return await sale.save().lean();
  }
}

module.exports = new SaleService();

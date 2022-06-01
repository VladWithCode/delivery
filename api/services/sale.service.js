const Sale = require('../models/Sale');

class SaleService {
  createSale(saleData) {
    const sale = new Sale({
      ...saleData,
      customer: {
        name: saleData.customer.name,
        phone: saleData.customer.phone,
      },
      address: saleData.address,
    });

    return sale;
  }

  async getSale(id) {
    return await Sale.findOne({ _id: id }).lean();
  }

  async saveSale(sale) {
    return await sale.save();
  }
}

module.exports = new SaleService();

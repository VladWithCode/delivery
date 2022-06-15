const Sale = require('../models/Sale');
const { nanoid } = require('nanoid');

class SaleService {
  createSale(saleData) {
    const sale = new Sale({
      ...saleData,
      _id: nanoid(10),
      customer: {
        name: saleData.customer.name,
        phone: saleData.customer.phone,
      },
      address: saleData.address,
    });

    return sale;
  }

  async getSales() {
    return await Sale.find({}).sort({ createdAt: -1 });
  }

  async getSale(id) {
    return await Sale.findOne({ _id: id });
  }

  async saveSale(sale) {
    return await sale.save();
  }
}

module.exports = new SaleService();

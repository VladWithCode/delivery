const { Schema, model, Types } = require('mongoose');

const CartSchema = new Schema({
  user: { type: String, ref: 'User', required: true },
  subtotal: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  shipment: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  items: {
    type: [
      new Schema({
        product: { type: String, ref: 'Product', required: true },
        sku: { type: String },
        name: { type: String, required: true },
        qty: { type: Number, default: 1 },
        unitPrice: { type: Number },
        total: { type: Number },
      }),
    ],
  },
});

module.exports = model('Cart', CartSchema);

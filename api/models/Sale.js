const { model, Schema, SchemaTypes } = require('mongoose');

const SaleSchema = new Schema({
  customer: new Schema(
    {
      id: SchemaTypes.ObjectId,
      name: String,
      phone: String,
      email: String,
    },
    { _id: false }
  ),
  shippingAddress: {
    type: String,
    required: true,
  },
  zip: String,
  items: [
    {
      product: { type: SchemaTypes.ObjectId, ref: 'Product' },
      sku: String,
      name: String,
      qty: Number,
      unitPrice: Number,
      total: Number,
    },
  ],
  payment: new Schema(
    {
      method: { type: String, enum: ['card', 'cash', 'paypal'] },
      isPayed: { type: Boolean, default: false },
      payedOn: Date,
      subtotal: Number,
      tax: Number,
      shipment: Number,
      total: Number,
    },
    { _id: false }
  ),
  stripeData: {
    type: new Schema(
      {
        intentId: { type: String, required: true },
        customerId: String,
        paymentMethodId: String,
      },
      { _id: false }
    ),
    required: false,
  },
});

module.exports = model('Sale', SaleSchema);

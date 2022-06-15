const { model, Schema, SchemaTypes } = require('mongoose');
const { nanoid } = require('nanoid');

const SaleSchema = new Schema(
  {
    _id: { type: String, default: () => nanoid(10) },
    customer: new Schema(
      {
        id: String,
        name: String,
        phone: String,
        email: String,
      },
      { _id: false }
    ),
    address: {
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
    delivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
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
  },
  { timestamps: true, _id: false }
);

SaleSchema.pre('save', function (next) {
  if (this.isModified('delivered') && !this.deliveredAt) {
    this.deliveredAt = Date.now();
  }

  if (this.isModified('payment.isPayed') && !this.payment.payedOn) {
    this.payment.payedOn = Date.now();
  }

  next();
});

module.exports = model('Sale', SaleSchema);

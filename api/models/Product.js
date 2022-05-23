const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  sku: { type: String, immutable: true, unique: true },
  name: { type: String, required: true },
  slug: {
    type: String,
    default: function () {
      return this.name.split(' ').join('-');
    },
  },
  description: { type: String, maxlength: 160 },
  price: {
    type: String,
    validate: {
      validator: function (v) {
        if (Number.isNaN(+v)) return false;
        const d = parseInt(v).toFixed(2).split('.')[1];
        return !(d !== '00' && d.length > 0);
      },
      message: props => {
        if (Number.isNaN(props.value))
          return 'El valor introducido no es numerico';
        else
          return `El precio debe ser un numero entero. (Ej. ${(
            props.value * 10
          ).toFixed(0)})`;
      },
    },
  },
  imgs: { type: [String] },
  categories: {
    type: [String],
    set: v => (Array.isArray(v) ? v : v.split(',').map(c => c.trim())),
  },
  tags: {
    type: [String],
    set: v => (Array.isArray(v) ? v : v.split(',').map(c => c.trim())),
  },
  stock: { type: Number, default: 1 },
  absolutePath: { type: String },
  staticPath: { type: String },
});

module.exports = model('Product', ProductSchema);

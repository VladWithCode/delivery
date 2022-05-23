const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');

class CartService {
  calculateTotals(cart) {
    const tax = cart.tax;
    const shipment = cart.shipment;

    const itemsTotals = {};
    let total = tax + shipment;
    let subtotal = 0;

    for (const i of cart.items) {
      const totalPrice = i.price * i.qty;
      total += totalPrice;
      subtotal += totalPrice;

      itemsTotals[i.sku] = totalPrice;
    }

    return { total, subtotal, itemsTotals };
  }

  async getCart(id) {
    return await asyncHandler(Cart.findById(id).lean());
  }

  async addToCart(cartId, productSku, qty) {
    const [cart, findCartError] = await asyncHandler(Cart.findById(cartId));

    if (findCartError) return [false, findCartError];

    if (!cart)
      return [
        false,
        { status: 'NOT_FOUND', message: 'No se encontro el carrito' },
      ];

    const [product, findProductError] = await asyncHandler(
      Product.findOne({ sku: productSku }).lean()
    );

    if (findProductError) return [false, findProductError];

    if (product.stock < qty)
      return [
        false,
        { status: 'INSUFFICIENT_STOCK', message: 'Stock insuficiente' },
      ];

    let exists = false;
    let index = 0;

    for (const item of cart.items) {
      if (item.sku !== productSku) index++;
      else {
        exists = true;
        break;
      }
    }

    if (!exists) {
      cart.items.push({
        product: product._id,
        sku: product.sku,
        name: product.name,
        qty: qty,
        unitPrice: product.price,
        total: product.price * qty,
      });
    } else {
      const item = cart.items[index];

      cart.items[index] = {
        ...cart.items[index],
        qty: item.qty + qty,
        total: item.unitPrice * (item.qty + qty),
      };

      const { total, subtotal } = this.calculateTotals(cart);

      cart.subtotal = subtotal;
      cart.total = total;
    }

    const [, saveError] = await asyncHandler(cart.save());

    if (saveError) return [false, saveError];

    return [cart, false];
  }

  async updateItemQty(cartId, productSku, qty) {
    const [cart, findCartError] = await asyncHandler(Cart.findById(cartId));

    if (findCartError) return [false, findCartError];

    if (!cart)
      return [
        false,
        { status: 'NOT_FOUND', message: 'No se encontro el carrito' },
      ];

    const [product, findProductError] = await asyncHandler(
      Product.findOne({ sku: productSku }).select({ stock: 1 }).lean()
    );

    if (findProductError) return [false, findProductError];

    if (product.stock < qty)
      return [
        false,
        { status: 'INSUFFICIENT_STOCK', message: 'Stock insuficiente' },
      ];

    let exists = false;
    let index = 0;

    for (const item of cart.items) {
      if (item.sku !== productSku) index++;
      else {
        exists = true;
        break;
      }
    }

    if (!exists) {
      return [
        false,
        {
          status: 'NOT_IN_CART',
          message: 'El producto no se encuentra en el carrito',
        },
      ];
    } else {
      const item = cart.items[index];

      cart.items[index] = {
        ...cart.items[index],
        qty: qty,
        total: item.unitPrice * qty,
      };

      const { total, subtotal } = this.calculateTotals(cart);

      cart.subtotal = subtotal;
      cart.total = total;
    }

    const [, saveError] = await asyncHandler(cart.save());

    if (saveError) return [false, saveError];

    return [cart, false];
  }

  async removeFromCart(cartId, productSku) {
    const [cart, findCartError] = await asyncHandler(Cart.findById(cartId));

    if (findCartError) return [false, findCartError];

    if (!cart)
      return [
        false,
        { status: 'NOT_FOUND', message: 'No se encontro el carrito' },
      ];

    const index = cart.items.findIndex(i => i.sku === productSku);

    if (index < 0)
      return [
        false,
        {
          status: 'NOT_IN_CART',
          message: 'El producto no se encuentra en el carrito',
        },
      ];

    cart.items = cart.items.filter(i => i.sku !== productSku);

    const { total, subtotal } = this.calculateTotals(cart);

    cart.subtotal = subtotal;
    cart.total = total;

    const [, saveError] = await asyncHandler(cart.save());

    if (saveError) return [false, saveError];

    return [cart, false];
  }
}

module.exports = new CartService();

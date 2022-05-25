import makeServerRequest from '../utils/makeServerRequest';

class CartService {
  useLocalCart = false;

  // Service Methods
  async initCart(isUserLogged) {
    this.useLocalCart = !isUserLogged;

    if (this.useLocalCart) {
      let cart = this.#getLocalCart();

      if (!cart) {
        cart = {
          subtotal: 0,
          tax: 0,
          shipment: 0,
          total: 0,
          items: [],
        };

        localStorage.setItem('cart', JSON.stringify(cart));
      }

      return cart;
    } else {
      return await this.#getDBCart();
    }
  }

  async updateCart(newCart) {
    if (this.useLocalCart) {
      this.#updateLocalCart(newCart);
      return this.#getLocalCart();
    } else {
      return await this.#updateDBCart(newCart);
    }
  }

  async addToCart(item, qty = 1) {
    if (this.useLocalCart) {
      return await this.#addToLocalCart(item, qty);
    } else {
      return await this.#addToDBCart(item, qty);
    }
  }

  async updateItemQty(itemId, qty) {
    if (this.useLocalCart) {
      return this.#updateLocalItemQty(itemId, qty);
    } else {
      return await this.#updateDBItemQty(itemId, qty);
    }
  }

  async removeFromCart(itemId) {
    if (this.useLocalCart) {
      return this.#removeFromLocalCart(itemId);
    } else {
      return await this.#removeFromDBCart(itemId);
    }
  }

  // Local Cart Methods
  #getLocalCart() {
    try {
      const strCart = localStorage.getItem('cart');

      if (!strCart || strCart.length === 0) return null;

      return JSON.parse(strCart);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  #updateLocalCart(newCart) {
    localStorage.setItem('cart', JSON.stringify(newCart));
  }

  async #addToLocalCart(item, qty) {
    const { product } = await makeServerRequest('/public/products/' + item._id);
    const newCart = this.#getLocalCart();
    const newItems = [];
    let newSubtotal = 0;
    let isInCart = false;

    for (const i of newCart.items) {
      if (i._id === product._id) {
        isInCart = true;
        i.qty = i.qty + qty;
        i.totalPrice = +(product.price * i.qty).toFixed(2);
      }

      newSubtotal += i.totalPrice;
      newItems.push(i);
    }

    if (!isInCart) {
      newItems.push({
        ...item,
        _id: undefined,
        product: product._id,
        imgs: product.imgs,
        qty: qty,
        totalPrice: +(item.price * qty).toFixed(2),
      });
    }

    newCart.items = newItems;
    newCart.subtotal = newSubtotal;
    newCart.total = newSubtotal + newCart.tax + newCart.shipment;

    this.#updateLocalCart(newCart);
    return newCart;
  }

  #updateLocalItemQty(itemId, qty) {
    const newCart = this.#getLocalCart();
    const newItems = [];
    let newSubtotal = 0;

    for (const i of newCart.items) {
      if (i.product === itemId) {
        i.qty = qty;
        i.totalPrice = +(i.price * i.qty).toFixed(2);
      }

      newSubtotal += i.totalPrice;
      newItems.push(i);
    }

    newCart.items = newItems;
    newCart.subtotal = newSubtotal;
    newCart.total = newSubtotal + newCart.tax + newCart.shipment;

    this.#updateLocalCart(newCart);
    return newCart;
  }

  #removeFromLocalCart(itemId) {
    const newCart = this.#getLocalCart();
    const newItems = [];
    let newSubtotal = 0;

    for (const i of newCart.items) {
      if (i.product !== itemId) {
        newItems.push(i);
        newSubtotal += i.totalPrice || i.price * i.qty;
      }
    }

    newCart.subtotal = newSubtotal;
    newCart.total = newSubtotal + newCart.tax + newCart.shipment;

    this.#updateLocalCart(newCart);
    return newCart;
  }

  // DB Cart Methods
  async #getDBCart() {
    const res = await makeServerRequest('/public/cart', {
      method: 'GET',
      useAuth: true,
    });

    if (res.status !== 'OK' && res.status !== 'NO_CART') {
      console.error(res.error || res.message);
      throw new Error(res.message || res.error.message);
    } else if (res.status === 'NO_CART') {
      const createResponse = await makeServerRequest('/public/cart', {
        method: 'POST',
        useAuth: true,
      });

      if (
        createResponse.status !== 'OK' &&
        createResponse.status !== 'EXISTING_CART'
      ) {
        console.error(res.error || res.message);
        throw { ...res.error, message: res.message || res.error.message };
      }

      return createResponse.cart;
    }

    return res.cart;
  }

  async #updateDBCart(newCart) {
    const res = await makeServerRequest('/public/cart', {
      method: 'PUT',
      body: newCart,
      headers: {
        'Content-Type': 'application/json',
      },
      useAuth: true,
    });

    if (res.status !== 'OK') {
      console.error(res.error || res.message);
      throw new Error(res.message || res.error.message);
    }

    return res.cart;
  }

  async #addToDBCart(item, qty) {
    const res = await makeServerRequest('/public/cart/item', {
      method: 'PATCH',
      body: { itemId: item._id, qty },
      headers: { 'Content-Type': 'application/json' },
      useAuth: true,
    });

    if (res.status !== 'OK') {
      console.error(res.error || res.message);
      throw new Error(res.message || res.error.message);
    }

    return res.cart;
  }

  async #updateDBItemQty(itemId, qty) {
    const res = await makeServerRequest('/public/cart/item', {
      method: 'PUT',
      body: { itemId, qty },
      headers: { 'Content-Type': 'application/json' },
      useAuth: true,
    });

    if (res.status !== 'OK') {
      console.error(res.error || res.message);
      throw new Error(res.message || res.error.message);
    }

    return res.cart;
  }

  async #removeFromDBCart(itemId) {
    const res = await makeServerRequest('/public/cart/item', {
      method: 'DELETE',
      body: { itemId },
      headers: { 'Content-Type': 'application/json' },
      useAuth: true,
    });

    if (res.status !== 'OK') {
      console.error(res.error || res.message);
      throw new Error(res.message || res.error.message);
    }

    return res.cart;
  }
}

export default new CartService();

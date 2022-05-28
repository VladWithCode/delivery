const cartService = require('../services/cart.service');

const ctrl = {};

ctrl.createCart = () => {};

ctrl.getCart = (req, res, next) => {
  const {id} = req.params;

  const [cart, findError] = await cartService.getCart(id);

  if (findError) return next(findError);

  return res.json({
    status: 'OK',
    cart
  })
}

ctrl.updateCart = (req, res, next) => {

};

ctrl.addToCart = (req, res, next) => {
  const {id} = req.params;
  const { productSku, qty } = req.body;

  const [cart, addError] = await cartService.addToDBCart(id, productSku, qty);

  if (addError) return next(addError);

  return res.json({
    status: 'OK',
    cart,
  })
}

ctrl.updateItemQty = (req, res, next) => {
  const {id} = req.params;
  const { productSku, qty } = req.body;

  const [cart, updateError] = await cartService.updateDBCartItemQty(id, productSku, qty);

  if (updateError) return next(updateError);

  return res.json({
    status: 'OK',
    cart,
  })
}

ctrl.deleteFromCart = (req, res, next) => {
  const { id } = req.params;
  const { productSku } = req.body;

  const [cart, deleteError] = await cartService.removeFromDBCart(id, productSku);

  if (deleteError) return next(deleteError);

  return res.json({
    status: 'OK',
    cart
  })
}


module.exports = ctrl;

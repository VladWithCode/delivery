const asyncHandler = require('../utils/asyncHandler');
const saleService = require('../services/sale.service');
const cartService = require('../services/cart.service');

const ctrl = {};

ctrl.getSale = async (req, res, next) => {
  const { id } = req.params;

  const [sale, findError] = await asyncHandler(saleService.getSale(id));

  if (findError) return next(findError);

  if (!sale)
    return res.json({
      status: 'NOT_FOUND',
      message: 'No se encontro venta con el id proporcionado',
    });

  if (req.isPublicRequest)
    return res.json({
      status: 'OK',
      sale: {
        ...sale,
        stripeData: undefined,
      },
    });

  return res.json({
    status: 'OK',
    sale,
  });
};

ctrl.saveSale = async (req, res, next) => {
  const { cart, customer, address, zip, intentId } = req.body;

  const [totals, calculateError] = await asyncHandler(
    cartService.calculateTotals(cart)
  );

  if (calculateError) return next(calculateError);

  const sale = saleService.createSale({
    customer,
    address,
    zip,
    items: cart.items.map(i => ({ ...i, total: totals.itemTotals[i.sku] })),
    payment: {
      method: 'cash',
      isPayed: false,
      payedOn: null,
      subtotal: totals.total,
      tax: cart.tax || 0,
      shipment: cart.shipment || 0,
      total: totals.total + (cart.tax || 0) + (cart.shipment || 0),
    },
  });

  const [savedSale, saveError] = await asyncHandler(saleService.saveSale(sale));

  if (saveError) return next(saveError);

  return res.json({
    status: 'OK',
    sale: savedSale,
  });
};

module.exports = ctrl;

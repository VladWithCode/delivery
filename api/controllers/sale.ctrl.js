const asyncHandler = require('../utils/asyncHandler');
const saleService = require('../services/sale.service');

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

module.exports = ctrl;

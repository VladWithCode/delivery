const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../../controllers/product.ctrl');

const Router = require('express').Router;

const router = Router();

router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;

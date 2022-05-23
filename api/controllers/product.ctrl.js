const path = require('path');
const { nanoid } = require('nanoid');
const { publicDirPath } = require('../config/globals');
const {
  createDirectory,
  deleteFileOrDirectory,
  writeFile,
} = require('../utils/fileHelpers');
const asyncHandler = require('../utils/asyncHandler');
const Product = require('../models/Product');
const ProductSuscriber = require('../subscribers/product.suscriber');

const ctrl = {};

ctrl.createProduct = async (req, res, next) => {
  const productData = req.body;
  const imgs = req.files?.imgs;

  const product = new Product(productData);

  product.sku = nanoid(8);
  product.absolutePath = path.join(publicDirPath, '/products', product.sku);
  product.staticPath = `/files/products/${product.sku}`;

  const [, createDirectoryError] = await asyncHandler(
    createDirectory(product.absolutePath, true)
  );

  if (createDirectoryError) return next(createDirectoryError);

  // Add new images to the product and write them to disk
  if (imgs && imgs.length > 0) {
    const writeImagesPromises = [];

    imgs.forEach(img => {
      product.imgs.push(`${product.staticPath}/${img.name}`);

      writeImagesPromises.push(
        writeFile(path.join(product.absolutePath, img.name), img.data)
      );
    });

    const [, writeImagesError] = await asyncHandler(
      Promise.all(writeImagesPromises)
    );

    if (writeImagesError) return next(writeImagesError);
  }

  const [, saveError] = await asyncHandler(product.save());

  if (saveError) {
    ProductSuscriber.emit('createError', product);
    return next(saveError);
  }

  return res.json({
    status: 'OK',
    product,
  });
};

ctrl.getProducts = async (req, res, next) => {
  const { skus, names, ctgs, tags, limit, skip } = req.query;

  const queryFilter = {};

  if (names) {
    queryFilter.name = names.split(',');
  }

  if (skus) {
    queryFilter.sku = skus.split(',');
  }

  if (ctgs) {
    queryFilter.categories = ctgs.split(',');
  }

  if (tags) {
    queryFilter.tags = tags.split(',');
  }

  const [products, findError] = await asyncHandler(
    Product.find(queryFilter)
      .limit(+limit || 0)
      .skip(+skip || 0)
      .lean()
  );

  if (findError) return next(findError);

  if ((names || ctgs) && (!products || products.length === 0)) {
    return res.json({
      status: 'NOT_FOUND',
      message: 'No se encontraron productos',
    });
  }

  return res.json({
    status: 'OK',
    products,
  });
};

ctrl.getProduct = async (req, res, next) => {
  const { id } = req.params;

  const [product, findError] = await asyncHandler(Product.findById(id).lean());

  if (findError) return next(findError);

  if (!product) {
    return res.json({
      status: 'NOT_FOUND',
      message: `No se encontró producto con id: ${id}`,
    });
  }

  return res.json({
    status: 'OK',
    product,
  });
};

ctrl.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const productData = req.body;
  const imgs = req.files?.imgs;

  const [product, findError] = await asyncHandler(Product.findById(id));

  if (findError) return next(findError);

  if (!product) {
    return res.json({
      status: 'NOT_FOUND',
      message: `No se encontró producto con id: ${id}`,
    });
  }

  product.set(productData);

  // Remove images from product and disk
  if (imgs && imgs.length < product.imgs.length) {
    const deleteImagesPromises = [];

    product.imgs = product.imgs.filter(img => {
      const keepImg = imgs.includes(img);

      if (!keepImg)
        deleteImagesPromises.push(
          deleteFileOrDirectory(
            path.join(product.absolutePath, path.basename(img)),
            true
          )
        );

      return keepImg;
    });

    const [, deleteImagesError] = await asyncHandler(
      Promise.all(deleteImagesPromises)
    );

    if (deleteImagesError) return next(deleteImagesError);
  }

  // Add new images to the product and write them to disk
  if (imgs && imgs.length > 0) {
    const writeImagesPromises = [];

    imgs.forEach(img => {
      product.imgs.push(`${product.staticPath}/${img.name}`);

      writeImagesPromises.push(
        writeFile(path.join(product.absolutePath, img.name), img.data)
      );
    });

    const [, writeImagesError] = await asyncHandler(
      Promise.all(writeImagesPromises)
    );

    if (writeImagesError) return next(writeImagesError);
  }

  const [, saveError] = await asyncHandler(product.save());

  if (saveError) return next(saveError);

  return res.json({
    status: 'OK',
    product,
  });
};

ctrl.deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  const [product, findError] = await asyncHandler(Product.findById(id));

  if (findError) return next(findError);

  if (!product) {
    return res.json({
      status: 'NOT_FOUND',
      message: `No se encontró producto con id: ${id}`,
    });
  }

  const [, removeError] = await asyncHandler(product.remove());

  if (removeError) return next(err);

  const [, rmDirectoryError] = await asyncHandler(
    deleteFileOrDirectory(product.absolutePath, true)
  );

  if (rmDirectoryError) console.log(rmDirectoryError);

  return res.json({
    status: 'OK',
    message: `Se eliminó el producto con id: ${id}`,
  });
};

module.exports = ctrl;

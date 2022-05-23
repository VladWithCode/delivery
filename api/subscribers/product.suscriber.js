const events = require('events');
const asyncHandler = require('../utils/asyncHandler');
const { deleteFileOrDirectory } = require('../utils/fileHelpers');

const ProductSuscriber = new events.EventEmitter();

ProductSuscriber.on('createError', async product => {
  try {
    const [, deleteDirError] = await asyncHandler(
      deleteFileOrDirectory(product.absolutePath, true)
    );

    if (deleteDirError) console.log(deleteDirError);
  } catch (err) {
    console.log('oof');
  }
});

module.exports = ProductSuscriber;

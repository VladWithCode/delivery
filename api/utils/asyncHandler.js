const asyncHandler = async p => {
  try {
    return [await p, null];
  } catch (e) {
    return [null, e];
  }
};

module.exports = asyncHandler;

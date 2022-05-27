const asyncHandler = async p => {
  try {
    return [await p, null];
  } catch (err) {
    return [null, err];
  }
};

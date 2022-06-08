exports.isEmptyObject = o => {
  if (!o || Object.keys(o).length === 0) return true;

  return false;
};

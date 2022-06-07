export const priceToString = price => {
  const d = String(price).slice(-2);
  const int = String(price).slice(0, -2);

  return `${parseInt(int || 0).toLocaleString()}.${d > 0 ? d : '00'}`;
};

export const isEmptyObject = o => {
  if (!o || Object.keys(o).length === 0) return true;

  return false;
};

export const recursiveBinarySearch = (list = [], target) => {
  if (list.length === 0) return false;

  let mid = Math.floor(list.length / 2);

  if (list[mid] === target) return true;

  if (list[mid] < target)
    return recursiveBinarySearch(list.slice(mid + 1), target);

  return recursiveBinarySearch(list.slice(0, mid), target);
};

export const dateToReadableString = date => {
  if (!date) return '';
  const safeDate = date instanceof Date ? date : new Date(date);

  return new Intl.DateTimeFormat('es-mx', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(safeDate);
};

export const priceToString = price => {
  const d = String(price).slice(-2);
  const int = String(price).slice(0, -2);

  return `${parseInt(int || 0).toLocaleString()}.${d || '00'}`;
};

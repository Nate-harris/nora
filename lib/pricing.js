export const MIN_NAME_LENGTH = 3;
export const MAX_NAME_LENGTH = 7;

export const NAME_PRICE_BY_LENGTH = {
  3: 9500,
  4: 11500,
  5: 13000,
  6: 15000,
  7: 16500,
};

export const calculateNamePrice = (length) => {
  const normalizedLength = Math.max(
    0,
    Math.min(Number(length) || 0, MAX_NAME_LENGTH)
  );

  if (normalizedLength < MIN_NAME_LENGTH) return 0;

  return NAME_PRICE_BY_LENGTH[normalizedLength] || 0;
};

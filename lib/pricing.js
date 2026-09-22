export const MIN_NAME_LENGTH = 3;
export const MAX_NAME_LENGTH = 7;
export const BASE_PUZZLE_PRICE = 9500;
export const ADDITIONAL_LETTER_PRICE = 2500;

export const calculateNamePrice = (length) => {
  const normalizedLength = Math.max(
    0,
    Math.min(Number(length) || 0, MAX_NAME_LENGTH)
  );

  if (normalizedLength < MIN_NAME_LENGTH) return 0;

  return (
    BASE_PUZZLE_PRICE +
    (normalizedLength - MIN_NAME_LENGTH) * ADDITIONAL_LETTER_PRICE
  );
};

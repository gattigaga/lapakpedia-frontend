/**
 * Format amount to currency format
 *
 * @param {number} [amount=0] - Amount to be formatted
 */
export const toCurrency = (amount = 0) =>
  amount.toLocaleString("en-US", { maximumSignificantDigits: 3 });

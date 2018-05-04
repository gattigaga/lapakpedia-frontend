import { split, slice, join, compose } from "lodash/fp";

/**
 * Format amount to currency format
 *
 * @param {number} [amount=0] - Amount to be formatted
 */
export const toCurrency = (amount = 0) =>
  amount.toLocaleString("en-US", { maximumSignificantDigits: 3 });

/**
 * Cut text to make an excerpt
 *
 * @param {number} totalWords - Total words you want to get
 * @param {number} words - Words you want to cut
 * @returns
 */
export const cutText = (totalWords, words) => {
  const cut = compose(join(" "), slice(0, totalWords), split(" "));
  const result = `${cut(words)}...`;

  return result;
};

/**
 * Capitalize first character in a word
 *
 * @param {any} words - Words you want to capitalize
 */
export const capitalize = words =>
  words.replace(/\b\w/g, firstChar => firstChar.toUpperCase());

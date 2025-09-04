import BigNumber from 'bignumber.js';

/**
 * Formats a number or string value using BigNumber formatting with locale-appropriate separators.
 *
 * @param value - The numeric value to format, can be a number or string representation
 * @returns The formatted number string with appropriate thousand separators and decimal formatting
 *
 * @example
 * ```typescript
 * formatNumber(1234.56) // Returns "1,234.56"
 * formatNumber("1000000") // Returns "1,000,000"
 * ```
 */
const formatNumber = (value: number | string) =>
  new BigNumber(value).toFormat();

export default formatNumber;

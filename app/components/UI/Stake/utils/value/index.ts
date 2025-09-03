import BigNumber from 'bignumber.js';
import {
  getPowerOfTen,
  bnOne,
  getValueAsBn,
  bnZero,
  multiplyValueByPowerOfTen,
} from '../bignumber';

export enum CommonPercentageInputUnits {
  BASIS_POINTS = 'BASIS_POINTS',
  DECIMALS = 'DECIMALS',
  PERCENTAGE = 'PERCENTAGE',
}

export enum PercentageOutputFormat {
  BASIS_POINTS = 'BASIS_POINTS',
  DECIMAL = 'DECIMAL',
  PERCENT_SIGN = 'PERCENT_SIGN',
}

// 1bp = 0.01% = 0.0001 -> 10bp = 0.1% = 0.001 -> 100bp = 1% = 0.01
const CommonPercentageInputUnitsAsE: Record<
  CommonPercentageInputUnits,
  number
> = {
  [CommonPercentageInputUnits.BASIS_POINTS]: 2, // 100 bp
  [CommonPercentageInputUnits.DECIMALS]: -2, // .01
  [CommonPercentageInputUnits.PERCENTAGE]: 0, // 1% or 1 percentage point
};

const percentageOutputE = {
  [PercentageOutputFormat.BASIS_POINTS]:
    CommonPercentageInputUnitsAsE[CommonPercentageInputUnits.BASIS_POINTS],
  [PercentageOutputFormat.DECIMAL]:
    CommonPercentageInputUnitsAsE[CommonPercentageInputUnits.DECIMALS],
  [PercentageOutputFormat.PERCENT_SIGN]:
    CommonPercentageInputUnitsAsE[CommonPercentageInputUnits.PERCENTAGE],
};

/**
 * Determines if a value is equal to or above an evaluated `exponent`, or equal to or below its evaluated inverse
 * @param {BigNumber} value - The BigNumber value to check
 * @param {number} exponent - The exponent to compare against
 * @returns {boolean} True if the value meets the magnitude criteria, false otherwise
 */
export const isEqualOrGreaterOrderOfMagnitude = (
  value: BigNumber,
  exponent: number,
): boolean => {
  if (value.eq(bnZero)) return false;
  return (
    (value.gte(bnOne) && value.gte(getPowerOfTen(exponent))) ||
    value.lte(bnOne.dividedBy(getPowerOfTen(exponent)))
  );
};

/**
 * Fixes a value to a specified number of decimal places, using either standard or scientific notation based on the exponent limit
 * @param {BigNumber | string | number} value - The value to format
 * @param {number} fixed - Number of decimal places to display (default: 2)
 * @param {number} exponentLimit - Threshold for switching to scientific notation (default: 21)
 * @param {BigNumber.RoundingMode} roundingMode - Rounding mode to use (default: ROUND_DOWN)
 * @returns {string} The formatted value as a string
 */
export const fixDisplayAmount = (
  value: BigNumber | string | number,
  fixed = 2,
  exponentLimit = 21,
  roundingMode: BigNumber.RoundingMode = BigNumber.ROUND_DOWN,
): string => {
  const valueAsBn = getValueAsBn(value);
  const absoluteExponent = Math.abs(exponentLimit);
  if (isEqualOrGreaterOrderOfMagnitude(valueAsBn, absoluteExponent)) {
    return valueAsBn.toExponential(fixed);
  }
  return valueAsBn.toFixed(fixed, roundingMode);
};

/**
 * Formats a percentage value from one unit format to another with optional decimal precision
 * @param {string | number} value - The percentage value to format
 * @param {Object} options - Formatting options
 * @param {CommonPercentageInputUnits | number} options.inputFormat - Input format (basis points, decimals, percentage, or custom exponent)
 * @param {PercentageOutputFormat} options.outputFormat - Output format (basis points, decimal, or percent sign)
 * @param {number} options.fixed - Number of decimal places to display (optional)
 * @returns {string} The formatted percentage string with appropriate unit suffix
 * @throws {Error} If fixed is a negative number
 */
export const formatPercent = (
  value: string | number,
  {
    inputFormat,
    outputFormat,
    fixed,
  }: {
    inputFormat: CommonPercentageInputUnits | number;
    outputFormat: PercentageOutputFormat;
    fixed?: number;
  },
): string => {
  if (typeof fixed === 'number' && fixed < 0) {
    throw new Error(
      `Cannot convert a number to negative number of fixed places. Tried: ${fixed}`,
    );
  }

  const inputE =
    typeof inputFormat === 'number'
      ? inputFormat
      : CommonPercentageInputUnitsAsE[inputFormat];
  const scientificNotation = multiplyValueByPowerOfTen(value, inputE * -1);
  const displayE = percentageOutputE[outputFormat];
  const resultValue = multiplyValueByPowerOfTen(scientificNotation, displayE);
  const displayValue =
    typeof fixed === 'number'
      ? resultValue.toFixed(fixed, BigNumber.ROUND_HALF_UP)
      : resultValue.toString();

  switch (outputFormat) {
    case PercentageOutputFormat.BASIS_POINTS:
      return `${displayValue} ${
        new BigNumber(displayValue).abs().eq(1) ? 'bp' : 'bps'
      }`;
    case PercentageOutputFormat.DECIMAL:
      return displayValue;
    case PercentageOutputFormat.PERCENT_SIGN:
    default:
      return `${displayValue}%`;
  }
};

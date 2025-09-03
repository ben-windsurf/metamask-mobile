/**
 * BigNumber utility functions for staking calculations
 * Provides common BigNumber operations and constants for precise decimal arithmetic
 */
import BigNumber from 'bignumber.js';

export enum BigNumberUtilsReturnFormat {
  NUMBER = 'NUMBER',
  BN = 'BN',
  STRING = 'STRING',
}

export type BigNumberUtilsReturnType = BigNumber | number | string;

/** BigNumber constant representing zero */
export const bnZero = new BigNumber(0);
/** BigNumber constant representing one */
export const bnOne = new BigNumber(1);
/** BigNumber constant representing ten */
export const bnTen = new BigNumber(10);

/**
 * Gets ten raised to the specified power as a BigNumber
 * @param {number} pow - The power to raise ten to
 * @returns {BigNumber} Ten raised to the specified power
 */
export const getPowerOfTen = (pow: number): BigNumber => bnTen.pow(pow);

/**
 * Converts a value to a BigNumber instance
 * @param {BigNumber | string | number} value - The value to convert
 * @returns {BigNumber} The value as a BigNumber instance
 */
export const getValueAsBn = (value: BigNumber | string | number): BigNumber =>
  typeof value === 'string' || typeof value === 'number'
    ? new BigNumber(value)
    : value;

/**
 * Multiplies a value by ten raised to the specified power
 * Handles edge cases with infinity values to prevent NaN results
 * @param {BigNumber | string | number} value - The value to multiply
 * @param {number} pow - The power of ten to multiply by
 * @returns {BigNumber} The result of value * (10 ^ pow)
 */
export const multiplyValueByPowerOfTen = (
  value: BigNumber | string | number,
  pow: number,
): BigNumber => {
  const valueAsBn = getValueAsBn(value);
  const power = getPowerOfTen(pow);

  let override;
  // 0 * Number.POSITIVE_INFINITY is NaN, but this is a weird outcome so let's say it equals 0
  if (valueAsBn.eq(0) && power.eq(Number.POSITIVE_INFINITY)) override = bnZero;
  if (valueAsBn.eq(Number.POSITIVE_INFINITY) && power.eq(0)) override = bnZero;
  if (valueAsBn.eq(Number.NEGATIVE_INFINITY) && power.eq(0)) override = bnZero;

  const calculated = override || valueAsBn.multipliedBy(power);
  return calculated;
};

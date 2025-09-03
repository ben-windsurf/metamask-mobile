/**
 * Gas utility constants for Ethereum transaction gas calculations
 * Provides standard increments and minimum values for gas limit and gas price
 */
import BigNumber from 'bignumber.js';

/**
 * Standard increment value for gas limit adjustments
 * @type {BigNumber}
 */
export const GAS_LIMIT_INCREMENT = new BigNumber(1000);

/**
 * Standard increment value for gas price adjustments
 * @type {BigNumber}
 */
export const GAS_PRICE_INCREMENT = new BigNumber(1);

/**
 * Minimum gas limit for Ethereum transactions (standard transfer)
 * @type {BigNumber}
 */
export const GAS_LIMIT_MIN = new BigNumber(21000);

/**
 * Minimum gas price value
 * @type {BigNumber}
 */
export const GAS_PRICE_MIN = new BigNumber(0);

import BigNumber from 'bignumber.js';

/**
 * Gas limit increment value used for adjusting gas estimates.
 * Represents the amount by which gas limit can be increased.
 */
export const GAS_LIMIT_INCREMENT = new BigNumber(1000);

/**
 * Gas price increment value used for adjusting gas price estimates.
 * Represents the minimum amount by which gas price can be increased.
 */
export const GAS_PRICE_INCREMENT = new BigNumber(1);

/**
 * Minimum gas limit required for Ethereum transactions.
 * Standard minimum gas limit for simple ETH transfers.
 */
export const GAS_LIMIT_MIN = new BigNumber(21000);

/**
 * Minimum gas price value.
 * Represents the lowest possible gas price (0 wei).
 */
export const GAS_PRICE_MIN = new BigNumber(0);

import BigNumber from 'bignumber.js';
import { addHexPrefix } from './number';

import {
  conversionUtil,
  addCurrencies,
  multiplyCurrencies,
  conversionGreaterThan,
} from './conversion';
import I18n from '../../locales/i18n';
import { getIntlNumberFormatter } from './intl';

const NON_ISO4217_CRYPTO_CODES = [
  '1ST',
  'DASH',
  'MYST',
  'PTOY',
  'QTUM',
  'SC',
  'SNGLS',
  'STORJ',
  'STEEM',
  'TIME',
  'TRST',
  'USDC',
  'USDT',
  'WINGS',
  'ZEC',
];

/**
 * Increases the last gas price by 10% for transaction replacement
 * @param {string} lastGasPrice - The previous gas price in hex format
 * @returns {string} The increased gas price with hex prefix
 */
export function increaseLastGasPrice(lastGasPrice) {
  return addHexPrefix(
    multiplyCurrencies(lastGasPrice || '0x0', 1.1, {
      multiplicandBase: 16,
      multiplierBase: 10,
      toNumericBase: 'hex',
    }),
  );
}

/**
 * Compares two hex values to determine if the first is greater than the second
 * @param {string} a - First hex value to compare
 * @param {string} b - Second hex value to compare
 * @returns {boolean} True if a is greater than b, false otherwise
 */
export function hexGreaterThan(a, b) {
  return conversionGreaterThan(
    { value: a, fromNumericBase: 'hex' },
    { value: b, fromNumericBase: 'hex' },
  );
}

/**
 * Calculates the total gas cost by multiplying gas limit and gas price
 * @param {Object} params - Gas calculation parameters
 * @param {string} params.gasLimit - The gas limit in hex format
 * @param {string} params.gasPrice - The gas price in hex format
 * @returns {string} The total gas cost in hex format with prefix
 */
export function getHexGasTotal({ gasLimit, gasPrice }) {
  return addHexPrefix(
    multiplyCurrencies(gasLimit || '0x0', gasPrice || '0x0', {
      toNumericBase: 'hex',
      multiplicandBase: 16,
      multiplierBase: 16,
    }),
  );
}

/**
 * Adds multiple ETH amounts together with 6 decimal precision
 * @param {...string} args - Variable number of ETH amounts to add
 * @returns {string} The sum of all ETH amounts as a decimal string
 */
export function addEth(...args) {
  return args.reduce((acc, ethAmount) =>
    addCurrencies(acc, ethAmount, {
      toNumericBase: 'dec',
      numberOfDecimals: 6,
      aBase: 10,
      bBase: 10,
    }),
  );
}

/**
 * Adds multiple fiat amounts together with 2 decimal precision
 * @param {...string} args - Variable number of fiat amounts to add
 * @returns {string} The sum of all fiat amounts as a decimal string
 */
export function addFiat(...args) {
  return args.reduce((acc, fiatAmount) =>
    addCurrencies(acc, fiatAmount, {
      toNumericBase: 'dec',
      numberOfDecimals: 2,
      aBase: 10,
      bBase: 10,
    }),
  );
}

/**
 * Converts a value from Wei hex format to the specified currency and denomination
 * @param {Object} params - Conversion parameters
 * @param {string} params.value - The value in Wei hex format to convert
 * @param {string} params.fromCurrency - Source currency (default: 'ETH')
 * @param {string} params.toCurrency - Target currency for conversion
 * @param {number} params.conversionRate - Exchange rate for currency conversion
 * @param {number} params.numberOfDecimals - Number of decimal places in result
 * @param {string} params.toDenomination - Target denomination for the result
 * @returns {string} The converted value as a decimal string
 */
export function getValueFromWeiHex({
  value,
  fromCurrency = 'ETH',
  toCurrency,
  conversionRate,
  numberOfDecimals,
  toDenomination,
}) {
  return conversionUtil(value, {
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
    fromCurrency,
    toCurrency,
    numberOfDecimals,
    fromDenomination: 'WEI',
    toDenomination,
    conversionRate,
  });
}

/**
 * Calculates transaction fee by converting from BigNumber Wei to decimal currency
 * @param {Object} params - Fee calculation parameters
 * @param {string} params.value - The fee value in BigNumber format
 * @param {string} params.fromCurrency - Source currency (default: 'ETH')
 * @param {string} params.toCurrency - Target currency for conversion
 * @param {number} params.conversionRate - Exchange rate for currency conversion
 * @param {number} params.numberOfDecimals - Number of decimal places in result
 * @returns {string} The transaction fee as a decimal string
 */
export function getTransactionFee({
  value,
  fromCurrency = 'ETH',
  toCurrency,
  conversionRate,
  numberOfDecimals,
}) {
  return conversionUtil(value, {
    fromNumericBase: 'BN',
    toNumericBase: 'dec',
    fromDenomination: 'WEI',
    fromCurrency,
    toCurrency,
    numberOfDecimals,
    conversionRate,
  });
}

/**
 * Formats a numeric value as currency using appropriate formatting rules
 * @param {string|number} value - The numeric value to format
 * @param {string} currencyCode - The currency code for formatting
 * @returns {string} The formatted currency string
 */
export function formatCurrency(value, currencyCode) {
  const upperCaseCurrencyCode = currencyCode.toUpperCase();

  const formatedCurrency = NON_ISO4217_CRYPTO_CODES.includes(
    upperCaseCurrencyCode,
  )
    ? `${Number(value)} ${upperCaseCurrencyCode}`
    : getIntlNumberFormatter(I18n.locale, {
        currency: upperCaseCurrencyCode,
        style: 'currency',
      }).format(Number(value));

  return formatedCurrency;
}

/**
 * Converts token value to fiat currency using contract and base exchange rates
 * @param {Object} params - Conversion parameters
 * @param {string} params.value - The token value to convert
 * @param {string} params.fromCurrency - Source currency (default: 'ETH')
 * @param {string} params.toCurrency - Target fiat currency
 * @param {number} params.conversionRate - Base currency to fiat exchange rate
 * @param {number} params.contractExchangeRate - Token to base currency exchange rate
 * @returns {number} The converted fiat value, or 0 if no contract exchange rate
 */
export function convertTokenToFiat({
  value,
  fromCurrency = 'ETH',
  toCurrency,
  conversionRate,
  contractExchangeRate,
}) {
  if (!contractExchangeRate) return 0;
  const totalExchangeRate = conversionRate * contractExchangeRate;

  return conversionUtil(value, {
    fromNumericBase: 'dec',
    toNumericBase: 'dec',
    fromCurrency,
    toCurrency,
    numberOfDecimals: 2,
    conversionRate: totalExchangeRate,
  });
}

/**
 * Rounds the given decimal string to 4 significant digits.
 *
 * @param {string} decimalString - The base-ten number to round.
 * @returns {string} The rounded number, or the original number if no
 * rounding was necessary.
 */
export function roundExponential(decimalString) {
  const PRECISION = 4;
  const bigNumberValue = new BigNumber(decimalString);

  // In JS, numbers with exponentials greater than 20 get displayed as an exponential.
  return bigNumberValue.e > 20
    ? bigNumberValue.toPrecision(PRECISION)
    : decimalString;
}

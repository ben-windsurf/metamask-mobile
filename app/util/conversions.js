/**
 * Currency conversion utilities for Ethereum values
 * Provides functions for converting between different numeric bases and denominations
 * including hex/decimal conversions and ETH/WEI/GWEI transformations
 */
import { hexToBN } from '@metamask/controller-utils';
import { ETH, GWEI, WEI } from './custom-gas';
import {
  conversionUtil,
  addCurrencies,
  subtractCurrencies,
} from './conversion';
import { formatCurrency } from './confirm-tx.js';
import { addHexPrefix } from './number';

/**
 * Converts a hexadecimal value to decimal
 * @param {string} hexValue - The hexadecimal value to convert
 * @returns {string} The decimal representation of the hex value
 */
export function hexToDecimal(hexValue) {
  return conversionUtil(hexValue, {
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
  });
}

/**
 * Converts a decimal value to hexadecimal
 * @param {string|number} decimal - The decimal value to convert
 * @returns {string} The hexadecimal representation of the decimal value
 */
export function decimalToHex(decimal) {
  return conversionUtil(decimal, {
    fromNumericBase: 'dec',
    toNumericBase: 'hex',
  });
}

/**
 * Converts a Wei hex value to the most appropriate ETH denomination (ETH, GWEI, or WEI)
 * Returns the first non-zero denomination or WEI if all are zero
 * @param {Object} params - Conversion parameters
 * @param {string} params.value - The Wei hex value to convert
 * @param {string} params.fromCurrency - The source currency (default: ETH)
 * @param {number} params.conversionRate - The conversion rate for currency conversion
 * @param {number} params.numberOfDecimals - Number of decimal places (default: 6)
 * @returns {string} Formatted string with value and denomination
 */
export function getEthConversionFromWeiHex({
  value,
  fromCurrency = ETH,
  conversionRate,
  numberOfDecimals = 6,
}) {
  const denominations = [fromCurrency, GWEI, WEI];

  let nonZeroDenomination;

  for (let i = 0; i < denominations.length; i++) {
    const convertedValue = getValueFromWeiHex({
      value,
      conversionRate,
      fromCurrency,
      toCurrency: fromCurrency,
      numberOfDecimals,
      toDenomination: denominations[i],
    });

    if (convertedValue !== '0' || i === denominations.length - 1) {
      nonZeroDenomination = `${convertedValue} ${denominations[i]}`;
      break;
    }
  }

  return nonZeroDenomination;
}

/**
 * Converts a Wei hex value to a specified currency and denomination
 * @param {Object} params - Conversion parameters
 * @param {string} params.value - The Wei hex value to convert
 * @param {string} params.fromCurrency - The source currency (default: ETH)
 * @param {string} params.toCurrency - The target currency
 * @param {number} params.conversionRate - The conversion rate between currencies
 * @param {number} params.numberOfDecimals - Number of decimal places to include
 * @param {string} params.toDenomination - The target denomination (ETH, GWEI, WEI)
 * @returns {string} The converted value as a decimal string
 */
export function getValueFromWeiHex({
  value,
  fromCurrency = ETH,
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
    fromDenomination: WEI,
    toDenomination,
    conversionRate,
  });
}

/**
 * Converts a decimal value to Wei hex format
 * @param {Object} params - Conversion parameters
 * @param {string|number} params.value - The decimal value to convert
 * @param {string} params.fromCurrency - The source currency
 * @param {number} params.conversionRate - The conversion rate
 * @param {string} params.fromDenomination - The source denomination
 * @param {boolean} params.invertConversionRate - Whether to invert the conversion rate
 * @returns {string} The Wei value in hexadecimal format
 */
export function getWeiHexFromDecimalValue({
  value,
  fromCurrency,
  conversionRate,
  fromDenomination,
  invertConversionRate,
}) {
  return conversionUtil(value, {
    fromNumericBase: 'dec',
    toNumericBase: 'hex',
    toCurrency: ETH,
    fromCurrency,
    conversionRate,
    invertConversionRate,
    fromDenomination,
    toDenomination: WEI,
  });
}

/**
 * Adds two hex WEI values and returns the result as a decimal
 * @param {string} aHexWEI - First hex WEI value to add
 * @param {string} bHexWEI - Second hex WEI value to add
 * @returns {string} The sum as a decimal string
 */
export function addHexWEIsToDec(aHexWEI, bHexWEI) {
  return addCurrencies(aHexWEI, bHexWEI, {
    aBase: 16,
    bBase: 16,
    fromDenomination: 'WEI',
    numberOfDecimals: 6,
  });
}

/**
 * Subtracts two hex WEI values and returns the result as a decimal
 * @param {string} aHexWEI - First hex WEI value (minuend)
 * @param {string} bHexWEI - Second hex WEI value to subtract (subtrahend)
 * @returns {string} The difference as a decimal string
 */
export function subtractHexWEIsToDec(aHexWEI, bHexWEI) {
  return subtractCurrencies(aHexWEI, bHexWEI, {
    aBase: 16,
    bBase: 16,
    fromDenomination: 'WEI',
    numberOfDecimals: 6,
  });
}

/**
 * Converts a decimal ETH amount to a specified fiat currency
 * @param {string|number} ethTotal - The ETH amount to convert
 * @param {string} convertedCurrency - The target fiat currency code
 * @param {number} conversionRate - The ETH to fiat conversion rate
 * @returns {string} The converted amount in the target currency
 */
export function decEthToConvertedCurrency(
  ethTotal,
  convertedCurrency,
  conversionRate,
) {
  return conversionUtil(ethTotal, {
    fromNumericBase: 'dec',
    toNumericBase: 'dec',
    fromCurrency: 'ETH',
    toCurrency: convertedCurrency,
    numberOfDecimals: 2,
    conversionRate,
  });
}

/**
 * Converts decimal GWEI to hex WEI
 * @param {string|number} decGWEI - The decimal GWEI value to convert
 * @returns {string} The equivalent value in hex WEI
 */
export function decGWEIToHexWEI(decGWEI) {
  return conversionUtil(decGWEI, {
    fromNumericBase: 'dec',
    toNumericBase: 'hex',
    fromDenomination: 'GWEI',
    toDenomination: 'WEI',
  });
}

/**
 * Converts hex GWEI to hex WEI
 * @param {string} decGWEI - The hex GWEI value to convert
 * @returns {string} The equivalent value in hex WEI
 */
export function hexGWEIToHexWEI(decGWEI) {
  return conversionUtil(decGWEI, {
    fromNumericBase: 'hex',
    toNumericBase: 'hex',
    fromDenomination: 'GWEI',
    toDenomination: 'WEI',
  });
}

/**
 * Converts hex WEI to decimal GWEI
 * @param {string} decGWEI - The hex WEI value to convert
 * @returns {string} The equivalent value in decimal GWEI
 */
export function hexWEIToDecGWEI(decGWEI) {
  return conversionUtil(decGWEI, {
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
    fromDenomination: 'WEI',
    toDenomination: 'GWEI',
  });
}

/**
 * Converts decimal ETH to decimal WEI
 * @param {string|number} decEth - The decimal ETH value to convert
 * @returns {string} The equivalent value in decimal WEI
 */
export function decETHToDecWEI(decEth) {
  return conversionUtil(decEth, {
    fromNumericBase: 'dec',
    toNumericBase: 'dec',
    fromDenomination: 'ETH',
    toDenomination: 'WEI',
  });
}

/**
 * Converts hex WEI to decimal ETH
 * @param {string} hexWEI - The hex WEI value to convert
 * @returns {string} The equivalent value in decimal ETH
 */
export function hexWEIToDecETH(hexWEI) {
  return conversionUtil(hexWEI, {
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
    fromDenomination: 'WEI',
    toDenomination: 'ETH',
  });
}

/**
 * Adds two hex values and returns the result as hex
 * @param {string} aHexWEI - First hex value to add
 * @param {string} bHexWEI - Second hex value to add
 * @returns {string} The sum as a hex string
 */
export function addHexes(aHexWEI, bHexWEI) {
  return addCurrencies(aHexWEI, bHexWEI, {
    aBase: 16,
    bBase: 16,
    toNumericBase: 'hex',
    numberOfDecimals: 6,
  });
}

export function sumHexWEIs(hexWEIs) {
  return hexWEIs.filter(Boolean).reduce(addHexes);
}

export function sumHexWEIsToUnformattedFiat(
  hexWEIs,
  convertedCurrency,
  conversionRate,
) {
  const hexWEIsSum = sumHexWEIs(hexWEIs);
  const convertedTotal = decEthToConvertedCurrency(
    getValueFromWeiHex({
      value: hexWEIsSum,
      toCurrency: 'ETH',
      numberOfDecimals: 4,
    }),
    convertedCurrency,
    conversionRate,
  );
  return convertedTotal;
}

export function sumHexWEIsToRenderableFiat(
  hexWEIs,
  convertedCurrency,
  conversionRate,
) {
  const convertedTotal = sumHexWEIsToUnformattedFiat(
    hexWEIs,
    convertedCurrency,
    conversionRate,
  );
  return formatCurrency(convertedTotal, convertedCurrency);
}

export function formatETHFee(ethFee, currencySymbol = 'ETH', showLessThan) {
  if (showLessThan && ethFee === '0') return `< 0.000001 ${currencySymbol}`;
  return `${ethFee} ${currencySymbol}`;
}

export function sumHexWEIsToRenderableEth(hexWEIs) {
  const hexWEIsSum = hexWEIs.filter(Boolean).reduce(addHexes);
  return formatETHFee(
    getValueFromWeiHex({
      value: hexWEIsSum,
      toCurrency: 'ETH',
      numberOfDecimals: 6,
    }),
  );
}

export function multiplyHexes(hex1, hex2) {
  return hexToBN(hex1).mul(hexToBN(hex2)).toString(16);
}

export function decimalToPrefixedHex(decimal) {
  return addHexPrefix(decimalToHex(decimal));
}

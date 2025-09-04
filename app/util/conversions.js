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
 * Converts a hexadecimal value to decimal format.
 *
 * @param hexValue - The hexadecimal value to convert
 * @returns The decimal representation of the hex value
 */
export function hexToDecimal(hexValue) {
  return conversionUtil(hexValue, {
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
  });
}

/**
 * Converts a decimal value to hexadecimal format.
 *
 * @param decimal - The decimal value to convert
 * @returns The hexadecimal representation of the decimal value
 */
export function decimalToHex(decimal) {
  return conversionUtil(decimal, {
    fromNumericBase: 'dec',
    toNumericBase: 'hex',
  });
}

/**
 * Converts a Wei hex value to the most appropriate ETH denomination (ETH, GWEI, or WEI).
 * Returns the first non-zero denomination or WEI if all are zero.
 *
 * @param value - The Wei hex value to convert
 * @param fromCurrency - The source currency (defaults to ETH)
 * @param conversionRate - The conversion rate for currency conversion
 * @param numberOfDecimals - Number of decimal places to display (defaults to 6)
 * @returns A formatted string with value and denomination (e.g., "0.001 ETH")
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
 * Converts a Wei hex value to a decimal value in the specified currency and denomination.
 *
 * @param value - The Wei hex value to convert
 * @param fromCurrency - The source currency (defaults to ETH)
 * @param toCurrency - The target currency for conversion
 * @param conversionRate - The conversion rate between currencies
 * @param numberOfDecimals - Number of decimal places in the result
 * @param toDenomination - The target denomination (ETH, GWEI, WEI)
 * @returns The converted decimal value as a string
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
 * Converts a decimal value to Wei hex format.
 *
 * @param value - The decimal value to convert
 * @param fromCurrency - The source currency
 * @param conversionRate - The conversion rate for currency conversion
 * @param fromDenomination - The source denomination
 * @param invertConversionRate - Whether to invert the conversion rate
 * @returns The Wei hex value as a string
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

export function addHexWEIsToDec(aHexWEI, bHexWEI) {
  return addCurrencies(aHexWEI, bHexWEI, {
    aBase: 16,
    bBase: 16,
    fromDenomination: 'WEI',
    numberOfDecimals: 6,
  });
}

export function subtractHexWEIsToDec(aHexWEI, bHexWEI) {
  return subtractCurrencies(aHexWEI, bHexWEI, {
    aBase: 16,
    bBase: 16,
    fromDenomination: 'WEI',
    numberOfDecimals: 6,
  });
}

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

export function decGWEIToHexWEI(decGWEI) {
  return conversionUtil(decGWEI, {
    fromNumericBase: 'dec',
    toNumericBase: 'hex',
    fromDenomination: 'GWEI',
    toDenomination: 'WEI',
  });
}

export function hexGWEIToHexWEI(decGWEI) {
  return conversionUtil(decGWEI, {
    fromNumericBase: 'hex',
    toNumericBase: 'hex',
    fromDenomination: 'GWEI',
    toDenomination: 'WEI',
  });
}

export function hexWEIToDecGWEI(decGWEI) {
  return conversionUtil(decGWEI, {
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
    fromDenomination: 'WEI',
    toDenomination: 'GWEI',
  });
}

export function decETHToDecWEI(decEth) {
  return conversionUtil(decEth, {
    fromNumericBase: 'dec',
    toNumericBase: 'dec',
    fromDenomination: 'ETH',
    toDenomination: 'WEI',
  });
}

export function hexWEIToDecETH(hexWEI) {
  return conversionUtil(hexWEI, {
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
    fromDenomination: 'WEI',
    toDenomination: 'ETH',
  });
}

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

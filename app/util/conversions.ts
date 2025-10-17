import { hexToBN } from '@metamask/controller-utils';
import { ETH, GWEI, WEI } from './custom-gas';
import {
  conversionUtil,
  addCurrencies,
  subtractCurrencies,
} from './conversion';
import { formatCurrency } from './confirm-tx.js';
import { addHexPrefix } from './number';
import BigNumber from 'bignumber.js';

/**
 * Represents the possible return types from conversion operations.
 */
type ConversionResult = string | number | BigNumber;

/**
 * Converts a hexadecimal value to decimal format.
 *
 * @param hexValue - The hexadecimal string to convert (with or without '0x' prefix)
 * @returns The decimal representation as a string, number, or BigNumber
 */
export function hexToDecimal(hexValue: string): ConversionResult {
  return conversionUtil(hexValue, {
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
  } as any);
}

/**
 * Converts a decimal value to hexadecimal format.
 *
 * @param decimal - The decimal value to convert (as string or number)
 * @returns The hexadecimal representation (without '0x' prefix)
 */
export function decimalToHex(decimal: string | number): string {
  return conversionUtil(decimal, {
    fromNumericBase: 'dec',
    toNumericBase: 'hex',
  } as any) as string;
}

/**
 * Options for converting WEI to ETH with exchange rate.
 */
interface EthConversionOptions {
  value: string;
  fromCurrency?: string;
  conversionRate: number;
  numberOfDecimals?: number;
}

/**
 * Converts WEI (in hex format) to ETH or other currency using a conversion rate.
 * Automatically selects the appropriate denomination (ETH, GWEI, or WEI) based on value.
 *
 * @param options - Conversion options
 * @param options.value - The WEI value as a hex string
 * @param options.fromCurrency - The currency to convert from (defaults to 'ETH')
 * @param options.conversionRate - Exchange rate for currency conversion
 * @param options.numberOfDecimals - Number of decimal places for the result (defaults to 6)
 * @returns The converted value with appropriate denomination suffix
 */
export function getEthConversionFromWeiHex({
  value,
  fromCurrency = ETH,
  conversionRate,
  numberOfDecimals = 6,
}: EthConversionOptions): string {
  const denominations = [fromCurrency, GWEI, WEI];

  let nonZeroDenomination: string | undefined;

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

  return nonZeroDenomination as string;
}

/**
 * Options for converting WEI hex values to different denominations or currencies.
 */
interface ValueFromWeiHexOptions {
  value: string;
  fromCurrency?: string | null;
  toCurrency?: string | null;
  conversionRate?: number | BigNumber;
  numberOfDecimals?: number;
  toDenomination?: string;
}

/**
 * Converts a WEI hex value to a different denomination or currency.
 *
 * @param options - Conversion options
 * @param options.value - The WEI value as a hex string
 * @param options.fromCurrency - The currency to convert from (defaults to 'ETH')
 * @param options.toCurrency - The currency to convert to
 * @param options.conversionRate - Exchange rate for currency conversion
 * @param options.numberOfDecimals - Number of decimal places for the result
 * @param options.toDenomination - The denomination to convert to (e.g., 'ETH', 'GWEI')
 * @returns The converted value as a string or number
 */
export function getValueFromWeiHex({
  value,
  fromCurrency = ETH,
  toCurrency,
  conversionRate,
  numberOfDecimals,
  toDenomination,
}: ValueFromWeiHexOptions): string | number {
  const result = conversionUtil(value, {
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
    fromCurrency,
    toCurrency,
    numberOfDecimals,
    fromDenomination: WEI,
    toDenomination,
    conversionRate,
  } as any);
  
  if (typeof result === 'object' && result !== null) {
    return String(result);
  }
  return result as string | number;
}

/**
 * Options for converting decimal values to WEI hex format.
 */
interface WeiHexFromDecimalOptions {
  value: string | number;
  fromCurrency?: string | null;
  conversionRate?: number | BigNumber;
  fromDenomination?: string;
  invertConversionRate?: boolean;
}

/**
 * Converts a decimal value to WEI in hexadecimal format.
 *
 * @param options - Conversion options
 * @param options.value - The decimal value to convert
 * @param options.fromCurrency - The currency to convert from
 * @param options.conversionRate - Exchange rate for currency conversion
 * @param options.fromDenomination - The denomination to convert from
 * @param options.invertConversionRate - Whether to invert the conversion rate
 * @returns The WEI value as a hexadecimal string with '0x' prefix
 */
export function getWeiHexFromDecimalValue({
  value,
  fromCurrency,
  conversionRate,
  fromDenomination,
  invertConversionRate,
}: WeiHexFromDecimalOptions): ConversionResult {
  return conversionUtil(value, {
    fromNumericBase: 'dec',
    toNumericBase: 'hex',
    toCurrency: ETH,
    fromCurrency,
    conversionRate,
    invertConversionRate,
    fromDenomination,
    toDenomination: WEI,
  } as any);
}

/**
 * Adds two hexadecimal WEI values and returns the result in decimal format.
 *
 * @param aHexWEI - First hex WEI value (with or without '0x' prefix)
 * @param bHexWEI - Second hex WEI value (with or without '0x' prefix)
 * @returns The sum as a decimal value
 */
export function addHexWEIsToDec(aHexWEI: string, bHexWEI: string): ConversionResult {
  return addCurrencies(aHexWEI, bHexWEI, {
    aBase: 16,
    bBase: 16,
    fromDenomination: 'WEI',
    numberOfDecimals: 6,
  });
}

/**
 * Subtracts two hexadecimal WEI values and returns the result in decimal format.
 *
 * @param aHexWEI - First hex WEI value (minuend, with or without '0x' prefix)
 * @param bHexWEI - Second hex WEI value (subtrahend, with or without '0x' prefix)
 * @returns The difference as a decimal value
 */
export function subtractHexWEIsToDec(aHexWEI: string, bHexWEI: string): ConversionResult {
  return subtractCurrencies(aHexWEI, bHexWEI, {
    aBase: 16,
    bBase: 16,
    fromDenomination: 'WEI',
    numberOfDecimals: 6,
  });
}

/**
 * Converts decimal ETH to another currency using a conversion rate.
 *
 * @param ethTotal - The ETH value as a decimal string
 * @param convertedCurrency - The target currency code
 * @param conversionRate - Exchange rate for the conversion
 * @returns The converted value with 2 decimal places
 */
export function decEthToConvertedCurrency(
  ethTotal: string,
  convertedCurrency: string,
  conversionRate: number,
): ConversionResult {
  return conversionUtil(ethTotal, {
    fromNumericBase: 'dec',
    toNumericBase: 'dec',
    fromCurrency: 'ETH',
    toCurrency: convertedCurrency,
    numberOfDecimals: 2,
    conversionRate,
  } as any);
}

/**
 * Converts decimal GWEI to hexadecimal WEI.
 * Handles undefined/null inputs by returning undefined.
 *
 * @param decGWEI - The GWEI value as a string, number, or undefined
 * @returns The WEI value as a hex string (without '0x' prefix), or undefined if input is undefined/null
 */
export function decGWEIToHexWEI(decGWEI: string | number | undefined): string | undefined {
  if (decGWEI === undefined || decGWEI === null) {
    return undefined;
  }
  return conversionUtil(decGWEI, {
    fromNumericBase: 'dec',
    toNumericBase: 'hex',
    fromDenomination: 'GWEI',
    toDenomination: 'WEI',
  } as any) as string;
}

/**
 * Converts hexadecimal GWEI to hexadecimal WEI.
 *
 * @param decGWEI - The GWEI value as a hex string
 * @returns The WEI value as a hex string
 */
export function hexGWEIToHexWEI(decGWEI: string): ConversionResult {
  return conversionUtil(decGWEI, {
    fromNumericBase: 'hex',
    toNumericBase: 'hex',
    fromDenomination: 'GWEI',
    toDenomination: 'WEI',
  } as any);
}

/**
 * Converts hexadecimal WEI to decimal GWEI.
 *
 * @param decGWEI - The WEI value as a hex string
 * @returns The GWEI value as a decimal string, number, or BigNumber
 */
export function hexWEIToDecGWEI(decGWEI: string): ConversionResult {
  return conversionUtil(decGWEI, {
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
    fromDenomination: 'WEI',
    toDenomination: 'GWEI',
  } as any);
}

/**
 * Converts decimal ETH to decimal WEI.
 *
 * @param decEth - The ETH value as a decimal string or number
 * @returns The WEI value as a decimal string, number, or BigNumber
 */
export function decETHToDecWEI(decEth: string | number): ConversionResult {
  return conversionUtil(decEth, {
    fromNumericBase: 'dec',
    toNumericBase: 'dec',
    fromDenomination: 'ETH',
    toDenomination: 'WEI',
  } as any);
}

/**
 * Converts hexadecimal WEI to decimal ETH.
 *
 * @param hexWEI - The WEI value as a hex string
 * @returns The ETH value as a decimal string, number, or BigNumber
 */
export function hexWEIToDecETH(hexWEI: string): ConversionResult {
  return conversionUtil(hexWEI, {
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
    fromDenomination: 'WEI',
    toDenomination: 'ETH',
  } as any);
}

/**
 * Adds two hexadecimal WEI values and returns the result as a hex string.
 *
 * @param aHexWEI - First hex WEI value (with or without '0x' prefix)
 * @param bHexWEI - Second hex WEI value (with or without '0x' prefix)
 * @returns The sum as a hexadecimal string (without '0x' prefix)
 */
export function addHexes(aHexWEI: string, bHexWEI: string): string {
  return addCurrencies(aHexWEI, bHexWEI, {
    aBase: 16,
    bBase: 16,
    toNumericBase: 'hex',
    numberOfDecimals: 6,
  }) as string;
}

/**
 * Subtracts one hexadecimal WEI value from another.
 *
 * @param aHexWEI - First hex WEI value (minuend, with or without '0x' prefix)
 * @param bHexWEI - Second hex WEI value (subtrahend, with or without '0x' prefix)
 * @returns The difference as a hexadecimal string (without '0x' prefix, negative values have '-' prefix)
 */
export function subHexes(aHexWEI: string, bHexWEI: string): string {
  return subtractCurrencies(aHexWEI, bHexWEI, {
    aBase: 16,
    bBase: 16,
    toNumericBase: 'hex',
    numberOfDecimals: 6,
  }) as string;
}

/**
 * Sums an array of hexadecimal WEI values.
 *
 * @param hexWEIs - Array of hex WEI values to sum (filters out falsy values)
 * @returns The total sum as a hexadecimal string (without '0x' prefix)
 */
export function sumHexWEIs(hexWEIs: string[]): string {
  const filtered = hexWEIs.filter(Boolean);
  if (filtered.length === 0) {
    return '0';
  }
  const result = filtered.reduce((a, b) => addHexes(a, b)) as string;
  // Ensure result doesn't have '0x' prefix
  return result.startsWith('0x') ? result.slice(2) : result;
}

/**
 * Sums hexadecimal WEI values and converts to unformatted fiat currency.
 *
 * @param hexWEIs - Array of hex WEI values to sum
 * @param convertedCurrency - The target currency code
 * @param conversionRate - Exchange rate for the conversion
 * @returns The total value in the target currency (unformatted)
 */
export function sumHexWEIsToUnformattedFiat(
  hexWEIs: string[],
  convertedCurrency: string,
  conversionRate: number,
): ConversionResult {
  const hexWEIsSum = sumHexWEIs(hexWEIs);
  const convertedTotal = decEthToConvertedCurrency(
    String(getValueFromWeiHex({
      value: String(hexWEIsSum),
      toCurrency: 'ETH',
      numberOfDecimals: 4,
    })),
    convertedCurrency,
    conversionRate,
  );
  return convertedTotal;
}

/**
 * Sums hexadecimal WEI values and converts to formatted fiat currency string.
 *
 * @param hexWEIs - Array of hex WEI values to sum
 * @param convertedCurrency - The target currency code
 * @param conversionRate - Exchange rate for the conversion
 * @returns The total value formatted as a currency string
 */
export function sumHexWEIsToRenderableFiat(
  hexWEIs: string[],
  convertedCurrency: string,
  conversionRate: number,
): string {
  const convertedTotal = sumHexWEIsToUnformattedFiat(
    hexWEIs,
    convertedCurrency,
    conversionRate,
  );
  return formatCurrency(String(convertedTotal), convertedCurrency);
}

/**
 * Formats an ETH fee value with the currency symbol.
 *
 * @param ethFee - The fee value as a string
 * @param currencySymbol - The currency symbol to display (defaults to 'ETH')
 * @param showLessThan - Whether to show "< 0.000001" for zero values
 * @returns The formatted fee string (e.g., "0.001 ETH")
 */
export function formatETHFee(
  ethFee: string,
  currencySymbol: string = 'ETH',
  showLessThan?: boolean,
): string {
  if (showLessThan && ethFee === '0') return `< 0.000001 ${currencySymbol}`;
  return `${ethFee} ${currencySymbol}`;
}

/**
 * Sums hexadecimal WEI values and converts to formatted ETH string.
 *
 * @param hexWEIs - Array of hex WEI values to sum
 * @returns The total value formatted as an ETH string with symbol
 */
export function sumHexWEIsToRenderableEth(hexWEIs: string[]): string {
  const hexWEIsSum = hexWEIs.filter(Boolean).reduce((a, b) => addHexes(a, b)) as string;
  return formatETHFee(
    String(getValueFromWeiHex({
      value: String(hexWEIsSum),
      toCurrency: 'ETH',
      numberOfDecimals: 6,
    })),
  );
}

/**
 * Multiplies two hexadecimal values and returns the result as a hex string.
 *
 * @param hex1 - First hex value (with or without '0x' prefix)
 * @param hex2 - Second hex value (with or without '0x' prefix)
 * @returns The product as a hexadecimal string (without '0x' prefix)
 */
export function multiplyHexes(hex1: string, hex2: string): string {
  return hexToBN(hex1).mul(hexToBN(hex2)).toString(16);
}

/**
 * Converts a decimal value to hexadecimal format with '0x' prefix.
 *
 * @param decimal - The decimal value to convert (as string or number)
 * @returns The hexadecimal representation with guaranteed '0x' prefix
 */
export function decimalToPrefixedHex(decimal: string | number): ConversionResult {
  return addHexPrefix(decimalToHex(decimal) as string);
}

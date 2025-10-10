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

type ConversionResult = string | number | BigNumber;

export function hexToDecimal(hexValue: string): ConversionResult {
  return conversionUtil(hexValue, {
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
  } as any);
}

export function decimalToHex(decimal: string | number): string {
  return conversionUtil(decimal, {
    fromNumericBase: 'dec',
    toNumericBase: 'hex',
  } as any) as string;
}

interface EthConversionOptions {
  value: string;
  fromCurrency?: string;
  conversionRate: number;
  numberOfDecimals?: number;
}

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

interface ValueFromWeiHexOptions {
  value: string;
  fromCurrency?: string | null;
  toCurrency?: string | null;
  conversionRate?: number | BigNumber;
  numberOfDecimals?: number;
  toDenomination?: string;
}

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

interface WeiHexFromDecimalOptions {
  value: string | number;
  fromCurrency?: string | null;
  conversionRate?: number | BigNumber;
  fromDenomination?: string;
  invertConversionRate?: boolean;
}

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

export function addHexWEIsToDec(aHexWEI: string, bHexWEI: string): ConversionResult {
  return addCurrencies(aHexWEI, bHexWEI, {
    aBase: 16,
    bBase: 16,
    fromDenomination: 'WEI',
    numberOfDecimals: 6,
  });
}

export function subtractHexWEIsToDec(aHexWEI: string, bHexWEI: string): ConversionResult {
  return subtractCurrencies(aHexWEI, bHexWEI, {
    aBase: 16,
    bBase: 16,
    fromDenomination: 'WEI',
    numberOfDecimals: 6,
  });
}

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

export function hexGWEIToHexWEI(decGWEI: string): ConversionResult {
  return conversionUtil(decGWEI, {
    fromNumericBase: 'hex',
    toNumericBase: 'hex',
    fromDenomination: 'GWEI',
    toDenomination: 'WEI',
  } as any);
}

export function hexWEIToDecGWEI(decGWEI: string): ConversionResult {
  return conversionUtil(decGWEI, {
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
    fromDenomination: 'WEI',
    toDenomination: 'GWEI',
  } as any);
}

export function decETHToDecWEI(decEth: string | number): ConversionResult {
  return conversionUtil(decEth, {
    fromNumericBase: 'dec',
    toNumericBase: 'dec',
    fromDenomination: 'ETH',
    toDenomination: 'WEI',
  } as any);
}

export function hexWEIToDecETH(hexWEI: string): ConversionResult {
  return conversionUtil(hexWEI, {
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
    fromDenomination: 'WEI',
    toDenomination: 'ETH',
  } as any);
}

export function addHexes(aHexWEI: string, bHexWEI: string): string {
  return addCurrencies(aHexWEI, bHexWEI, {
    aBase: 16,
    bBase: 16,
    toNumericBase: 'hex',
    numberOfDecimals: 6,
  }) as string;
}

export function sumHexWEIs(hexWEIs: string[]): string {
  return hexWEIs.filter(Boolean).reduce((a, b) => addHexes(a, b)) as string;
}

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

export function formatETHFee(
  ethFee: string,
  currencySymbol: string = 'ETH',
  showLessThan?: boolean,
): string {
  if (showLessThan && ethFee === '0') return `< 0.000001 ${currencySymbol}`;
  return `${ethFee} ${currencySymbol}`;
}

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

export function multiplyHexes(hex1: string, hex2: string): string {
  return hexToBN(hex1).mul(hexToBN(hex2)).toString(16);
}

export function decimalToPrefixedHex(decimal: string | number): ConversionResult {
  return addHexPrefix(decimalToHex(decimal) as string);
}

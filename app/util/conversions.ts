import { hexToBN } from '@metamask/controller-utils';
import { ETH, GWEI, WEI } from './custom-gas';
import {
  conversionUtil,
  addCurrencies,
  subtractCurrencies,
} from './conversion';
import { formatCurrency } from './confirm-tx.js';
import { addHexPrefix } from './number';

interface EthConversionParams {
  value: string;
  fromCurrency?: string | null;
  conversionRate?: number | null;
  numberOfDecimals?: number | null;
}

interface ValueFromWeiParams {
  value: string;
  fromCurrency?: string | null;
  toCurrency?: string | null;
  conversionRate?: number | null;
  numberOfDecimals?: number | null;
  toDenomination?: string | null;
}

interface WeiHexFromDecimalParams {
  value: string | number;
  fromCurrency?: string | null;
  conversionRate?: number | null;
  fromDenomination?: string | null;
  invertConversionRate?: boolean | null;
}

export function hexToDecimal(hexValue: string): string {
  return conversionUtil(hexValue, {
    fromCurrency: null,
    toCurrency: null,
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
    fromDenomination: null,
    toDenomination: null,
    numberOfDecimals: null,
    conversionRate: null,
    invertConversionRate: null,
  }) as string;
}

export function decimalToHex(decimal: string | number): string {
  return conversionUtil(decimal, {
    fromCurrency: null,
    toCurrency: null,
    fromNumericBase: 'dec',
    toNumericBase: 'hex',
    fromDenomination: null,
    toDenomination: null,
    numberOfDecimals: null,
    conversionRate: null,
    invertConversionRate: null,
  }) as string;
}

export function getEthConversionFromWeiHex({
  value,
  fromCurrency = ETH,
  conversionRate,
  numberOfDecimals = 6,
}: EthConversionParams): string {
  const denominations = [fromCurrency, GWEI, WEI];

  let nonZeroDenomination: string = `0 ${
    denominations[denominations.length - 1]
  }`;

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

export function getValueFromWeiHex({
  value,
  fromCurrency = ETH,
  toCurrency,
  conversionRate,
  numberOfDecimals,
  toDenomination,
}: ValueFromWeiParams): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return conversionUtil(value, {
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
    fromCurrency: fromCurrency || null,
    toCurrency: toCurrency || null,
    numberOfDecimals: numberOfDecimals || null,
    fromDenomination: WEI,
    toDenomination: toDenomination || null,
    conversionRate: conversionRate || null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any) as string;
}

export function getWeiHexFromDecimalValue({
  value,
  fromCurrency,
  conversionRate,
  fromDenomination,
  invertConversionRate,
}: WeiHexFromDecimalParams): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return conversionUtil(value, {
    fromNumericBase: 'dec',
    toNumericBase: 'hex',
    fromCurrency: fromCurrency || null,
    conversionRate: conversionRate || null,
    fromDenomination: fromDenomination || null,
    invertConversionRate: invertConversionRate || null,
    toDenomination: WEI,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any) as string;
}

export function addHexWEIsToDec(aHexWEI: string, bHexWEI: string): string {
  return addCurrencies(aHexWEI, bHexWEI, {
    aBase: 16,
    bBase: 16,
    fromDenomination: 'WEI',
    numberOfDecimals: 6,
  }) as string;
}

export function subtractHexWEIsToDec(aHexWEI: string, bHexWEI: string): string {
  return subtractCurrencies(aHexWEI, bHexWEI, {
    aBase: 16,
    bBase: 16,
    fromDenomination: 'WEI',
    numberOfDecimals: 6,
  }) as string;
}

export function decEthToConvertedCurrency(
  ethTotal: string,
  _convertedCurrency: string,
  conversionRate: number,
): string {
  return conversionUtil(ethTotal, {
    fromCurrency: null,
    toCurrency: null,
    fromNumericBase: 'dec',
    toNumericBase: 'dec',
    fromDenomination: null,
    toDenomination: null,
    numberOfDecimals: 2,
    conversionRate: conversionRate || null,
    invertConversionRate: null,
  }) as string;
}

export function decGWEIToHexWEI(decGWEI: string): string {
  return conversionUtil(decGWEI, {
    fromCurrency: null,
    toCurrency: null,
    fromNumericBase: 'dec',
    toNumericBase: 'hex',
    fromDenomination: 'GWEI',
    toDenomination: 'WEI',
    numberOfDecimals: null,
    conversionRate: null,
    invertConversionRate: null,
  }) as string;
}

export function hexGWEIToHexWEI(decGWEI: string): string {
  return conversionUtil(decGWEI, {
    fromCurrency: null,
    toCurrency: null,
    fromNumericBase: 'hex',
    toNumericBase: 'hex',
    fromDenomination: 'GWEI',
    toDenomination: 'WEI',
    numberOfDecimals: null,
    conversionRate: null,
    invertConversionRate: null,
  }) as string;
}

export function hexWEIToDecGWEI(decGWEI: string): string {
  return conversionUtil(decGWEI, {
    fromCurrency: null,
    toCurrency: null,
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
    fromDenomination: 'WEI',
    toDenomination: 'GWEI',
    numberOfDecimals: null,
    conversionRate: null,
    invertConversionRate: null,
  }) as string;
}

export function decETHToDecWEI(decEth: string): string {
  return conversionUtil(decEth, {
    fromCurrency: null,
    toCurrency: null,
    fromNumericBase: 'dec',
    toNumericBase: 'dec',
    fromDenomination: 'ETH',
    toDenomination: 'WEI',
    numberOfDecimals: null,
    conversionRate: null,
    invertConversionRate: null,
  }) as string;
}

export function hexWEIToDecETH(hexWEI: string): string {
  return conversionUtil(hexWEI, {
    fromCurrency: null,
    toCurrency: null,
    fromNumericBase: 'hex',
    toNumericBase: 'dec',
    fromDenomination: 'WEI',
    toDenomination: 'ETH',
    numberOfDecimals: null,
    conversionRate: null,
    invertConversionRate: null,
  }) as string;
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
  return hexWEIs.filter(Boolean).reduce(addHexes);
}

export function sumHexWEIsToUnformattedFiat(
  hexWEIs: string[],
  convertedCurrency: string,
  conversionRate: number,
): string {
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
  hexWEIs: string[],
  convertedCurrency: string,
  conversionRate: number,
): string {
  const convertedTotal = sumHexWEIsToUnformattedFiat(
    hexWEIs,
    convertedCurrency,
    conversionRate,
  );
  return formatCurrency(convertedTotal, convertedCurrency);
}

export function formatETHFee(
  ethFee: string,
  currencySymbol = 'ETH',
  showLessThan?: boolean,
): string {
  if (showLessThan && ethFee === '0') return `< 0.000001 ${currencySymbol}`;
  return `${ethFee} ${currencySymbol}`;
}

export function sumHexWEIsToRenderableEth(hexWEIs: string[]): string {
  const hexWEIsSum = hexWEIs.filter(Boolean).reduce(addHexes);
  return formatETHFee(
    getValueFromWeiHex({
      value: hexWEIsSum,
      toCurrency: 'ETH',
      numberOfDecimals: 6,
    }),
  );
}

export function multiplyHexes(hex1: string, hex2: string): string {
  return hexToBN(hex1).mul(hexToBN(hex2)).toString(16);
}

export function decimalToPrefixedHex(decimal: string | number): string {
  return addHexPrefix(decimalToHex(decimal));
}

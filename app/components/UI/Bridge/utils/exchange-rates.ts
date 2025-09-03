import {
  formatChainIdToCaip,
  formatChainIdToHex,
  isSolanaChainId,
} from '@metamask/bridge-controller';
import {
  Hex,
  CaipAssetType,
  CaipChainId,
  isStrictHexString,
} from '@metamask/utils';
import { selectMultichainAssetsRates } from '../../../../selectors/multichain';
import {
  addCurrencySymbol,
  balanceToFiatNumber,
} from '../../../../util/number';
import { BridgeToken } from '../types';
import { handleFetch, toChecksumHexAddress } from '@metamask/controller-utils';
import {
  CodefiTokenPricesServiceV2,
  ContractMarketData,
  fetchTokenContractExchangeRates,
} from '@metamask/assets-controllers';
import { safeToChecksumAddress } from '../../../../util/address';
import { SolScope } from '@metamask/keyring-api';
import { toAssetId } from '../hooks/useAssetMetadata/utils';

interface GetDisplayCurrencyValueParams {
  token: BridgeToken | undefined;
  amount: string | undefined;
  evmMultiChainMarketData:
    | Record<Hex, Record<Hex, { price: number | undefined }>>
    | undefined;
  networkConfigurationsByChainId: Record<Hex, { nativeCurrency: string }>;
  evmMultiChainCurrencyRates:
    | Record<string, { conversionRate: number | null }>
    | undefined;
  currentCurrency: string;
  nonEvmMultichainAssetRates: ReturnType<typeof selectMultichainAssetsRates>;
}

/**
 * Calculates and formats the display currency value for a bridge token
 * Handles both EVM and non-EVM (Solana) chains with appropriate exchange rate calculations
 * @param {GetDisplayCurrencyValueParams} params - Parameters for currency value calculation
 * @param {BridgeToken | undefined} params.token - The bridge token to calculate value for
 * @param {string | undefined} params.amount - The token amount to convert
 * @param {Record<Hex, Record<Hex, { price: number | undefined }>> | undefined} params.evmMultiChainMarketData - EVM market data
 * @param {Record<Hex, { nativeCurrency: string }>} params.networkConfigurationsByChainId - Network configurations
 * @param {Record<string, { conversionRate: number | null }> | undefined} params.evmMultiChainCurrencyRates - EVM currency rates
 * @param {string} params.currentCurrency - The current display currency
 * @param {ReturnType<typeof selectMultichainAssetsRates>} params.nonEvmMultichainAssetRates - Non-EVM asset rates
 * @returns {string} Formatted currency value with symbol
 */
export const getDisplayCurrencyValue = ({
  token,
  amount,
  evmMultiChainMarketData,
  networkConfigurationsByChainId,
  evmMultiChainCurrencyRates,
  currentCurrency,
  nonEvmMultichainAssetRates,
}: GetDisplayCurrencyValueParams): string => {
  if (!token || !amount) {
    return addCurrencySymbol('0', currentCurrency);
  }

  let currencyValue = 0;

  if (isSolanaChainId(token.chainId)) {
    const assetId = token.address as CaipAssetType;
    // This rate is asset to fiat. Whatever the user selected display fiat currency is.
    // We don't need to have an additional conversion from native token to fiat.
    const rate = nonEvmMultichainAssetRates?.[assetId]?.rate;
    if (rate) {
      currencyValue = Number(balanceToFiatNumber(amount, Number(rate), 1));
    } else {
      currencyValue =
        token?.currencyExchangeRate && amount
          ? Number(amount) * token?.currencyExchangeRate
          : 0;
    }
  } else {
    // EVM
    const evmChainId = token.chainId as Hex;
    const evmMultiChainExchangeRates = evmMultiChainMarketData?.[evmChainId];
    const evmTokenMarketData =
      evmMultiChainExchangeRates?.[token.address as Hex];

    const nativeCurrency =
      networkConfigurationsByChainId[evmChainId]?.nativeCurrency;
    const multiChainConversionRate =
      evmMultiChainCurrencyRates?.[nativeCurrency]?.conversionRate;

    if (multiChainConversionRate && evmTokenMarketData?.price) {
      currencyValue = Number(
        balanceToFiatNumber(
          amount,
          multiChainConversionRate,
          evmTokenMarketData.price,
        ),
      );
    } else {
      currencyValue =
        token?.currencyExchangeRate && amount
          ? Number(amount) * token?.currencyExchangeRate
          : 0;
    }
  }

  if (currencyValue >= 0.01 || currencyValue === 0) {
    return addCurrencySymbol(currencyValue, currentCurrency);
  }

  return `< ${addCurrencySymbol('0.01', currentCurrency)}`;
};

/**
 * Fetches the exchange rates for the tokens against the current currency
 * @param chainId - The chainId of the tokens
 * @param currency - The currency to fetch the exchange rates in
 * @param tokenAddresses - The addresses of the tokens to fetch the exchange rates for
 * @returns Exchange rate for the tokens against the current currency
 */
export const fetchTokenExchangeRates = async (
  chainId: Hex | CaipChainId,
  currency: string,
  ...tokenAddresses: string[]
) => {
  try {
    let exchangeRates: Record<string, number | undefined> = {};

    // Solana
    if (isSolanaChainId(chainId)) {
      const queryParams = new URLSearchParams({
        assetIds: tokenAddresses
          .map((address) => toAssetId(address, SolScope.Mainnet))
          .join(','),
        includeMarketData: 'true',
        vsCurrency: currency,
      });
      const url = `https://price.api.cx.metamask.io/v3/spot-prices?${queryParams}`;
      const tokenV3PriceResponse = (await handleFetch(url)) as Record<
        string,
        { price: number }
      >;

      exchangeRates = Object.entries(tokenV3PriceResponse).reduce(
        (acc, [k, curr]) => {
          acc[k] = curr.price;
          return acc;
        },
        {} as Record<string, number>,
      );
      return exchangeRates;
    }

    // EVM chains
    const checksumAddresses = tokenAddresses.map((address) =>
      safeToChecksumAddress(address),
    );
    if (checksumAddresses.some((address) => !address)) {
      return {};
    }

    exchangeRates = await fetchTokenContractExchangeRates({
      tokenPricesService: new CodefiTokenPricesServiceV2(),
      nativeCurrency: currency,
      tokenAddresses: checksumAddresses as Hex[],
      chainId: formatChainIdToHex(chainId),
    });

    return Object.keys(exchangeRates).reduce(
      (acc: Record<string, number | undefined>, address) => {
        acc[address] = exchangeRates[address];
        return acc;
      },
      {},
    );
  } catch (error) {
    return {};
  }
};

/**
 * Fetches the exchange rate for a single token in a given currency
 * Used when the exchange rate is not available in TokenRatesController
 * @param {Object} request - Request parameters
 * @param {Hex | CaipChainId} request.chainId - The chain ID of the token
 * @param {string} request.tokenAddress - The address of the token
 * @param {string} request.currency - The currency to get the exchange rate in
 * @returns {Promise<number | undefined>} The exchange rate or undefined if not found
 */
export const getTokenExchangeRate = async (request: {
  chainId: Hex | CaipChainId;
  tokenAddress: string;
  currency: string;
}) => {
  const { chainId, tokenAddress, currency } = request;
  const exchangeRates = await fetchTokenExchangeRates(
    chainId,
    currency,
    tokenAddress,
  );
  const assetId = toAssetId(tokenAddress, formatChainIdToCaip(chainId));
  if (isSolanaChainId(chainId) && assetId) {
    return exchangeRates?.[assetId];
  }
  // The exchange rate can be checksummed or not, so we need to check both
  const exchangeRate =
    exchangeRates?.[toChecksumHexAddress(tokenAddress)] ??
    exchangeRates?.[tokenAddress.toLowerCase()];
  return exchangeRate;
};

/**
 * This extracts a token's exchange rate from the marketData state object
 * These exchange rates are against the native asset of the chain
 * @param chainId - The chainId of the token
 * @param tokenAddress - The address of the token
 * @param marketData - The marketData state object
 * @returns The exchange rate of the token against the native asset of the chain
 */
export const exchangeRateFromMarketData = (
  chainId: Hex | CaipChainId,
  tokenAddress: string,
  marketData?: Record<string, ContractMarketData>,
) =>
  isStrictHexString(tokenAddress) && isStrictHexString(chainId)
    ? marketData?.[chainId]?.[tokenAddress]?.price
    : undefined;

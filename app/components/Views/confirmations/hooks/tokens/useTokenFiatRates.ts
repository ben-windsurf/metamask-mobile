import { useSelector } from 'react-redux';
import { selectTokenMarketData } from '../../../../../selectors/tokenRatesController';
import { Hex } from '@metamask/utils';
import { selectCurrencyRates } from '../../../../../selectors/currencyRateController';
import { selectNetworkConfigurations } from '../../../../../selectors/networkController';
import { useMemo } from 'react';
import { useDeepMemo } from '../useDeepMemo';

/**
 * Request interface for token fiat rate calculations
 * Used to specify which tokens need fiat rate conversion
 */
export interface TokenFiatRateRequest {
  address: Hex;
  chainId: Hex;
}

/**
 * Custom hook that calculates fiat rates for multiple tokens across different chains
 * Combines token market data with currency conversion rates to provide fiat values
 * @param {TokenFiatRateRequest[]} requests - Array of token requests with address and chainId
 * @returns {(number | undefined)[]} Array of fiat rates corresponding to each request, undefined if rate unavailable
 */
export function useTokenFiatRates(requests: TokenFiatRateRequest[]) {
  const tokenMarketDataByAddressByChainId = useSelector(selectTokenMarketData);
  const currencyRates = useSelector(selectCurrencyRates);
  const networkConfigurations = useSelector(selectNetworkConfigurations);

  const result = useMemo(
    () =>
      requests.map(({ address, chainId }) => {
        const tokenMarketData =
          tokenMarketDataByAddressByChainId[chainId]?.[address];

        const networkConfiguration = networkConfigurations[chainId];

        const conversionRate =
          currencyRates?.[networkConfiguration?.nativeCurrency]?.conversionRate;

        if (!conversionRate || !networkConfiguration) {
          return undefined;
        }

        return (tokenMarketData?.price ?? 1) * conversionRate;
      }),
    [
      requests,
      tokenMarketDataByAddressByChainId,
      currencyRates,
      networkConfigurations,
    ],
  );

  return useDeepMemo(() => result, [result]);
}

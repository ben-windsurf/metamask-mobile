import { useState, useEffect } from 'react';
import { handleFetch } from '@metamask/controller-utils';
import { DepositCryptoCurrency, DepositFiatCurrency } from '../constants';

interface UseFetchTokenRatesMultiResult {
  rates: Record<string, number | null>;
  isLoading: boolean;
  error: Error | null;
}

const PRICE_API_URL = 'https://price.api.cx.metamask.io/v3/spot-prices';

/**
 * Custom hook to fetch exchange rates for multiple tokens against a fiat currency
 * Makes API calls to retrieve current spot prices and handles loading/error states
 * @param {Object} params - Hook parameters
 * @param {DepositCryptoCurrency[]} params.tokens - Array of crypto tokens to fetch rates for
 * @param {DepositFiatCurrency} params.fiatCurrency - Target fiat currency for rate conversion
 * @returns {UseFetchTokenRatesMultiResult} Object containing rates, loading state, and error state
 */
export const useFetchTokenRatesMulti = ({
  tokens,
  fiatCurrency,
}: {
  tokens: DepositCryptoCurrency[];
  fiatCurrency: DepositFiatCurrency;
}): UseFetchTokenRatesMultiResult => {
  const [rates, setRates] = useState<Record<string, number | null>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTokenRates = async () => {
      setIsLoading(true);
      try {
        const assetIds = tokens.map((token) => token.assetId).join(',');
        const url = new URL(PRICE_API_URL);
        const params = new URLSearchParams({
          assetIds,
          vsCurrency: fiatCurrency.id,
        });
        url.search = params.toString();

        const response = (await handleFetch(url.toString())) as Record<
          string,
          { [key: string]: number }
        >;

        const newRates: Record<string, number | null> = {};
        const responseKeys = Object.keys(response);

        tokens.forEach((token) => {
          const responseKey = responseKeys.find(
            (key) => key.toLowerCase() === token.assetId.toLowerCase(),
          );
          newRates[token.assetId] = responseKey
            ? response[responseKey][fiatCurrency.id.toLowerCase()]
            : null;
        });

        setRates(newRates);
      } catch (e) {
        setError(
          e instanceof Error ? e : new Error('Failed to fetch token rates'),
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenRates();
  }, [tokens, fiatCurrency.id]);

  return { rates, isLoading, error };
};

export default useFetchTokenRatesMulti;

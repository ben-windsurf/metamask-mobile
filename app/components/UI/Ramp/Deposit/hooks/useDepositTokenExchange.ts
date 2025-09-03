import { useFetchTokenRatesMulti } from './useTokenRates';
import { DepositCryptoCurrency, DepositFiatCurrency } from '../constants';
import Logger from '../../../../../util/Logger';

interface UseTokenExchangeParams {
  fiatCurrency: DepositFiatCurrency;
  fiatAmount: string;
  token: DepositCryptoCurrency;
  tokens: DepositCryptoCurrency[];
}

interface UseTokenExchangeResult {
  tokenAmount: string;
  rate: number | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Custom hook for calculating token exchange amounts in deposit flows
 * Converts fiat currency amounts to token amounts using current exchange rates
 * @param {UseTokenExchangeParams} params - Exchange calculation parameters
 * @param {DepositFiatCurrency} params.fiatCurrency - The fiat currency to convert from
 * @param {string} params.fiatAmount - The fiat amount to convert
 * @param {DepositCryptoCurrency} params.token - The target token for conversion
 * @param {DepositCryptoCurrency[]} params.tokens - Available tokens for rate lookup
 * @returns {UseTokenExchangeResult} Exchange calculation result with token amount and rate
 */
const useDepositTokenExchange = ({
  fiatCurrency,
  fiatAmount,
  token,
  tokens,
}: UseTokenExchangeParams): UseTokenExchangeResult => {
  const { rates, isLoading, error } = useFetchTokenRatesMulti({
    tokens,
    fiatCurrency,
  });

  const currentToken = tokens.find(({ assetId }) => assetId === token.assetId);

  const rate = currentToken ? rates[currentToken.assetId] ?? null : null;

  let tokenAmount = '0';

  try {
    if (rate) {
      tokenAmount = (parseFloat(fiatAmount || '0') / rate).toFixed(
        token.decimals,
      );
    }
  } catch (e) {
    Logger.error(
      e as Error,
      `Error calculating token amount with fiat amount ${fiatAmount} and rate ${rate}`,
    );
  }

  return {
    tokenAmount,
    rate,
    isLoading,
    error,
  };
};

export default useDepositTokenExchange;

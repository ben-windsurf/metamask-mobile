import { mockQuoteWithMetadata } from './bridgeQuoteWithMetadata';

/**
 * Mock data for the useBridgeQuoteData hook
 * Provides test data for bridge quote functionality including active quotes, loading states, and formatted quote information
 */
export const mockUseBridgeQuoteData = {
  activeQuote: mockQuoteWithMetadata,
  bestQuote: mockQuoteWithMetadata,
  isLoading: false,
  destTokenAmount: '24.44',
  quoteFetchError: null,
  isNoQuotesAvailable: false,
  isExpired: false,
  willRefresh: false,
  formattedQuoteData: {
    networkFee: '0',
    estimatedTime: '0 min',
    rate: '0',
    priceImpact: '1%',
    slippage: '0.5%',
  },
};

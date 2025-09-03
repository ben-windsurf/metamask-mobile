import { Hex } from '@metamask/utils';

/**
 * Mock chain ID for testing bridge functionality
 */
export const mockChainId = '0x1' as Hex;

/**
 * Mock Ethereum token address for testing
 */
export const ethToken1Address =
  '0x0000000000000000000000000000000000000001' as Hex;

/**
 * Second mock Ethereum token address for testing
 */
export const ethToken2Address =
  '0x0000000000000000000000000000000000000002' as Hex;

/**
 * Mock Optimism token address for testing cross-chain bridge functionality
 */
export const optimismToken1Address =
  '0x0000000000000000000000000000000000000003' as Hex;

/**
 * Default mock state for the bridge controller used in testing
 * Contains initial values for quote requests, quotes, and loading states
 */
export const defaultBridgeControllerState = {
  quoteRequest: {},
  quotes: [],
  quotesInitialLoadTime: null,
  quotesLastFetched: null,
  quotesLoadingStatus: null,
  quoteFetchError: null,
  quotesRefreshCount: 0,
};

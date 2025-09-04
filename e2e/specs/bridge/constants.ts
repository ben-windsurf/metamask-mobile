import { mockEvents } from '../../api-mocking/mock-config/mock-events';

/**
 * Configuration options for local blockchain node used in bridge testing.
 * Contains hardfork version, mnemonic phrase, and chain ID for test environment.
 */
export const localNodeOptions = {
  hardfork: 'london',
  mnemonic:
    'drive manage close raven tape average sausage pledge riot furnace august tip',
  chainId: 1,
};

/**
 * API endpoint URL for fetching Solana tokens from the bridge service.
 * Used to retrieve available tokens on the Solana network for bridge operations.
 */
export const GET_TOKENS_SOLANA_URL =
  'https://bridge.api.cx.metamask.io/getTokens?chainId=1151111081099710';

/**
 * Mock response data for Solana tokens API call.
 * Contains token information including address, symbol, decimals, and metadata
 * for testing bridge functionality with Solana network.
 */
export const GET_TOKENS_SOLANA_RESPONSE = [
  {
    address: 'So11111111111111111111111111111111111111112',
    chainId: 1151111081099710,
    assetId:
      'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp/token:So11111111111111111111111111111111111111112',
    symbol: 'wSOL',
    decimals: 9,
    name: 'wSOL',
    coingeckoId: 'wrapped-solana',
    aggregators: ['orca', 'jupiter', 'coinGecko', 'lifi'],
    occurrences: 4,
    iconUrl:
      'https://static.cx.metamask.io/api/v2/tokenIcons/assets/solana/5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp/token/So11111111111111111111111111111111111111112.png',
    metadata: {},
  },
];

/**
 * API endpoint URL for fetching Base network tokens from the bridge service.
 * Used to retrieve available tokens on the Base network for bridge operations.
 */
export const GET_TOKENS_BASE_URL =
  'https://bridge.api.cx.metamask.io/getTokens?chainId=8453';

/**
 * Mock response data for Base network tokens API call.
 * Contains token information including ETH and USDC with their addresses,
 * symbols, decimals, and metadata for testing bridge functionality.
 */
export const GET_TOKENS_BASE_RESPONSE = [
  {
    address: '0x0000000000000000000000000000000000000000',
    chainId: 8453,
    assetId: 'eip155:8453/slip44:8453',
    symbol: 'ETH',
    decimals: 18,
    name: 'Ether',
    coingeckoId: 'base',
    aggregators: [],
    occurrences: 100,
    iconUrl:
      'https://static.cx.metamask.io/api/v2/tokenIcons/assets/eip155/8453/slip44/8453.png',
    metadata: {
      honeypotStatus: {},
      erc20Permit: false,
      createdAt: '2023-10-31T21:47:47.414Z',
    },
  },
  {
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    chainId: 8453,
    assetId: 'eip155:8453/erc20:0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
    symbol: 'USDC',
    decimals: 6,
    name: 'USDC',
    coingeckoId: 'usd-coin',
    aggregators: [
      'coinGecko',
      'optimism',
      'uniswap',
      'uniswapLabs',
      'oneInch',
      'liFi',
      'socket',
      'rubic',
      'squid',
      'rango',
      'sonarwatch',
      'sushiSwap',
    ],
    occurrences: 12,
    iconUrl:
      'https://static.cx.metamask.io/api/v2/tokenIcons/assets/eip155/8453/erc20/0x833589fcd6edb6e08f4c7c32d4f71b54bda02913.png',
    metadata: {
      honeypotStatus: {},
      isContractVerified: true,
      storage: {
        balance: 9,
        approval: 10,
      },
      erc20Permit: true,
      createdAt: '2023-10-31T21:47:47.414Z',
    },
  },
];

/**
 * Test-specific mock configuration for bridge API endpoints.
 * Defines GET and POST request mocks with their corresponding responses
 * and status codes for end-to-end testing scenarios.
 */
export const testSpecificMock = {
  GET: [
    {
      urlEndpoint: GET_TOKENS_SOLANA_URL,
      response: GET_TOKENS_SOLANA_RESPONSE,
      responseCode: 200,
    },
    {
      urlEndpoint: GET_TOKENS_BASE_URL,
      response: GET_TOKENS_BASE_RESPONSE,
      responseCode: 200,
    },
  ],
  POST: [mockEvents.POST.segmentTrack],
};

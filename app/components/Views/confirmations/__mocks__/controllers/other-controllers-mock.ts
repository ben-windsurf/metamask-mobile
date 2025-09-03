import { merge } from 'lodash';

/**
 * Mock Ethereum account address used for testing confirmations
 */
export const accountMock = '0xdc47789de4ceff0e8fe9d15d728af7f17550c164';

/**
 * Mock ERC-20 token address used for testing token interactions
 */
export const tokenAddress1Mock = '0x1234567890abcdef1234567890abcdef12345678';

/**
 * Mock ERC-20 token address used for testing multiple token scenarios
 */
export const tokenAddress2Mock = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef';

/**
 * Mock KeyringController state for testing wallet keyring functionality
 * Contains vault, unlock status, and keyring configuration data
 */
export const keyringControllerMock = {
  engine: {
    backgroundState: {
      KeyringController: {
        vault: undefined,
        isUnlocked: false,
        keyrings: [],
        encryptionKey: undefined,
        encryptionSalt: undefined,
      },
    },
  },
};

/**
 * Mock AccountsController state for testing account management functionality
 * Contains internal accounts data, metadata, and selected account information
 */
export const accountsControllerMock = {
  engine: {
    backgroundState: {
      AccountsController: {
        internalAccounts: {
          accounts: {
            [accountMock]: {
              address: accountMock,
              metadata: {
                name: 'Account 1',
                keyring: {
                  type: 'HD Key Tree',
                },
              },
            },
          },
          selectedAccount: accountMock,
        },
      },
    },
  },
};

/**
 * Mock AccountTrackerController state for testing account balance tracking
 * Contains accounts organized by chain ID for multichain support
 */
export const accountTrackerControllerMock = {
  engine: {
    backgroundState: {
      AccountTrackerController: {
        accountsByChainId: {},
      },
    },
  },
};

/**
 * Mock MultichainNetworkController state for testing multichain network functionality
 * Contains network configurations, selected chain, and transaction activity data
 */
export const multichainNetworkControllerMock = {
  engine: {
    backgroundState: {
      MultichainNetworkController: {
        multichainNetworkConfigurationsByChainId: {},
        selectedMultichainNetworkChainId: undefined,
        isEvmSelected: true,
        networksWithTransactionActivity: {},
      },
    },
  },
};

/**
 * Mock TokenBalancesController state for testing token balance functionality
 * Contains token balance data organized by account and chain
 */
export const tokenBalancesControllerMock = {
  engine: {
    backgroundState: {
      TokenBalancesController: {
        tokenBalances: {},
      },
    },
  },
};

/**
 * Mock NetworkController state for testing network management functionality
 * Contains network metadata, configurations, and selected network client information
 */
export const networkControllerMock = {
  engine: {
    backgroundState: {
      NetworkController: {
        networksMetadata: {
          mainnet: {
            EIPS: { 1559: true },
          },
        },
        networkConfigurationsByChainId: {
          '0x1': {
            nativeCurrency: 'ETH',
            rpcEndpoints: [
              {
                networkClientId: 'mainnet',
                url: 'https://mainnet.infura.io/v3/1234567890',
              },
            ],
            defaultRpcEndpointIndex: 0,
          },
        },
        selectedNetworkClientId: 'mainnet',
      },
    },
  },
};

/**
 * Mock CurrencyRateController state for testing currency conversion functionality
 * Contains current currency settings and exchange rates for ETH and other assets
 */
export const currencyRateControllerMock = {
  engine: {
    backgroundState: {
      CurrencyRateController: {
        currentCurrency: 'usd',
        currencyRates: {
          ETH: {
            conversionDate: 1732887955.694,
            conversionRate: 10000,
            usdConversionRate: 10000,
          },
        },
      },
    },
  },
};

/**
 * Mock NftController state for testing NFT functionality
 * Contains NFT contracts data organized by account and chain
 */
export const nftControllerMock = {
  engine: {
    backgroundState: {
      NftController: {
        allNftContracts: {},
      },
    },
  },
};

/**
 * Mock swaps state for testing token swap functionality
 * Contains feature flags and smart transaction configuration
 */
export const swapsState = {
  swaps: {
    featureFlags: {
      smartTransactions: {
        mobileActive: false,
      },
    },
  },
};

export const smartTransactionsControllerMock = {
  engine: {
    backgroundState: {
      SmartTransactionsController: {
        smartTransactionsState: {
          liveness: false,
        },
      },
    },
  },
};

export const preferencesControllerMock = {
  engine: {
    backgroundState: {
      PreferencesController: {
        useTransactionSimulations: false,
      },
    },
  },
};

export const tokensControllerMock = {
  engine: {
    backgroundState: {
      TokensController: {
        allTokens: {
          '0x1': {
            [accountMock]: [
              {
                address: tokenAddress1Mock,
                chainId: '0x1',
                decimals: 4,
                symbol: 'T1',
              },
              {
                address: tokenAddress2Mock,
                chainId: '0x1',
                decimals: 6,
                symbol: 'T2',
              },
            ],
          },
        },
      },
    },
  },
};

export const tokenListControllerMock = {
  engine: {
    backgroundState: {
      TokenListController: {
        tokensChainsCache: {
          '0x1': {},
        },
      },
    },
  },
};

export const otherControllersMock = merge(
  {},
  accountsControllerMock,
  accountTrackerControllerMock,
  currencyRateControllerMock,
  keyringControllerMock,
  networkControllerMock,
  multichainNetworkControllerMock,
  nftControllerMock,
  preferencesControllerMock,
  tokenBalancesControllerMock,
  swapsState,
  smartTransactionsControllerMock,
  preferencesControllerMock,
  tokenListControllerMock,
);

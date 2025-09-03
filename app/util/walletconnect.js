/**
 * WalletConnect client configuration options for MetaMask Mobile
 * Contains metadata and connection settings for WalletConnect sessions
 */
export const CLIENT_OPTIONS = {
  clientMeta: {
    // Required
    description: 'MetaMask Mobile app',
    url: 'https://metamask.io',
    icons: [],
    name: 'MetaMask',
    ssl: true,
  },
};

/**
 * Origin identifier prefix used for WalletConnect connections
 * Used to identify and differentiate WalletConnect requests from other connection types
 */
export const WALLET_CONNECT_ORIGIN = 'wc::';

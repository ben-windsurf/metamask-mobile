/**
 * WalletConnect client configuration options for MetaMask Mobile.
 * Contains metadata required for establishing WalletConnect sessions.
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
 * Origin identifier prefix used for WalletConnect connections.
 * Used to identify requests originating from WalletConnect sessions.
 */
export const WALLET_CONNECT_ORIGIN = 'wc::';

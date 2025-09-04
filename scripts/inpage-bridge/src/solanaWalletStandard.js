const { getMultichainClient, getWindowPostMessageTransport } = require('@metamask/multichain-api-client');
const { registerSolanaWalletStandard } = require('@metamask/solana-wallet-standard');

/**
 * Injects the Solana Wallet Standard into the current environment.
 * Creates a multichain client and registers it as a Solana wallet standard provider.
 */
const injectSolanaWalletStandard = () => {
  const multichainClient = getMultichainClient({
    transport: getWindowPostMessageTransport(),
  });
  registerSolanaWalletStandard({
    client: multichainClient,
    walletName: process.env.METAMASK_BUILD_NAME,
  });
};

export default injectSolanaWalletStandard;

/**
 * Configuration object defining which WalletConnect RPC methods should trigger
 * a redirect to the MetaMask Mobile app for user interaction and approval.
 * These methods require user confirmation and cannot be handled silently in the background.
 *
 * @type {Object.<string, boolean>} Map of RPC method names to redirect flags
 */
export const METHODS_TO_REDIRECT: { [method: string]: boolean } = {
  eth_requestAccounts: true,
  eth_sendTransaction: true,
  eth_signTransaction: true,
  personal_sign: true,
  eth_signTypedData: true,
  eth_signTypedData_v3: true,
  eth_signTypedData_v4: true,
  wallet_watchAsset: true,
  wallet_addEthereumChain: true,
  wallet_switchEthereumChain: true,
};

export default METHODS_TO_REDIRECT;

/**
 * Configuration object that defines which WalletConnect methods should trigger
 * a redirect to the MetaMask app for user interaction and approval.
 *
 * These methods require user confirmation or input and cannot be handled
 * silently in the background, so they need to redirect to the main app UI.
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

import eth_sendTransaction from './eth_sendTransaction';
import { wallet_addEthereumChain } from './wallet_addEthereumChain.js';
import { wallet_switchEthereumChain } from './wallet_switchEthereumChain.js';
import { wallet_watchAsset } from './wallet_watchAsset.ts';

/**
 * Collection of RPC method handlers for MetaMask wallet operations.
 * Contains handlers for Ethereum JSON-RPC methods and wallet-specific methods.
 */
const RPCMethods = {
  eth_sendTransaction,
  wallet_addEthereumChain,
  wallet_switchEthereumChain,
  wallet_watchAsset,
};

export default RPCMethods;

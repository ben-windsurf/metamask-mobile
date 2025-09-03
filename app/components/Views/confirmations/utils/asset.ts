import { CHAIN_IDS } from '@metamask/transaction-controller';
import { Hex } from '@metamask/utils';
import { NATIVE_TOKEN_ADDRESS } from '../constants/tokens';

/**
 * Gets the native token address for a given blockchain network
 * Returns the appropriate native token contract address based on the chain ID
 * @param {Hex} chainId - The hexadecimal chain ID of the blockchain network
 * @returns {string} The native token contract address for the specified chain
 */
export const getNativeTokenAddress = (chainId: Hex) => {
  switch (chainId) {
    case CHAIN_IDS.POLYGON:
      return '0x0000000000000000000000000000000000001010';
    default:
      return NATIVE_TOKEN_ADDRESS;
  }
};

import {
  CaipChainId,
  ///: BEGIN:ONLY_INCLUDE_IF(keyring-snaps)
  SolScope,
  ///: END:ONLY_INCLUDE_IF(keyring-snaps)
} from '@metamask/keyring-api';
import AppConstants from '../../../../core/AppConstants';
import { Hex, isCaipAssetType } from '@metamask/utils';
import {
  ARBITRUM_CHAIN_ID,
  AVALANCHE_CHAIN_ID,
  BASE_CHAIN_ID,
  BSC_CHAIN_ID,
  ETH_CHAIN_ID,
  LINEA_CHAIN_ID,
  OPTIMISM_CHAIN_ID,
  POLYGON_CHAIN_ID,
  ZKSYNC_ERA_CHAIN_ID,
  SEI_CHAIN_ID,
} from '@metamask/swaps-controller/dist/constants';
import Engine from '../../../../core/Engine';
import { isSolanaChainId } from '@metamask/bridge-controller';

const ALLOWED_CHAIN_IDS: (Hex | CaipChainId)[] = [
  ETH_CHAIN_ID,
  OPTIMISM_CHAIN_ID,
  BSC_CHAIN_ID,
  POLYGON_CHAIN_ID,
  ZKSYNC_ERA_CHAIN_ID,
  BASE_CHAIN_ID,
  ARBITRUM_CHAIN_ID,
  AVALANCHE_CHAIN_ID,
  LINEA_CHAIN_ID,
  SEI_CHAIN_ID,
  ///: BEGIN:ONLY_INCLUDE_IF(keyring-snaps)
  SolScope.Mainnet,
  ///: END:ONLY_INCLUDE_IF(keyring-snaps)
];

/**
 * Checks if bridging is allowed for the specified chain ID
 * @param {Hex | CaipChainId} chainId - The chain ID to check
 * @returns {boolean} True if bridging is allowed for this chain, false otherwise
 */
export const isBridgeAllowed = (chainId: Hex | CaipChainId) => {
  if (!AppConstants.BRIDGE.ACTIVE) {
    return false;
  }
  return ALLOWED_CHAIN_IDS.includes(chainId);
};

/**
 * Clears bridge status for the specified address and chain
 * For EVM chains, also clears status for the lowercase version of the address
 * @param {string} address - The address to clear bridge status for
 * @param {Hex | CaipChainId} chainId - The chain ID associated with the address
 */
export const wipeBridgeStatus = (
  address: string,
  chainId: Hex | CaipChainId,
) => {
  Engine.context.BridgeStatusController.wipeBridgeStatus({
    address,
    ignoreNetwork: false,
  });
  // Solana addresses are case-sensitive, so we can only do this for EVM
  if (!isSolanaChainId(chainId)) {
    Engine.context.BridgeStatusController.wipeBridgeStatus({
      address: address.toLowerCase(),
      ignoreNetwork: false,
    });
  }
};

/**
 * Normalizes an address to CAIP asset type format
 * If the address is already in CAIP format, returns it as-is.
 * Otherwise, converts it to CAIP format using the provided chainId.
 * @param {string} address - The address to normalize
 * @param {Hex | CaipChainId} chainId - The chain ID to use for CAIP formatting
 * @returns {string} The address in CAIP asset type format
 */
export function normalizeToCaipAssetType(
  address: string,
  chainId: Hex | CaipChainId,
): string {
  if (isCaipAssetType(address)) {
    return address;
  }

  return `${chainId}/token:${address}`;
}

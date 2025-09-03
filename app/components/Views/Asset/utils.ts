///: BEGIN:ONLY_INCLUDE_IF(keyring-snaps)
import { SolScope } from '@metamask/keyring-api';
import { selectIsBridgeEnabledSource } from '../../../core/redux/slices/bridge';
///: END:ONLY_INCLUDE_IF(keyring-snaps)
import {
  swapsLivenessMultichainSelector,
  swapsLivenessSelector,
} from '../../../reducers/swaps';
import { isAssetFromSearch } from '../../../selectors/tokenSearchDiscoveryDataController';
import { isPortfolioViewEnabled } from '../../../util/networks';
import { Hex, CaipChainId } from '@metamask/utils';
import { RootState } from '../../../reducers';

/**
 * Determines if swaps functionality is live for a given chain
 * Checks both EVM and Solana chain support based on portfolio view settings
 * @param {RootState} state - Redux state containing swap liveness data
 * @param {Hex | CaipChainId} chainId - The chain ID to check swap availability for
 * @returns {boolean} True if swaps are live for the specified chain
 */
export const getSwapsIsLive = (
  state: RootState,
  chainId: Hex | CaipChainId,
) => {
  const evmSwapsIsLive = isPortfolioViewEnabled()
    ? // @ts-expect-error issues with the type, it should have 2 args
      swapsLivenessMultichainSelector(state, chainId)
    : swapsLivenessSelector(state);
  let swapsIsLive = evmSwapsIsLive;

  ///: BEGIN:ONLY_INCLUDE_IF(keyring-snaps)
  if (chainId === SolScope.Mainnet) {
    const solanaSwapsIsLive = selectIsBridgeEnabledSource(state, chainId);
    swapsIsLive = solanaSwapsIsLive;
  }
  ///: END:ONLY_INCLUDE_IF(keyring-snaps)
  return swapsIsLive;
};

/**
 * Determines if an asset is allowed for swaps functionality
 * Checks asset eligibility based on type (native/ERC-20), search discovery tokens, and supported swap tokens
 * Supports both EVM and Solana assets with different validation logic
 * @param {Object} params - Parameters object
 * @param {Object} params.asset - Asset information including type and address
 * @param {boolean} params.asset.isETH - Whether the asset is ETH
 * @param {boolean} params.asset.isNative - Whether the asset is a native token
 * @param {string} params.asset.address - The asset's contract address
 * @param {string} params.asset.chainId - The chain ID where the asset exists
 * @param {boolean} [params.asset.isFromSearch] - Whether the asset was found via search
 * @param {string[]} params.searchDiscoverySwapsTokens - List of tokens discoverable via search that support swaps
 * @param {Record<string, unknown>} params.swapsTokens - Map of supported swap tokens by address
 * @returns {boolean} True if the asset is allowed for swaps
 */
export const getIsSwapsAssetAllowed = ({
  asset,
  searchDiscoverySwapsTokens,
  swapsTokens,
}: {
  asset: {
    isETH: boolean;
    isNative: boolean;
    address: string;
    chainId: string;
    isFromSearch?: boolean;
  };
  searchDiscoverySwapsTokens: string[];
  swapsTokens: Record<string, unknown>;
}) => {
  // EVM Swaps
  let isEvmSwapsAssetAllowed;
  if (asset.isETH || asset.isNative) {
    isEvmSwapsAssetAllowed = true;
  } else if (isAssetFromSearch(asset)) {
    isEvmSwapsAssetAllowed = searchDiscoverySwapsTokens?.includes(
      asset.address?.toLowerCase(),
    );
  } else {
    isEvmSwapsAssetAllowed = asset.address?.toLowerCase() in swapsTokens;
  }
  let isSwapsAssetAllowed = isEvmSwapsAssetAllowed;

  // Solana Swaps
  ///: BEGIN:ONLY_INCLUDE_IF(keyring-snaps)
  if (asset.chainId === SolScope.Mainnet) {
    isSwapsAssetAllowed = true;
  }
  ///: END:ONLY_INCLUDE_IF(keyring-snaps)

  return isSwapsAssetAllowed;
};

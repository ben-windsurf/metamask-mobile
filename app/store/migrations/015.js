import { NetworksChainId } from '@metamask/controller-utils';
import { GOERLI } from '../../../app/constants/network';

/**
 * Migration 15: Deprecates Rinkeby, Ropsten, and Kovan test networks
 * Migrates users from deprecated test networks (chainId 4, 3, 42) to Goerli testnet
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state with updated network configuration
 */
export default function migrate(state) {
  const chainId =
    state.engine.backgroundState.NetworkController.providerConfig.chainId;
  // Deprecate rinkeby, ropsten and Kovan, any user that is on those we fallback to goerli
  if (chainId === '4' || chainId === '3' || chainId === '42') {
    state.engine.backgroundState.NetworkController.providerConfig = {
      chainId: NetworksChainId.goerli,
      ticker: 'GoerliETH',
      type: GOERLI,
    };
  }
  return state;
}

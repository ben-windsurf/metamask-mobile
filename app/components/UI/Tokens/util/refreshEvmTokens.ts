import { Hex } from '@metamask/utils';
import { performEvmRefresh } from './tokenRefreshUtils';

interface RefreshEvmTokensProps {
  isEvmSelected: boolean;
  evmNetworkConfigurationsByChainId: Record<
    string,
    { chainId: Hex; nativeCurrency: string }
  >;
  nativeCurrencies: string[];
}

/**
 * Refreshes EVM token data for selected networks
 * Performs token refresh only when EVM networks are selected
 * @param {RefreshEvmTokensProps} params - Token refresh parameters
 * @param {boolean} params.isEvmSelected - Whether EVM networks are currently selected
 * @param {Record<string, { chainId: Hex; nativeCurrency: string }>} params.evmNetworkConfigurationsByChainId - EVM network configurations indexed by chain ID
 * @param {string[]} params.nativeCurrencies - Array of native currency symbols
 * @returns {Promise<void>} Promise that resolves when token refresh is complete
 */
export const refreshEvmTokens = async ({
  isEvmSelected,
  evmNetworkConfigurationsByChainId,
  nativeCurrencies,
}: RefreshEvmTokensProps) => {
  if (!isEvmSelected) {
    return;
  }

  await performEvmRefresh(evmNetworkConfigurationsByChainId, nativeCurrencies);
};

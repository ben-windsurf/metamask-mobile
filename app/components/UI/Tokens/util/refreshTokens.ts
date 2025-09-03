import { Hex } from '@metamask/utils';
import Engine from '../../../../core/Engine';
import Logger from '../../../../util/Logger';
import { InternalAccount } from '@metamask/keyring-internal-api';
import { performEvmRefresh } from './tokenRefreshUtils';

interface RefreshTokensProps {
  isEvmSelected: boolean;
  evmNetworkConfigurationsByChainId: Record<
    string,
    { chainId: Hex; nativeCurrency: string }
  >;
  nativeCurrencies: string[];
  selectedAccountId?: InternalAccount['id'];
}

/**
 * Refreshes token balances for the selected account across different network types
 * Handles both EVM and non-EVM networks, updating balances through appropriate controllers
 * @param {RefreshTokensProps} params - Configuration object for token refresh
 * @param {boolean} params.isEvmSelected - Whether an EVM network is currently selected
 * @param {Record<string, { chainId: Hex; nativeCurrency: string }>} params.evmNetworkConfigurationsByChainId - EVM network configurations indexed by chain ID
 * @param {string[]} params.nativeCurrencies - Array of native currency symbols
 * @param {string} params.selectedAccountId - ID of the currently selected account
 * @returns {Promise<void>} Promise that resolves when token refresh is complete
 */
export const refreshTokens = async ({
  isEvmSelected,
  evmNetworkConfigurationsByChainId,
  nativeCurrencies,
  selectedAccountId,
}: RefreshTokensProps) => {
  if (!isEvmSelected) {
    const { MultichainBalancesController } = Engine.context;
    if (selectedAccountId) {
      try {
        await MultichainBalancesController.updateBalance(selectedAccountId);
      } catch (error) {
        Logger.error(error as Error, 'Error while refreshing NonEvm tokens');
      }
    }
    return;
  }

  await performEvmRefresh(evmNetworkConfigurationsByChainId, nativeCurrencies);
};

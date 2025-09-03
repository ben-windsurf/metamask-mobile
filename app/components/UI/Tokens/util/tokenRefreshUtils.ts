import { Hex } from '@metamask/utils';
import Engine from '../../../../core/Engine';
import Logger from '../../../../util/Logger';

/**
 * Performs a comprehensive refresh of EVM token data across multiple networks
 * Updates token detection, balances, account tracking, currency rates, and token rates
 * @param {Record<string, { chainId: Hex; nativeCurrency: string }>} evmNetworkConfigurationsByChainId - Network configurations indexed by chain ID
 * @param {string[]} nativeCurrencies - Array of native currency symbols to update rates for
 * @returns {Promise<void>} Promise that resolves when all refresh operations complete
 */
export const performEvmRefresh = async (
  evmNetworkConfigurationsByChainId: Record<
    string,
    { chainId: Hex; nativeCurrency: string }
  >,
  nativeCurrencies: string[],
) => {
  const {
    TokenDetectionController,
    AccountTrackerController,
    CurrencyRateController,
    TokenRatesController,
    TokenBalancesController,
    NetworkController,
  } = Engine.context;

  const networkClientIds = Object.values(
    NetworkController.state.networkConfigurationsByChainId,
  ).map(
    (network) =>
      network?.rpcEndpoints?.[network.defaultRpcEndpointIndex]?.networkClientId,
  );

  const actions = [
    TokenDetectionController.detectTokens({
      chainIds: Object.keys(evmNetworkConfigurationsByChainId) as Hex[],
    }),
    TokenBalancesController.updateBalances({
      chainIds: Object.keys(evmNetworkConfigurationsByChainId) as Hex[],
    }),
    AccountTrackerController.refresh(networkClientIds),
    CurrencyRateController.updateExchangeRate(nativeCurrencies),
    TokenRatesController.updateExchangeRatesByChainId(
      Object.values(evmNetworkConfigurationsByChainId).filter(
        (n) => n.chainId && n.nativeCurrency,
      ),
    ),
  ];

  await Promise.all(actions).catch((error) => {
    Logger.error(error, 'Error while refreshing tokens');
  });
};

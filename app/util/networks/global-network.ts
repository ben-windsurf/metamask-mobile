import EthQuery from '@metamask/eth-query';
import {
  NetworkClientId,
  NetworkController,
} from '@metamask/network-controller';
import { Hex } from '@metamask/utils';
import Engine from '../../core/Engine';

/**
 * Gets an EthQuery instance for the globally selected network.
 *
 * @param networkController - Optional NetworkController instance. If not provided, uses the Engine's NetworkController.
 * @returns An EthQuery instance configured for the selected network provider.
 * @throws Error if no selected network client is available.
 */
export function getGlobalEthQuery(
  networkController?: NetworkController,
): EthQuery {
  const finalController = networkController ?? Engine.context.NetworkController;
  const { provider } = finalController.getSelectedNetworkClient() ?? {};

  if (!provider) {
    throw new Error('No selected network client');
  }

  return new EthQuery(provider);
}

/**
 * Gets the chain ID of the globally selected network.
 *
 * @param networkController - Optional NetworkController instance. If not provided, uses the Engine's NetworkController.
 * @returns The chain ID as a hex string.
 */
export function getGlobalChainId(networkController?: NetworkController): Hex {
  const finalController = networkController ?? Engine.context.NetworkController;

  return finalController.getNetworkClientById(
    getGlobalNetworkClientId(finalController),
  ).configuration.chainId;
}

/**
 * Gets the network client ID of the globally selected network.
 *
 * @param networkController - Optional NetworkController instance. If not provided, uses the Engine's NetworkController.
 * @returns The network client ID of the selected network.
 */
export function getGlobalNetworkClientId(
  networkController?: NetworkController,
): NetworkClientId {
  const finalController = networkController ?? Engine.context.NetworkController;
  return finalController.state.selectedNetworkClientId;
}

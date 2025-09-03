import EthQuery from '@metamask/eth-query';
import {
  NetworkClientId,
  NetworkController,
} from '@metamask/network-controller';
import { Hex } from '@metamask/utils';
import Engine from '../../core/Engine';

/**
 * Gets an EthQuery instance for the currently selected global network
 * @param {NetworkController} networkController - Optional network controller instance, defaults to Engine context
 * @returns {EthQuery} EthQuery instance configured for the selected network
 * @throws {Error} When no selected network client is available
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
 * Gets the chain ID for the currently selected global network
 * @param {NetworkController} networkController - Optional network controller instance, defaults to Engine context
 * @returns {Hex} The chain ID of the selected network as a hex string
 */
export function getGlobalChainId(networkController?: NetworkController): Hex {
  const finalController = networkController ?? Engine.context.NetworkController;

  return finalController.getNetworkClientById(
    getGlobalNetworkClientId(finalController),
  ).configuration.chainId;
}

/**
 * Gets the network client ID for the currently selected global network
 * @param {NetworkController} networkController - Optional network controller instance, defaults to Engine context
 * @returns {NetworkClientId} The network client ID of the selected network
 */
export function getGlobalNetworkClientId(
  networkController?: NetworkController,
): NetworkClientId {
  const finalController = networkController ?? Engine.context.NetworkController;
  return finalController.state.selectedNetworkClientId;
}

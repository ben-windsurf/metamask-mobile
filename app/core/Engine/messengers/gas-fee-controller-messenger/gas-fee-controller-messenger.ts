import type {
  GasFeeControllerActions,
  GasFeeControllerEvents,
} from '@metamask/gas-fee-controller';
import {
  NetworkControllerNetworkDidChangeEvent,
  NetworkControllerGetNetworkClientByIdAction,
  NetworkControllerGetEIP1559CompatibilityAction,
  NetworkControllerGetStateAction,
} from '@metamask/network-controller';
import { Messenger, RestrictedMessenger } from '@metamask/base-controller';

const name = 'GasFeeController';

type MessengerActions =
  | NetworkControllerGetEIP1559CompatibilityAction
  | NetworkControllerGetNetworkClientByIdAction
  | NetworkControllerGetStateAction
  | GasFeeControllerActions;

type MessengerEvents =
  | NetworkControllerNetworkDidChangeEvent
  | GasFeeControllerEvents;

// This is not exported from the gas-fee-controller package right now
export type GasFeeControllerMessenger = RestrictedMessenger<
  typeof name,
  MessengerActions,
  MessengerEvents,
  MessengerActions['type'],
  MessengerEvents['type']
>;

/**
 * Creates a restricted messenger for the GasFeeController with specific permissions
 * This messenger allows the GasFeeController to interact with the NetworkController
 * to get network state, EIP-1559 compatibility, and network client information
 * @param {Messenger<MessengerActions, MessengerEvents>} messenger - The main messenger instance
 * @returns {GasFeeControllerMessenger} A restricted messenger configured for gas fee operations
 */
export function getGasFeeControllerMessenger(
  messenger: Messenger<MessengerActions, MessengerEvents>,
): GasFeeControllerMessenger {
  return messenger.getRestricted({
    name: 'GasFeeController',
    allowedActions: [
      'NetworkController:getEIP1559Compatibility',
      'NetworkController:getNetworkClientById',
      'NetworkController:getState',
    ],
    allowedEvents: ['NetworkController:networkDidChange'],
  });
}

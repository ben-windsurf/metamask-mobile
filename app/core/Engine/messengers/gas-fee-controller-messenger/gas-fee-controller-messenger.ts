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

/** Controller name identifier for the GasFeeController */
const name = 'GasFeeController';

/** Union type of all actions that the GasFeeController messenger can handle */
type MessengerActions =
  | NetworkControllerGetEIP1559CompatibilityAction
  | NetworkControllerGetNetworkClientByIdAction
  | NetworkControllerGetStateAction
  | GasFeeControllerActions;

/** Union type of all events that the GasFeeController messenger can listen to */
type MessengerEvents =
  | NetworkControllerNetworkDidChangeEvent
  | GasFeeControllerEvents;

/**
 * Restricted messenger type for the GasFeeController.
 * This messenger provides controlled access to network-related actions and events
 * needed for gas fee estimation and management.
 */
export type GasFeeControllerMessenger = RestrictedMessenger<
  typeof name,
  MessengerActions,
  MessengerEvents,
  MessengerActions['type'],
  MessengerEvents['type']
>;

/**
 * Creates a restricted messenger instance for the GasFeeController.
 * The messenger provides access to network controller actions and events
 * required for gas fee calculations and EIP-1559 compatibility checks.
 *
 * @param messenger - The base messenger instance to create restrictions from
 * @returns A restricted messenger configured for GasFeeController operations
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

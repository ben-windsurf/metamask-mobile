import { Messenger } from '@metamask/base-controller';
import {
  AccountsControllerAccountAddedEvent,
  AccountsControllerAccountRemovedEvent,
  AccountsControllerGetAccountAction,
  AccountsControllerGetAccountByAddressAction,
  AccountsControllerListMultichainAccountsAction,
} from '@metamask/accounts-controller';
import { HandleSnapRequest as SnapControllerHandleRequest } from '@metamask/snaps-controllers';
import {
  KeyringControllerWithKeyringAction,
  KeyringControllerGetStateAction,
  KeyringControllerStateChangeEvent,
} from '@metamask/keyring-controller';

/**
 * Union type of all actions that the multichain account service messenger can handle.
 * Includes account management, snap handling, and keyring operations.
 */
type Actions =
  | AccountsControllerListMultichainAccountsAction
  | AccountsControllerGetAccountAction
  | AccountsControllerGetAccountByAddressAction
  | SnapControllerHandleRequest
  | KeyringControllerGetStateAction
  | KeyringControllerWithKeyringAction;

/**
 * Union type of all events that the multichain account service messenger can listen to.
 * Includes keyring state changes and account lifecycle events.
 */
type Events =
  | KeyringControllerStateChangeEvent
  | AccountsControllerAccountAddedEvent
  | AccountsControllerAccountRemovedEvent;

/**
 * Type representing the restricted messenger for the multichain account service.
 * This messenger is scoped to specific actions and events for security and isolation.
 */
export type MultichainAccountServiceMessenger = ReturnType<
  typeof getMultichainAccountServiceMessenger
>;

/**
 * Get a restricted messenger for the multichain account service. This is scoped to the
 * actions and events that this service is allowed to handle.
 *
 * @param messenger - The service messenger to restrict.
 * @returns The restricted service messenger.
 */
export function getMultichainAccountServiceMessenger(
  messenger: Messenger<Actions, Events>,
) {
  return messenger.getRestricted({
    name: 'MultichainAccountService',
    allowedEvents: ['KeyringController:stateChange'],
    allowedActions: [
      'AccountsController:listMultichainAccounts',
      'AccountsController:getAccountByAddress',
      'AccountsController:getAccount',
      'SnapController:handleRequest',
      'KeyringController:getState',
      'KeyringController:withKeyring',
    ],
  });
}

/**
 * Get a restricted messenger for the multichain account service. This is scoped to the
 * actions and events that this service is allowed to handle.
 *
 * @param messenger - The service messenger to restrict.
 * @returns The restricted service messenger.
 */
export function getMultichainAccountServiceInitMessenger(
  messenger: Messenger<Actions, Events>,
) {
  // Our `init` method needs the same actions, so just re-use the same messenger
  // function here.
  return getMultichainAccountServiceMessenger(messenger);
}

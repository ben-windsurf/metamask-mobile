import { DeFiPositionsControllerMessenger } from '@metamask/assets-controllers';
import {
  AccountsControllerAccountAddedEvent,
  AccountsControllerListAccountsAction,
} from '@metamask/accounts-controller';
import {
  KeyringControllerLockEvent,
  KeyringControllerUnlockEvent,
} from '@metamask/keyring-controller';
import { TransactionControllerTransactionConfirmedEvent } from '@metamask/transaction-controller';
import { Messenger } from '@metamask/base-controller';
import { RemoteFeatureFlagControllerGetStateAction } from '@metamask/remote-feature-flag-controller';

/**
 * Actions that the DeFi Positions Controller messenger can dispatch.
 */
type Actions = AccountsControllerListAccountsAction;

/**
 * Events that the DeFi Positions Controller messenger can subscribe to.
 */
type Events =
  | KeyringControllerUnlockEvent
  | KeyringControllerLockEvent
  | TransactionControllerTransactionConfirmedEvent
  | AccountsControllerAccountAddedEvent;

/**
 * Get a restricted messenger for the DeFiPositionsController.
 *
 * @param messenger - The messenger to restrict.
 * @returns The restricted messenger.
 */
export function getDeFiPositionsControllerMessenger(
  messenger: Messenger<Actions, Events>,
): DeFiPositionsControllerMessenger {
  return messenger.getRestricted({
    name: 'DeFiPositionsController',
    allowedActions: ['AccountsController:listAccounts'],
    allowedEvents: [
      'KeyringController:unlock',
      'KeyringController:lock',
      'TransactionController:transactionConfirmed',
      'AccountsController:accountAdded',
    ],
  });
}

/**
 * Actions that the DeFi Positions Controller initialization messenger can dispatch.
 */
type InitActions = RemoteFeatureFlagControllerGetStateAction;

/**
 * Type for the DeFi Positions Controller initialization messenger.
 */
export type DeFiPositionsControllerInitMessenger = ReturnType<
  typeof getDeFiPositionsControllerInitMessenger
>;

/**
 * Get a restricted messenger for DeFi Positions Controller initialization.
 *
 * @param messenger - The base messenger to restrict.
 * @returns The restricted initialization messenger.
 */
export function getDeFiPositionsControllerInitMessenger(
  messenger: Messenger<InitActions, never>,
) {
  return messenger.getRestricted({
    name: 'DeFiPositionsControllerInit',
    allowedEvents: [],
    allowedActions: ['RemoteFeatureFlagController:getState'],
  });
}

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

type Actions = AccountsControllerListAccountsAction;

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

type InitActions = RemoteFeatureFlagControllerGetStateAction;

export type DeFiPositionsControllerInitMessenger = ReturnType<
  typeof getDeFiPositionsControllerInitMessenger
>;

/**
 * Get a restricted messenger for DeFiPositionsController initialization.
 * This messenger is used during the initialization phase to access remote feature flags
 * and determine if DeFi positions functionality should be enabled.
 *
 * @param messenger - The base messenger to restrict for initialization purposes
 * @returns The restricted messenger with access to RemoteFeatureFlagController actions
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

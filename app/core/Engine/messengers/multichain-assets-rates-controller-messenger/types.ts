import {
  KeyringControllerLockEvent,
  KeyringControllerUnlockEvent,
} from '@metamask/keyring-controller';
import {
  CurrencyRateStateChange,
  GetCurrencyRateState,
  MultichainAssetsControllerGetStateAction,
  MultichainAssetsControllerAccountAssetListUpdatedEvent,
} from '@metamask/assets-controllers';
import {
  AccountsControllerAccountAddedEvent,
  AccountsControllerListMultichainAccountsAction,
} from '@metamask/accounts-controller';
import { HandleSnapRequest } from '@metamask/snaps-controllers';

/**
 * Union type of all actions that the MultichainAssetsRatesController messenger can handle.
 * Includes snap requests, account management actions, currency rate queries, and asset state actions.
 */
export type MultichainAssetsRatesControllerMessengerActions =
  | HandleSnapRequest
  | AccountsControllerListMultichainAccountsAction
  | GetCurrencyRateState
  | MultichainAssetsControllerGetStateAction;

/**
 * Union type of all events that the MultichainAssetsRatesController messenger can emit or listen to.
 * Includes keyring lock/unlock events, account management events, currency rate changes, and asset list updates.
 */
export type MultichainAssetsRatesControllerMessengerEvents =
  | KeyringControllerLockEvent
  | KeyringControllerUnlockEvent
  | AccountsControllerAccountAddedEvent
  | CurrencyRateStateChange
  | MultichainAssetsControllerAccountAssetListUpdatedEvent;

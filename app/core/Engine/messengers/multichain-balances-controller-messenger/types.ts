import {
  AccountsControllerAccountAddedEvent,
  AccountsControllerAccountRemovedEvent,
  AccountsControllerListMultichainAccountsAction,
  AccountsControllerAccountBalancesUpdatesEvent,
} from '@metamask/accounts-controller';
import { HandleSnapRequest } from '@metamask/snaps-controllers';
import {
  MultichainAssetsControllerGetStateAction,
  MultichainAssetsControllerAccountAssetListUpdatedEvent,
} from '@metamask/assets-controllers';

/**
 * Union type defining all possible actions that the MultichainBalancesController can handle.
 * Includes actions for listing multichain accounts, handling snap requests, and getting asset state.
 */
export type MultichainBalancesControllerActions =
  | AccountsControllerListMultichainAccountsAction
  | HandleSnapRequest
  | MultichainAssetsControllerGetStateAction;

/**
 * Union type defining all possible events that the MultichainBalancesController can emit or listen to.
 * Includes events for account management and asset list updates across multiple chains.
 */
export type MultichainBalancesControllerEvents =
  | AccountsControllerAccountAddedEvent
  | AccountsControllerAccountRemovedEvent
  | AccountsControllerAccountBalancesUpdatesEvent
  | MultichainAssetsControllerAccountAssetListUpdatedEvent;

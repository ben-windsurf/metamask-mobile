import {
  AccountsControllerAccountAddedEvent,
  AccountsControllerAccountAssetListUpdatedEvent,
  AccountsControllerAccountRemovedEvent,
  AccountsControllerListMultichainAccountsAction,
} from '@metamask/accounts-controller';
import { GetPermissions } from '@metamask/permission-controller';
import { GetAllSnaps, HandleSnapRequest } from '@metamask/snaps-controllers';

/**
 * Union type of all actions that the MultichainAssetsController can handle.
 * Includes snap request handling, snap management, permission queries, and multichain account operations.
 */
export type MultichainAssetsControllerActions =
  | HandleSnapRequest
  | GetAllSnaps
  | GetPermissions
  | AccountsControllerListMultichainAccountsAction;

/**
 * Union type of all events that the MultichainAssetsController can emit or listen to.
 * Includes account lifecycle events and asset list updates across multiple chains.
 */
export type MultichainAssetsControllerEvents =
  | AccountsControllerAccountAddedEvent
  | AccountsControllerAccountRemovedEvent
  | AccountsControllerAccountAssetListUpdatedEvent;

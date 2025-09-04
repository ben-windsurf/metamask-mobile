import { Messenger } from '@metamask/base-controller';
import {
  AccountsControllerListMultichainAccountsAction,
  GetSnap,
} from '@metamask/snaps-controllers';
import {
  AcceptRequest,
  HasApprovalRequest,
} from '@metamask/approval-controller';
import { MaybeUpdateState, TestOrigin } from '@metamask/phishing-controller';
import { NotificationListUpdatedEvent } from '@metamask/notification-services-controller/notification-services';
import { MultichainAssetsControllerGetStateAction } from '@metamask/assets-controllers';
import {
  AccountsControllerGetAccountByAddressAction,
  AccountsControllerGetSelectedMultichainAccountAction,
} from '@metamask/accounts-controller';

/**
 * Union type of all actions that the Snap interface controller messenger can handle.
 * Includes actions for phishing detection, approval management, snap operations,
 * multichain assets, and account management.
 */
type Actions =
  | MaybeUpdateState
  | TestOrigin
  | HasApprovalRequest
  | AcceptRequest
  | GetSnap
  | MultichainAssetsControllerGetStateAction
  | AccountsControllerGetSelectedMultichainAccountAction
  | AccountsControllerGetAccountByAddressAction
  | AccountsControllerListMultichainAccountsAction;

/**
 * Union type of all events that the Snap interface controller messenger can listen to.
 * Currently includes notification list update events.
 */
type Events = NotificationListUpdatedEvent;

/**
 * Type representing the restricted messenger for the Snap interface controller.
 * This messenger is scoped to specific actions and events that the controller
 * is allowed to handle, providing type safety and access control.
 */
export type SnapInterfaceControllerMessenger = ReturnType<
  typeof getSnapInterfaceControllerMessenger
>;

/**
 * Get a restricted messenger for the Snap interface controller. This is scoped
 * to the actions and events that the Snap interface controller is allowed to
 * handle.
 *
 * @param messenger - The messenger to restrict.
 * @returns The restricted messenger.
 */
export function getSnapInterfaceControllerMessenger(
  messenger: Messenger<Actions, Events>,
) {
  return messenger.getRestricted({
    name: 'SnapInterfaceController',
    allowedActions: [
      `PhishingController:maybeUpdateState`,
      `PhishingController:testOrigin`,
      `ApprovalController:hasRequest`,
      `ApprovalController:acceptRequest`,
      `SnapController:get`,
      'MultichainAssetsController:getState',
      `AccountsController:getSelectedMultichainAccount`,
      `AccountsController:getAccountByAddress`,
      `AccountsController:listMultichainAccounts`,
    ],
    allowedEvents: ['NotificationServicesController:notificationsListUpdated'],
  });
}

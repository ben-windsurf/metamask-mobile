import { Messenger } from '@metamask/base-controller';
import type { AccountsControllerGetStateAction } from '@metamask/accounts-controller';
import type { AddApprovalRequest } from '@metamask/approval-controller';
import type { AddLog } from '@metamask/logging-controller';
import {
  KeyringControllerSignMessageAction,
  KeyringControllerSignPersonalMessageAction,
  KeyringControllerSignTypedMessageAction,
} from '@metamask/keyring-controller';
import { NetworkControllerGetNetworkClientByIdAction } from '@metamask/network-controller';

import type { SignatureControllerMessenger } from '@metamask/signature-controller';

/**
 * Union type defining all allowed messenger actions for the signature controller.
 * Includes actions for account state, approval requests, logging, network client access,
 * and various keyring signing operations.
 */
type MessengerActions =
  | AccountsControllerGetStateAction
  | AddApprovalRequest
  | AddLog
  | NetworkControllerGetNetworkClientByIdAction
  | KeyringControllerSignMessageAction
  | KeyringControllerSignPersonalMessageAction
  | KeyringControllerSignTypedMessageAction;

/**
 * Union type defining all allowed messenger events for the signature controller.
 * Currently no events are allowed.
 */
type MessengerEvents = never;

/**
 * Creates a restricted messenger instance for the SignatureController.
 * The messenger provides controlled access to specific controller actions
 * needed for signature operations while maintaining security boundaries.
 *
 * @param messenger - The base messenger instance with full access to actions and events
 * @returns A restricted messenger configured specifically for signature controller operations
 */
export function getSignatureControllerMessenger(
  messenger: Messenger<MessengerActions, MessengerEvents>,
): SignatureControllerMessenger {
  return messenger.getRestricted({
    name: 'SignatureController',
    allowedActions: [
      'AccountsController:getState',
      'ApprovalController:addRequest',
      'LoggingController:add',
      'NetworkController:getNetworkClientById',
      'KeyringController:signMessage',
      'KeyringController:signPersonalMessage',
      'KeyringController:signTypedMessage',
    ],
    allowedEvents: [],
  });
}

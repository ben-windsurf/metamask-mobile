import { Messenger, RestrictedMessenger } from '@metamask/base-controller';

/** Name identifier for the ApprovalController messenger */
const name = 'ApprovalController';

/** Actions that can be performed by the ApprovalController messenger */
type MessengerActions = never;

/** Events that can be emitted by the ApprovalController messenger */
type MessengerEvents = never;

/**
 * Restricted messenger type for the ApprovalController.
 * Provides type-safe communication interface for approval-related operations.
 */
export type ApprovalControllerMessenger = RestrictedMessenger<
  typeof name,
  MessengerActions,
  MessengerEvents,
  MessengerActions['type'],
  MessengerEvents['type']
>;

/**
 * Creates a restricted messenger instance for the ApprovalController.
 *
 * @param messenger - The base messenger instance to restrict
 * @returns A restricted messenger configured for ApprovalController operations
 */
export function getApprovalControllerMessenger(
  messenger: Messenger<MessengerActions, MessengerEvents>,
): ApprovalControllerMessenger {
  return messenger.getRestricted({
    name,
    allowedActions: [],
    allowedEvents: [],
  });
}

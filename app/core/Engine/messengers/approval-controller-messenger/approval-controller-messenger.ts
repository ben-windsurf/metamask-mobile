import { Messenger, RestrictedMessenger } from '@metamask/base-controller';

const name = 'ApprovalController';

type MessengerActions = never;

type MessengerEvents = never;

export type ApprovalControllerMessenger = RestrictedMessenger<
  typeof name,
  MessengerActions,
  MessengerEvents,
  MessengerActions['type'],
  MessengerEvents['type']
>;

/**
 * Creates a restricted messenger for the ApprovalController
 * This messenger provides controlled access to the main messenger system for approval-related operations
 * @param messenger - The main messenger instance to create a restricted version from
 * @returns A restricted messenger configured specifically for the ApprovalController
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

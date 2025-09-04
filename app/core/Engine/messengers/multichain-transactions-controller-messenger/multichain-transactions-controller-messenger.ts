import { BaseControllerMessenger } from '../../types';

/**
 * Type definition for the MultichainTransactionsController messenger.
 * This messenger provides restricted access to specific controller events and actions
 * needed for multichain transaction management.
 */
export type MultichainTransactionsControllerMessenger = ReturnType<
  typeof getMultichainTransactionsControllerMessenger
>;

/**
 * Get the MultichainTransactionsControllerMessenger for the MultichainTransactionsController.
 *
 * @param baseControllerMessenger - The base controller messenger.
 * @returns The MultichainTransactionsControllerMessenger.
 */
export function getMultichainTransactionsControllerMessenger(
  baseControllerMessenger: BaseControllerMessenger,
) {
  return baseControllerMessenger.getRestricted({
    name: 'MultichainTransactionsController',
    allowedEvents: [
      'AccountsController:accountAdded',
      'AccountsController:accountRemoved',
      'AccountsController:accountTransactionsUpdated',
    ],
    allowedActions: [
      'AccountsController:listMultichainAccounts',
      'SnapController:handleRequest',
      'KeyringController:getState',
    ],
  });
}

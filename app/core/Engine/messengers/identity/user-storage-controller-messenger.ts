import type { UserStorageControllerMessenger } from '@metamask/profile-sync-controller/user-storage';
import { BaseControllerMessenger } from '../../types';

/**
 * Creates a restricted messenger for the UserStorageController with specific allowed actions and events.
 * This messenger enables the UserStorageController to communicate with other controllers in the system
 * while maintaining proper access control and type safety.
 *
 * @param baseControllerMessenger - The base controller messenger to create restrictions from
 * @returns A restricted messenger configured for UserStorageController operations
 */
export function getUserStorageControllerMessenger(
  baseControllerMessenger: BaseControllerMessenger,
): UserStorageControllerMessenger {
  return baseControllerMessenger.getRestricted({
    name: 'UserStorageController',
    allowedActions: [
      // Keyring Controller Requests
      'KeyringController:getState',
      'KeyringController:withKeyring',
      // Snap Controller Requests
      'SnapController:handleRequest',
      // Auth Controller Requests
      'AuthenticationController:getBearerToken',
      'AuthenticationController:getSessionProfile',
      'AuthenticationController:isSignedIn',
      'AuthenticationController:performSignIn',
      // Accounts Controller Requests
      'AccountsController:listAccounts',
      'AccountsController:updateAccountMetadata',
      'AccountsController:updateAccounts',
      // Address Book Controller Requests
      'AddressBookController:list',
      'AddressBookController:set',
      'AddressBookController:delete',
    ],
    allowedEvents: [
      // Keyring Controller Events
      'KeyringController:lock',
      'KeyringController:unlock',
      // Accounts Controller Events
      'AccountsController:accountAdded',
      'AccountsController:accountRenamed',
      // Address Book Controller Events
      'AddressBookController:contactUpdated',
      'AddressBookController:contactDeleted',
    ],
  });
}

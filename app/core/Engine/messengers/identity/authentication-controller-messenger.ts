import type { AuthenticationControllerMessenger } from '@metamask/profile-sync-controller/auth';
import { BaseControllerMessenger } from '../../types';

/**
 * Creates a restricted messenger for the AuthenticationController.
 * This messenger provides access to specific keyring and snap controller actions and events
 * needed for authentication operations.
 *
 * @param baseControllerMessenger - The base controller messenger to create restrictions from
 * @returns A restricted messenger configured for AuthenticationController operations
 */
export function getAuthenticationControllerMessenger(
  baseControllerMessenger: BaseControllerMessenger,
): AuthenticationControllerMessenger {
  return baseControllerMessenger.getRestricted({
    name: 'AuthenticationController',
    allowedActions: [
      // Keyring Controller Requests
      'KeyringController:getState',
      // Snap Controller Requests
      'SnapController:handleRequest',
    ],
    allowedEvents: [
      // Keyring Controller Events
      'KeyringController:lock',
      'KeyringController:unlock',
    ],
  });
}

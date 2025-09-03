import type { AuthenticationControllerMessenger } from '@metamask/profile-sync-controller/auth';
import { BaseControllerMessenger } from '../../types';

/**
 * Creates a restricted messenger for the AuthenticationController with specific permissions
 * for keyring and snap controller interactions. This messenger enables secure communication
 * between the authentication system and other MetaMask controllers.
 * @param {BaseControllerMessenger} baseControllerMessenger - The base controller messenger to restrict
 * @returns {AuthenticationControllerMessenger} A restricted messenger with authentication-specific permissions
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

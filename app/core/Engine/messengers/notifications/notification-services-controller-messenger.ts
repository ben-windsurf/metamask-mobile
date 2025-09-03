import type { NotificationServicesControllerMessenger } from '@metamask/notification-services-controller/notification-services';
import { BaseControllerMessenger } from '../../types';

/**
 * Creates a restricted messenger for the NotificationServicesController
 * Configures allowed actions and events for notification services functionality
 * including keyring operations, authentication, and push notifications
 * @param baseControllerMessenger - The base controller messenger to restrict
 * @returns A restricted messenger configured for notification services
 */
export function getNotificationServicesControllerMessenger(
  baseControllerMessenger: BaseControllerMessenger,
): NotificationServicesControllerMessenger {
  return baseControllerMessenger.getRestricted({
    name: 'NotificationServicesController',
    allowedActions: [
      // Keyring Actions
      'KeyringController:getState',
      // Auth Actions
      'AuthenticationController:getBearerToken',
      'AuthenticationController:isSignedIn',
      'AuthenticationController:performSignIn',
      // Push Actions
      'NotificationServicesPushController:enablePushNotifications',
      'NotificationServicesPushController:disablePushNotifications',
      'NotificationServicesPushController:subscribeToPushNotifications',
    ],
    allowedEvents: [
      // Keyring Events
      'KeyringController:stateChange',
      'KeyringController:lock',
      'KeyringController:unlock',
      // Push Notification Events
      'NotificationServicesPushController:onNewNotifications',
      'NotificationServicesPushController:stateChange',
    ],
  });
}

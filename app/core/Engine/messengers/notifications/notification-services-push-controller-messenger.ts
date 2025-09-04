import type { NotificationServicesPushControllerMessenger } from '@metamask/notification-services-controller/push-services';
import { BaseControllerMessenger } from '../../types';

/**
 * Creates a restricted messenger for the NotificationServicesPushController.
 * This messenger provides controlled access to authentication actions needed
 * for push notification services.
 *
 * @param baseControllerMessenger - The base controller messenger to restrict
 * @returns A restricted messenger configured for push notification services
 */
export function getNotificationServicesPushControllerMessenger(
  baseControllerMessenger: BaseControllerMessenger,
): NotificationServicesPushControllerMessenger {
  return baseControllerMessenger.getRestricted({
    name: 'NotificationServicesPushController',
    allowedActions: ['AuthenticationController:getBearerToken'],
    allowedEvents: [],
  });
}

import type { NotificationServicesPushControllerMessenger } from '@metamask/notification-services-controller/push-services';
import { BaseControllerMessenger } from '../../types';

/**
 * Creates a restricted messenger for the NotificationServicesPushController
 * This messenger provides controlled access to authentication services for push notifications
 * @param baseControllerMessenger - The base controller messenger to restrict
 * @returns A restricted messenger with access to authentication bearer token
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

import FCMService from '../../../../util/notifications/services/FCMService';
import NotificationsService from '../../../../util/notifications/services/NotificationService';
import { PressActionId } from '../../../../util/notifications';
import { createNotificationMessage } from './create-push-message';

/**
 * Creates a registration token for push notifications.
 * Delegates to FCMService.createRegToken.
 */
export const createRegToken = FCMService.createRegToken;

/**
 * Deletes a registration token for push notifications.
 * Delegates to FCMService.deleteRegToken.
 */
export const deleteRegToken = FCMService.deleteRegToken;

/**
 * Creates a function that subscribes to push notifications and handles incoming notifications.
 * When a notification is received, it creates a notification message and displays it using the NotificationService.
 *
 * @returns A function that sets up push notification listening
 */
export const createSubscribeToPushNotifications = () => async () =>
  FCMService.listenToPushNotificationsReceived(async (notification) => {
    const notificationMessage = createNotificationMessage(notification);
    if (!notificationMessage) {
      return;
    }

    await NotificationsService.displayNotification({
      id: notification.id,
      pressActionId: PressActionId.OPEN_NOTIFICATIONS_VIEW,
      title: notificationMessage.title,
      body: notificationMessage.description,
      data: notification,
    });
  });

/**
 * Checks if push notifications are enabled.
 * Delegates to FCMService.isPushNotificationsEnabled.
 *
 * @returns True if push notifications are enabled, false otherwise
 */
export const isPushNotificationsEnabled = FCMService.isPushNotificationsEnabled;

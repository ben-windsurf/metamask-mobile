import FCMService from '../../../../util/notifications/services/FCMService';
import NotificationsService from '../../../../util/notifications/services/NotificationService';
import { PressActionId } from '../../../../util/notifications';
import { createNotificationMessage } from './create-push-message';

/**
 * Creates a registration token for push notifications
 * Delegates to FCMService for Firebase Cloud Messaging token creation
 */
export const createRegToken = FCMService.createRegToken;

/**
 * Deletes the registration token for push notifications
 * Delegates to FCMService for Firebase Cloud Messaging token deletion
 */
export const deleteRegToken = FCMService.deleteRegToken;

/**
 * Creates a subscription handler for push notifications
 * Sets up listener for incoming push notifications and displays them in the app
 * @returns {Function} Async function that subscribes to push notifications
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
 * Checks if push notifications are currently enabled
 * Delegates to FCMService for Firebase Cloud Messaging status check
 */
export const isPushNotificationsEnabled = FCMService.isPushNotificationsEnabled;

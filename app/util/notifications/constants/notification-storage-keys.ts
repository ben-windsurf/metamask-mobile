import {
  HAS_USER_TURNED_OFF_ONCE_NOTIFICATIONS,
  RESUBSCRIBE_NOTIFICATIONS_EXPIRY,
} from '../../../constants/storage';
import storageWrapper from '../../../store/storage-wrapper';

/**
 * Used to track when/how often we should re-subscribe users to notifications.
 * It ensures that users notification subscriptions are kept up to date (in case our backend adds new support for certian notifications)
 * And ensures that any push notification subscriptions are up-to-date
 */
const EXPIRY_DURATION_MS = 24 * 60 * 60 * 1000; // 1 day
/**
 * Checks if the notification subscription has expired and needs renewal
 * @returns {Promise<boolean>} True if subscription has expired or no expiry timestamp exists
 */
export const hasNotificationSubscriptionExpired = async () => {
  const expiryTimestamp: string | undefined = await storageWrapper.getItem(
    RESUBSCRIBE_NOTIFICATIONS_EXPIRY,
  );
  if (!expiryTimestamp) {
    return true;
  }
  const now = Date.now();
  return now > parseInt(expiryTimestamp, 10);
};
/**
 * Updates the notification subscription expiration timestamp to extend the subscription
 * Sets expiration to 24 hours from the current time
 * @returns {Promise<void>}
 */
export const updateNotificationSubscriptionExpiration = async () => {
  const now = Date.now();
  const expiryTimestamp = now + EXPIRY_DURATION_MS;
  await storageWrapper.setItem(
    RESUBSCRIBE_NOTIFICATIONS_EXPIRY,
    expiryTimestamp.toString(),
  );
};

/**
 * Tracks if a user has turned off notifications before
 * It ensures that we don't accidentally turn on notifications during our auto-enable notification effects (enable notifications by default)
 */
/**
 * Checks if the user has previously turned off notifications
 * Used to prevent auto-enabling notifications for users who have explicitly disabled them
 * @returns {Promise<boolean>} True if user has turned off notifications before
 */
export const hasUserTurnedOffNotificationsOnce = async () => {
  const hasTurnedOffOnce: string | null = await storageWrapper.getItem(
    HAS_USER_TURNED_OFF_ONCE_NOTIFICATIONS,
  );
  return hasTurnedOffOnce === 'true';
};

/**
 * Records that the user has turned off notifications at least once
 * This flag prevents auto-enabling notifications in the future
 * @returns {Promise<void>}
 */
export const setUserHasTurnedOffNotificationsOnce = async () => {
  await storageWrapper.setItem(HAS_USER_TURNED_OFF_ONCE_NOTIFICATIONS, 'true');
};

/**
 * This file contains all the actions related to the in app (old/v1) notification system.
 */
import { ACTIONS } from '../../reducers/notification';

/**
 * Hides the currently displayed notification
 * @returns {Object} Redux action object to hide current notification
 */
export function hideCurrentNotification() {
  return {
    type: ACTIONS.HIDE_CURRENT_NOTIFICATION,
  };
}

/**
 * Hides a specific notification by its ID
 * @param {string} id - The unique identifier of the notification to hide
 * @returns {Object} Redux action object to hide notification by ID
 */
export function hideNotificationById(id) {
  return {
    type: ACTIONS.HIDE_NOTIFICATION_BY_ID,
    id,
  };
}

/**
 * Modifies an existing transaction notification or shows a new one
 * @param {Object} params - Notification parameters
 * @param {number} params.autodismiss - Time in milliseconds before auto-dismissing
 * @param {Object} params.transaction - Transaction object to display
 * @param {string} params.status - Status of the transaction notification
 * @returns {Object} Redux action object to modify or show transaction notification
 */
export function modifyOrShowTransactionNotificationById({
  autodismiss,
  transaction,
  status,
}) {
  return {
    type: ACTIONS.MODIFY_OR_SHOW_TRANSACTION_NOTIFICATION,
    autodismiss,
    transaction,
    status,
  };
}

/**
 * Modifies an existing simple notification or shows a new one
 * @param {Object} params - Notification parameters
 * @param {number} params.autodismiss - Time in milliseconds before auto-dismissing
 * @param {string} params.title - Title of the notification
 * @param {string} params.description - Description text of the notification
 * @param {string} params.status - Status of the notification
 * @returns {Object} Redux action object to modify or show simple notification
 */
export function modifyOrShowSimpleNotificationById({
  autodismiss,
  title,
  description,
  status,
}) {
  return {
    type: ACTIONS.MODIFY_OR_SHOW_SIMPLE_NOTIFICATION,
    autodismiss,
    title,
    description,
    status,
  };
}

/**
 * Replaces an existing notification with a new notification object
 * @param {Object} notification - The new notification object to replace the existing one
 * @returns {Object} Redux action object to replace notification by ID
 */
export function replaceNotificationById(notification) {
  return {
    type: ACTIONS.REPLACE_NOTIFICATION_BY_ID,
    notification,
    id: notification.id,
  };
}

/**
 * Removes a specific notification by its ID
 * @param {string} id - The unique identifier of the notification to remove
 * @returns {Object} Redux action object to remove notification by ID
 */
export function removeNotificationById(id) {
  return {
    type: ACTIONS.REMOVE_NOTIFICATION_BY_ID,
    id,
  };
}

export function removeCurrentNotification() {
  return {
    type: ACTIONS.REMOVE_CURRENT_NOTIFICATION,
  };
}

export function showSimpleNotification({
  autodismiss,
  title,
  description,
  status,
  id,
}) {
  return {
    id,
    type: ACTIONS.SHOW_SIMPLE_NOTIFICATION,
    autodismiss,
    title,
    description,
    status,
  };
}

export function showTransactionNotification({
  autodismiss,
  transaction,
  status,
}) {
  return {
    type: ACTIONS.SHOW_TRANSACTION_NOTIFICATION,
    autodismiss,
    transaction,
    status,
  };
}

export function removeNotVisibleNotifications() {
  return {
    type: ACTIONS.REMOVE_NOT_VISIBLE_NOTIFICATIONS,
  };
}

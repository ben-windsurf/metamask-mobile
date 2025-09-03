export type { INotification } from '@metamask/notification-services-controller/notification-services';

/**
 * Enum defining press action identifiers for notification interactions
 * Used to handle different user actions when notifications are pressed
 */
export enum PressActionId {
  OPEN_HOME = 'open-home-press-action-id',
  OPEN_NOTIFICATIONS_VIEW = 'open-notifications-view-press-action-id',
}

/**
 * Android activity class name for launching the main MetaMask activity
 */
export const LAUNCH_ACTIVITY = 'com.metamask.ui.MainActivity';

/**
 * Available notification types for the MetaMask mobile application
 */
export const NotificationTypes = {
  TRANSACTION: 'transaction',
  SIMPLE: 'simple',
} as const;

/**
 * Type representing the possible notification type values
 * Derived from the NotificationTypes constant object
 */
export type NotificationTypesType =
  (typeof NotificationTypes)[keyof typeof NotificationTypes];

/**
 * Transaction-specific notification types for different transaction states and operations
 */
export const NotificationTransactionTypes = {
  pending: 'pending',
  pending_deposit: 'pending_deposit',
  pending_withdrawal: 'pending_withdrawal',
  success: 'success',
  speedup: 'speedup',
  success_withdrawal: 'success_withdrawal',
  success_deposit: 'success_deposit',
  error: 'error',
  cancelled: 'cancelled',
  received: 'received',
  received_payment: 'received_payment',
} as const;

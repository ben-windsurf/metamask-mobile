export type { INotification } from '@metamask/notification-services-controller/notification-services';

/**
 * Enum defining press action identifiers for notification interactions.
 * Used to identify which action was triggered when a user interacts with a notification.
 */
export enum PressActionId {
  /** Action ID for opening the home screen */
  OPEN_HOME = 'open-home-press-action-id',
  /** Action ID for opening the notifications view */
  OPEN_NOTIFICATIONS_VIEW = 'open-notifications-view-press-action-id',
}

/**
 * Android activity class name for launching the main MetaMask activity.
 * Used for deep linking and notification actions on Android platform.
 */
export const LAUNCH_ACTIVITY = 'com.metamask.ui.MainActivity';

/**
 * Constant object defining the available notification types.
 * Used to categorize different kinds of notifications in the app.
 */
export const NotificationTypes = {
  /** Transaction-related notifications */
  TRANSACTION: 'transaction',
  /** Simple text notifications */
  SIMPLE: 'simple',
} as const;

/**
 * Type representing the possible notification type values.
 * Derived from the NotificationTypes constant object.
 */
export type NotificationTypesType =
  (typeof NotificationTypes)[keyof typeof NotificationTypes];

/**
 * Constant object defining the available transaction notification subtypes.
 * Used to specify the specific state or type of transaction being notified about.
 */
export const NotificationTransactionTypes = {
  /** Transaction is pending confirmation */
  pending: 'pending',
  /** Deposit transaction is pending */
  pending_deposit: 'pending_deposit',
  /** Withdrawal transaction is pending */
  pending_withdrawal: 'pending_withdrawal',
  /** Transaction completed successfully */
  success: 'success',
  /** Transaction was sped up with higher gas */
  speedup: 'speedup',
  /** Withdrawal transaction completed successfully */
  success_withdrawal: 'success_withdrawal',
  /** Deposit transaction completed successfully */
  success_deposit: 'success_deposit',
  /** Transaction failed with an error */
  error: 'error',
  /** Transaction was cancelled */
  cancelled: 'cancelled',
  /** Received a transaction */
  received: 'received',
  /** Received a payment transaction */
  received_payment: 'received_payment',
} as const;

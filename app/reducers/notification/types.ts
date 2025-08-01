export interface TransactionNotification {
  id: string;
  isVisible: boolean;
  autodismiss?: number;
  transaction?: { id: string; [key: string]: unknown };
  status: string;
  type: 'transaction';
}

export interface SimpleNotification {
  id: string;
  isVisible: boolean;
  autodismiss?: number;
  title: string;
  description: string;
  status: string;
  type: 'simple';
}

export type Notification = TransactionNotification | SimpleNotification;

export interface NotificationState {
  notifications: Notification[];
}

export enum NotificationActionType {
  HIDE_CURRENT_NOTIFICATION = 'HIDE_CURRENT_NOTIFICATION',
  HIDE_NOTIFICATION_BY_ID = 'HIDE_NOTIFICATION_BY_ID',
  MODIFY_OR_SHOW_TRANSACTION_NOTIFICATION = 'MODIFY_OR_SHOW_TRANSACTION_NOTIFICATION',
  MODIFY_OR_SHOW_SIMPLE_NOTIFICATION = 'MODIFY_OR_SHOW_SIMPLE_NOTIFICATION',
  REPLACE_NOTIFICATION_BY_ID = 'REPLACE_NOTIFICATION_BY_ID',
  REMOVE_NOTIFICATION_BY_ID = 'REMOVE_NOTIFICATION_BY_ID',
  REMOVE_CURRENT_NOTIFICATION = 'REMOVE_CURRENT_NOTIFICATION',
  REMOVE_NOT_VISIBLE_NOTIFICATIONS = 'REMOVE_NOT_VISIBLE_NOTIFICATIONS',
  SHOW_SIMPLE_NOTIFICATION = 'SHOW_SIMPLE_NOTIFICATION',
  SHOW_TRANSACTION_NOTIFICATION = 'SHOW_TRANSACTION_NOTIFICATION',
  UPDATE_NOTIFICATION_STATUS = 'UPDATE_NOTIFICATION_STATUS',
}

export interface NotificationAction {
  type: NotificationActionType;
  id?: string;
  transaction?: { id: string; [key: string]: unknown };
  autodismiss?: number;
  status?: string;
  title?: string;
  description?: string;
  notification?: Notification;
}

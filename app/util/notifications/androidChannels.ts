import { AndroidChannel, AndroidImportance } from '@notifee/react-native';

/**
 * Enum defining notification channel IDs for Android notifications.
 * These IDs are used to categorize and manage different types of notifications.
 */
export enum ChannelId {
  /** Default notification channel for general notifications */
  DEFAULT_NOTIFICATION_CHANNEL_ID = 'DEFAULT_NOTIFICATION_CHANNEL_ID',
  /** Channel for MetaMask announcements and important updates */
  ANNOUNCEMENT_NOTIFICATION_CHANNEL_ID = 'ANNOUNCEMENT_NOTIFICATION_CHANNEL_ID',
}

/**
 * Extended Android notification channel interface for MetaMask-specific channels.
 * Extends the base AndroidChannel with additional metadata properties.
 */
export interface MetaMaskAndroidChannel extends AndroidChannel {
  /** The unique channel identifier */
  id: ChannelId;
  /** Display title for the notification channel */
  title: string;
  /** Subtitle description for the notification channel */
  subtitle: string;
}

/**
 * Array of predefined notification channels for the MetaMask Android app.
 * Each channel defines specific notification behavior and appearance settings.
 */
export const notificationChannels = [
  {
    id: ChannelId.DEFAULT_NOTIFICATION_CHANNEL_ID,
    name: 'Transaction Complete',
    lights: true,
    vibration: true,
    importance: AndroidImportance.HIGH,
    title: 'Transaction',
    subtitle: 'Transaction Complete',
  } as MetaMaskAndroidChannel,
  {
    id: ChannelId.ANNOUNCEMENT_NOTIFICATION_CHANNEL_ID,
    name: 'MetaMask Announcement',
    lights: true,
    vibration: true,
    importance: AndroidImportance.HIGH,
    title: 'Announcement',
    subtitle: 'MetaMask Announcement',
  } as MetaMaskAndroidChannel,
];

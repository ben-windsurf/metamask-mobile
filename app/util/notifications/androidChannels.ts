import { AndroidChannel, AndroidImportance } from '@notifee/react-native';

export enum ChannelId {
  DEFAULT_NOTIFICATION_CHANNEL_ID = 'DEFAULT_NOTIFICATION_CHANNEL_ID',
  ANNOUNCEMENT_NOTIFICATION_CHANNEL_ID = 'ANNOUNCEMENT_NOTIFICATION_CHANNEL_ID',
}

export interface MetaMaskAndroidChannel extends AndroidChannel {
  id: ChannelId;
  title: string;
  subtitle: string;
}

/**
 * Array of Android notification channels for MetaMask notifications
 * Defines channel configurations for different types of notifications with appropriate settings
 * @returns {MetaMaskAndroidChannel[]} Array of configured notification channels
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

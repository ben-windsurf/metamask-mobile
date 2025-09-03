import { strings } from '../../../../../locales/i18n';

/**
 * Mapping of notification setting titles to their corresponding selector IDs
 * Used for UI testing and component identification in the notifications settings view
 */
export const NotificationsViewSelectorsIDs = {
  [strings('app_settings.notifications_opts.assets_sent_title')]: 'AssetsSent',
  [strings('app_settings.notifications_opts.assets_received_title')]:
    'AssetsReceived',
  [strings('app_settings.notifications_opts.defi_title')]: 'Defi',
  [strings('app_settings.notifications_opts.snaps_title')]: 'Snaps',
  [strings('app_settings.notifications_opts.products_announcements_title')]:
    'ProductsAnnouncements',
};

/**
 * Enumeration of different notification types supported by MetaMask Mobile
 * Used to categorize and filter notifications in the settings and notification system
 */
export enum NotificationsKinds {
  SENT = 'sent',
  RECEIVED = 'received',
  STAKED = 'staked',
  SWAPED = 'swaped',
  DEFI = 'defi',
  SNAPS = 'snaps',
  BRIDGED = 'bridged',
  BOUGHT = 'bought',
  PRODUCTS_ANNOUNCEMENTS = 'product-announcements',
}

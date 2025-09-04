import enContent from '../../../locales/languages/en.json';

/**
 * Text selectors for the Notification Settings view in end-to-end tests.
 * Contains localized text content used to identify UI elements.
 */
export const NotificationSettingsViewSelectorsText = {
  ACCOUNT_ACTIVITY_SECTION:
    enContent.app_settings.notifications_opts.account_session_title,
};

/**
 * ID selectors for the Notification Settings view in end-to-end tests.
 * Contains test IDs used to identify and interact with UI elements.
 */
export const NotificationSettingsViewSelectorsIDs = {
  NOTIFICATIONS_TOGGLE: 'notification-settings-notifications-toggle',
  PUSH_NOTIFICATIONS_TOGGLE: 'notification-settings-push-notifications-toggle',
  FEATURE_ANNOUNCEMENTS_TOGGLE:
    'notification-settings-feature-announcements-toggle',
  ACCOUNT_NOTIFICATION_TOGGLE: (address: string) =>
    `notification-settings-account-notifications-${address}`,
};

import enContent from '../../../locales/languages/en.json';

/**
 * Text selectors for the Settings view in end-to-end tests.
 * Contains localized text content used to identify UI elements.
 */
export const SettingsViewSelectorsText = {
  ADVANCE_TITLE_TEXT: enContent.app_settings.advanced_title,
  CONTACT_SUPPORT_TITLE: enContent.app_settings.contact_support,
};

/**
 * ID selectors for the Settings view in end-to-end tests.
 * Contains testID values used to identify UI elements during automated testing.
 */
export const SettingsViewSelectorsIDs = {
  SETTINGS_SCROLL_ID: 'settings-scroll',
  GENERAL: 'general-settings',
  SECURITY: 'security-settings',
  ADVANCED: 'advanced-settings',
  CONTACTS: 'contacts-settings',
  NETWORKS: 'networks-settings',
  ON_RAMP: 'on-ramp-settings',
  EXPERIMENTAL: 'experimental-settings',
  ABOUT_METAMASK: 'about-metamask-settings',
  REQUEST: 'request-settings',
  CONTACT: 'contact-settings',
  LOCK: 'lock-settings',
  NOTIFICATIONS: 'notifications-settings',
  AES_CRYPTO_TEST_FORM: 'aes-crypto-settings',
  PERMISSIONS: 'permissions',
  BACKUP_AND_SYNC: 'backup-and-sync-settings',
};

/**
 * Storage identifiers for notification-related data in local storage.
 * Contains keys used to store and retrieve various notification settings,
 * tokens, and user preferences.
 */
export const STORAGE_IDS = {
  NOTIFICATIONS: 'notifications',
  GLOBAL_PUSH_NOTIFICATION_SETTINGS: 'globalNotificationSettings',
  MM_FCM_TOKEN: 'metaMaskFcmToken',
  PUSH_NOTIFICATIONS_PROMPT_COUNT: 'pushNotificationsPromptCount',
  PUSH_NOTIFICATIONS_PROMPT_TIME: 'pushNotificationsPromptTime',
  DEVICE_ID_STORAGE_KEY: 'pns:deviceId',
  DEFAULT_NOTIFICATION_CHANNEL_ID: 'DEFAULT_NOTIFICATION_CHANNEL_ID',
  ANNOUNCEMENT_NOTIFICATION_CHANNEL_ID: 'ANNOUNCEMENT_NOTIFICATION_CHANNEL_ID',
  DEFAULT_PUSH_NOTIFICATION_CHANNEL_PRIORITY: 'high',
  REQUEST_PERMISSION_ASKED: 'REQUEST_PERMISSION_ASKED',
  REQUEST_PERMISSION_GRANTED: 'REQUEST_PERMISSION_GRANTED',
  NOTIFICATION_DATE_FORMAT: 'DD/MM/YYYY HH:mm:ss',
  NOTIFICATIONS_SETTINGS: 'notifications-settings',
  PN_USER_STORAGE: 'pnUserStorage',
};

/**
 * Data types for storage values.
 * Defines the expected data types for values stored in local storage.
 */
export const STORAGE_TYPES = {
  STRING: 'string',
  BOOLEAN: 'boolean',
  NUMBER: 'number',
  OBJECT: 'object',
};

/**
 * Maps storage IDs to their corresponding data types.
 * Determines the expected data type for a given storage identifier.
 *
 * @param id - The storage identifier to map
 * @returns The corresponding storage type (string, boolean, number, or object)
 */
export const mapStorageTypeToIds = (id: string) => {
  switch (id) {
    case STORAGE_IDS.NOTIFICATIONS:
    case STORAGE_IDS.GLOBAL_PUSH_NOTIFICATION_SETTINGS:
    case STORAGE_IDS.MM_FCM_TOKEN:
    case STORAGE_IDS.NOTIFICATIONS_SETTINGS:
    case STORAGE_IDS.PN_USER_STORAGE:
      return STORAGE_TYPES.OBJECT;
    case STORAGE_IDS.PUSH_NOTIFICATIONS_PROMPT_COUNT:
      return STORAGE_TYPES.NUMBER;
    case STORAGE_IDS.REQUEST_PERMISSION_ASKED:
    case STORAGE_IDS.REQUEST_PERMISSION_GRANTED:
      return STORAGE_TYPES.BOOLEAN;
    default:
      return STORAGE_TYPES.STRING;
  }
};

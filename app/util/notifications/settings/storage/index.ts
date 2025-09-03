import { MMKV } from 'react-native-mmkv';
import { STORAGE_TYPES, STORAGE_IDS, mapStorageTypeToIds } from './constants';

/**
 * MMKV storage instance for notification-related data
 * Provides persistent storage for notification settings and state
 */
export const notificationStorage = new MMKV({
  id: STORAGE_IDS.NOTIFICATIONS,
});

/**
 * Storage utility class for managing local data with type-aware operations
 * Provides methods for storing, retrieving, and clearing data across different storage instances
 */
export class mmStorage {
  /**
   * Retrieves a value from local storage with automatic type detection
   * @param {string} key - The storage key to retrieve
   * @returns {string | number | boolean | object | undefined} The stored value with appropriate type
   */
  static getLocal(key: string) {
    if (!key) {
      return;
    }

    const keyType = mapStorageTypeToIds(key);

    switch (keyType) {
      case STORAGE_TYPES.STRING:
        return notificationStorage.getString(key);
      case STORAGE_TYPES.NUMBER:
        return notificationStorage.getNumber(key);
      case STORAGE_TYPES.BOOLEAN:
        return notificationStorage.getBoolean(key);
      case STORAGE_TYPES.OBJECT:
        return JSON.parse(notificationStorage.getString(key) || '{}');
      default:
        return notificationStorage.getString(key);
    }
  }

  /**
   * Saves a value to local storage with automatic type handling
   * @param {string} key - The storage key to save under
   * @param {any} value - The value to store (objects are JSON stringified)
   * @returns {void}
   */
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static saveLocal(key: string, value: any) {
    if (!key) {
      return;
    }
    const valueType = typeof value;

    if (valueType === 'object') {
      return notificationStorage.set(key, JSON.stringify(value));
    }

    return notificationStorage.set(key, value);
  }

  /**
   * Clears all data from all storage instances including default storage
   * @returns {void}
   */
  static clearAllStorages() {
    Object.keys(STORAGE_IDS).forEach((id) => {
      const storage = new MMKV({ id });
      storage.clearAll();
    });

    const defaultStorage = new MMKV();
    defaultStorage.clearAll();
  }
}

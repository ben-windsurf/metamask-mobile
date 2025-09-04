import { MMKV } from 'react-native-mmkv';
import { STORAGE_TYPES, STORAGE_IDS, mapStorageTypeToIds } from './constants';

/**
 * MMKV storage instance specifically configured for notifications data.
 * Uses a dedicated storage ID to isolate notification-related data.
 */
export const notificationStorage = new MMKV({
  id: STORAGE_IDS.NOTIFICATIONS,
});

/**
 * Utility class for managing local storage operations with type-aware serialization.
 * Provides methods to store, retrieve, and clear data with automatic type detection.
 */
export class mmStorage {
  /**
   * Retrieves a value from local storage with automatic type detection and deserialization.
   *
   * @param key - The storage key to retrieve the value for
   * @returns The stored value with appropriate type, or undefined if key is invalid or not found
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
   * Saves a value to local storage with automatic type detection and serialization.
   * Objects are JSON stringified, while primitives are stored directly.
   *
   * @param key - The storage key to save the value under
   * @param value - The value to store (objects will be JSON stringified)
   * @returns The result of the storage operation, or undefined if key is invalid
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
   * Clears all data from all configured storage instances.
   * This includes both named storage instances and the default storage.
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

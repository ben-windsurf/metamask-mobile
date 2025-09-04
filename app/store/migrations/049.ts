import AsyncStorage from '@react-native-async-storage/async-storage';
import { captureException } from '@sentry/react-native';
import { MMKV } from 'react-native-mmkv';

/**
 * MMKV storage instance for high-performance key-value storage.
 * Used as a replacement for AsyncStorage for better performance.
 */
export const storage = new MMKV();

/**
 * Migration function to transfer data from AsyncStorage to MMKV storage.
 * This migration improves storage performance by moving from AsyncStorage to MMKV.
 *
 * @param state - The current application state to migrate
 * @returns The unchanged state after migration completion
 */
export default async function migrate(state: unknown) {
  const keys = await AsyncStorage.getAllKeys();
  for (const key of keys) {
    try {
      const value = await AsyncStorage.getItem(key);

      if (value != null) {
        storage.set(key, value);
      }
      await AsyncStorage.removeItem(key);
    } catch (error) {
      captureException(
        new Error(
          `Failed to migrate key "${key}" from AsyncStorage to MMKV! Error: ${error}`,
        ),
      );
    }
  }

  return state;
}

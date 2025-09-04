import { EXISTING_USER } from '../../constants/storage';
import { ensureValidState, ValidState } from './util';
import { captureException } from '@sentry/react-native';
import StorageWrapper from '../storage-wrapper';
import { cloneDeep } from 'lodash';
import { isObject } from '@metamask/utils';

// Import the user initial state
import { userInitialState } from '../../reducers/user';

/**
 * Extends ValidState to include the user state for migration 89.
 * Used to type the state object during the EXISTING_USER flag migration.
 */
interface ValidStateWithUser extends ValidState {
  /** User state containing existingUser flag and other user properties */
  user?: {
    /** Flag indicating if the user has previously used the app */
    existingUser?: boolean;
    /** Additional user state properties */
    [key: string]: unknown;
  };
}

/**
 * Migration 89: Move EXISTING_USER flag from MMKV to Redux state
 * This unifies user state management and fixes iCloud backup inconsistencies
 *
 * IMPORTANT: After iCloud restore, we should default to existingUser: false
 * because keychain credentials are not backed up, even if MMKV data is restored
 *
 * @param state - The current Redux state to migrate
 * @returns Promise resolving to the migrated state with EXISTING_USER flag moved to Redux
 */
const migration = async (state: unknown): Promise<unknown> => {
  if (!ensureValidState(state, 89)) {
    return state;
  }

  const newState = cloneDeep(state) as ValidStateWithUser;

  try {
    const existingUser = await StorageWrapper.getItem(EXISTING_USER);
    const existingUserValue = existingUser === 'true';

    if (!isObject(newState.user)) {
      const error = new Error(
        `Migration 89: User state is missing or invalid. Expected object, got: ${typeof newState.user}`,
      );
      captureException(error);

      newState.user = {
        ...userInitialState,
        existingUser: existingUserValue,
      };
    } else {
      newState.user.existingUser = existingUserValue;
    }

    if (existingUser !== null) {
      try {
        await StorageWrapper.removeItem(EXISTING_USER);
      } catch (removeError) {
        // If removeItem fails, capture the error but don't change the existingUser value
        // since we successfully retrieved it from MMKV
        captureException(removeError as Error);
      }
    }
  } catch (error) {
    captureException(error as Error);

    if (!isObject(newState.user)) {
      newState.user = {
        ...userInitialState,
        existingUser: false, // Default to false only if we can't read from MMKV
      };
    } else {
      newState.user.existingUser = false;
    }
  }

  return newState;
};

export default migration;

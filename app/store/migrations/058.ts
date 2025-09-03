import { captureException } from '@sentry/react-native';
import { isObject } from '@metamask/utils';
import { ensureValidState } from './util';

/**
 * Migration 58: Sets default search engine to Google in settings
 * This migration ensures that the settings object has a searchEngine property
 * set to 'Google' as the default value.
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state with searchEngine set to 'Google'
 */
export default function migrate(state: unknown) {
  if (!ensureValidState(state, 58)) {
    // Increment the migration number as appropriate
    return state;
  }

  if (!isObject(state.settings)) {
    captureException(
      new Error(
        `FATAL ERROR: Migration 58: Invalid Settings state error: '${typeof state.settings}'`,
      ),
    );
    return state;
  }

  state.settings.searchEngine = 'Google';

  // Return the modified state
  return state;
}

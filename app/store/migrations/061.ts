import { hasProperty } from '@metamask/utils';
import { ensureValidState } from './util';

/**
 * Migration 61: Removes deprecated featureFlags property from state
 * Cleans up the featureFlags property that is no longer used in the application
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state with featureFlags property removed
 */
export default function migrate(state: unknown) {
  if (!ensureValidState(state, 61)) {
    return state;
  }
  if (hasProperty(state, 'featureFlags')) {
    delete state.featureFlags;
  }
  return state;
}

import { captureException } from '@sentry/react-native';
import { isObject } from '@metamask/utils';
import { ensureValidState } from './util';

/**
 * Migration 53: Removes the deprecated providerConfig property from NetworkController state
 * This migration cleans up legacy network configuration data that is no longer used
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state with providerConfig removed from NetworkController
 */
export default function migrate(state: unknown) {
  if (!ensureValidState(state, 53)) {
    // Increment the migration number as appropriate
    return state;
  }

  const networkControllerState = state.engine.backgroundState.NetworkController;
  if (!isObject(networkControllerState)) {
    captureException(
      new Error(
        `FATAL ERROR: Migration 53: Invalid NetworkController state error: '${typeof networkControllerState}'`,
      ),
    );
    return state;
  }

  // Delete the providerConfig property if it exists
  if ('providerConfig' in networkControllerState) {
    delete networkControllerState.providerConfig;
  }

  // Return the modified state
  return state;
}

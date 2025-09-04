import { hasProperty, isObject } from '@metamask/utils';
import { ensureValidState } from './util';

/**
 * Migration 77: Remove `KeyringController.keyringsMetadata`
 */
/**
 * Removes the deprecated `keyringsMetadata` property from KeyringController state.
 * This migration cleans up legacy metadata that is no longer needed in the keyring system.
 *
 * @param state - The application state to migrate
 * @returns The migrated state with keyringsMetadata removed from KeyringController
 */
const migration = (state: unknown): unknown => {
  const migrationVersion = 77;

  // Ensure the state is valid for migration
  if (!ensureValidState(state, migrationVersion)) {
    return state;
  }

  if (
    hasProperty(state, 'engine') &&
    hasProperty(state.engine, 'backgroundState') &&
    hasProperty(state.engine.backgroundState, 'KeyringController') &&
    isObject(state.engine.backgroundState.KeyringController) &&
    hasProperty(
      state.engine.backgroundState.KeyringController,
      'keyringsMetadata',
    )
  ) {
    // Remove the keyringsMetadata property
    delete state.engine.backgroundState.KeyringController.keyringsMetadata;
  }

  return state;
};

/**
 * Migration function that removes deprecated KeyringController.keyringsMetadata property
 */
export default migration;

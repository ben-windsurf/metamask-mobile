import { hasProperty, isObject } from '@metamask/utils';
import { ensureValidState } from './util';
import { captureException } from '@sentry/react-native';

/**
 * Migration 86: Remove Automatic Security Checks state
 *
 * This migration removes the automatic security checks state from the security state.
 */
/**
 * Removes automatic security checks related properties from the security state.
 * This migration cleans up deprecated security check settings that are no longer used.
 *
 * @param state - The current application state to migrate
 * @returns The migrated state with automatic security checks properties removed
 */
const migration = (state: unknown): unknown => {
  const migrationVersion = 86;

  if (!ensureValidState(state, migrationVersion)) {
    return state;
  }

  try {
    if (!hasProperty(state, 'security') || !isObject(state.security)) {
      captureException(
        new Error(
          `Migration ${migrationVersion}: Invalid security state: '${JSON.stringify(
            state.security,
          )}'`,
        ),
      );
      return state;
    }

    if (hasProperty(state.security, 'automaticSecurityChecksEnabled')) {
      delete state.security.automaticSecurityChecksEnabled;
    }

    if (
      hasProperty(state.security, 'hasUserSelectedAutomaticSecurityCheckOption')
    ) {
      delete state.security.hasUserSelectedAutomaticSecurityCheckOption;
    }

    if (hasProperty(state.security, 'isAutomaticSecurityChecksModalOpen')) {
      delete state.security.isAutomaticSecurityChecksModalOpen;
    }

    return state;
  } catch (error) {
    captureException(
      new Error(
        `Migration ${migrationVersion}: cleaning security state failed with error: ${error}`,
      ),
    );
    return state;
  }
};

export default migration;

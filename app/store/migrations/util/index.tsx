import { captureException } from '@sentry/react-native';
import { isObject } from '@metamask/utils';

/**
 * Interface defining the expected structure of a valid migration state.
 * Used to validate state objects during migration processes.
 */
export interface ValidState {
  /** Engine state containing background state data */
  engine: {
    /** Background state with controller data */
    backgroundState: Record<string, unknown>;
  };
  /** Application settings configuration */
  settings: Record<string, unknown>;
  /** Security-related state and configuration */
  security: Record<string, unknown>;
}

/**
 * Validates that a state object has the required structure for migrations.
 * Performs type checking and logs errors to Sentry if validation fails.
 *
 * @param state - The state object to validate
 * @param migrationNumber - The migration number for error reporting
 * @returns True if state is valid and has required structure, false otherwise
 */
export function ensureValidState<T>(
  state: T,
  migrationNumber: number,
): state is T & ValidState {
  if (!isObject(state)) {
    captureException(
      new Error(
        `FATAL ERROR: Migration ${migrationNumber}: Invalid state error: '${typeof state}'`,
      ),
    );
    return false;
  }

  if (!isObject(state.engine)) {
    captureException(
      new Error(
        `FATAL ERROR: Migration ${migrationNumber}: Invalid engine state error: '${typeof state.engine}'`,
      ),
    );
    return false;
  }

  if (!isObject(state.engine.backgroundState)) {
    captureException(
      new Error(
        `FATAL ERROR: Migration ${migrationNumber}: Invalid engine backgroundState error: '${typeof state
          .engine.backgroundState}'`,
      ),
    );
    return false;
  }

  return true;
}

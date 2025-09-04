import { ValidationCheck, LOG_TAG } from './validateMigration.types';

/**
 * Verifies that the engine is initialized and has a valid background state.
 *
 * @param state - The application state to validate
 * @returns Array of error messages, empty if validation passes
 */
export const validateEngineInitialized: ValidationCheck = (state) => {
  const errors: string[] = [];
  if (!state?.engine?.backgroundState) {
    errors.push(`${LOG_TAG}: Engine backgroundState not found.`);
  }
  return errors;
};

import Logger from '../../util/Logger';
import { RootState } from '../../reducers';
import { ValidationCheck } from './validateMigration.types';

// checks
import { validateAccountsController } from './accountsController';
import { validateKeyringController } from './keyringController';
import { validateEngineInitialized } from './engineBackgroundState';

/**
 * Array of validation checks to run after migration.
 * Each check validates a specific part of the application state.
 */
const checks: ValidationCheck[] = [
  validateEngineInitialized,
  validateAccountsController,
  validateKeyringController,
];

/**
 * Runs all validations and logs any errors, but doesn't throw.
 * This makes sure your app keeps running even if some data is unexpected.
 *
 * @param state - The root Redux state to validate after migration
 */
export function validatePostMigrationState(state: RootState): void {
  Logger.log('Migration validation started');
  const allErrors = checks.flatMap((check) => check(state));

  // If there are any errors, log them
  if (allErrors.length > 0) {
    Logger.error(new Error('Migration validation errors'), {
      message: `State validation found these issues: ${allErrors.join(', ')}`,
    });
  }
}

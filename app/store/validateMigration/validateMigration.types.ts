import { RootState } from '../../reducers';

/**
 * Each validation check is a function that:
 * - Takes the final (post-migration) Redux state,
 * - Returns an array of error strings if any validations fail or an empty array otherwise.
 */
export type ValidationCheck = (state: RootState) => string[];

/**
 * Log tag used for migration validation state errors.
 * Used to identify and filter migration-related validation errors in logs.
 */
export const LOG_TAG = 'MIGRATION_VALIDATE_STATE_ERROR';

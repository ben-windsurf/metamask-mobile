import { strings } from '../../locales/i18n';

/**
 * Array of localized strings for the password creation steps during onboarding.
 * Used to display step-by-step instructions for creating a secure password.
 */
export const CHOOSE_PASSWORD_STEPS = [
  strings('choose_password.title'),
  strings('choose_password.secure'),
  strings('choose_password.confirm'),
];

/**
 * Array of localized strings for the manual backup steps during onboarding.
 * Used to guide users through the process of manually backing up their Secret Recovery Phrase.
 */
export const MANUAL_BACKUP_STEPS = [
  strings('manual_backup.progressOne'),
  strings('manual_backup.progressTwo'),
  strings('manual_backup.progressThree'),
];

/** Error message displayed when password decryption fails during authentication. */
export const WRONG_PASSWORD_ERROR = 'Error: Decrypt failed';

/** Constant identifier for seed phrase field in forms and storage. */
export const SEED_PHRASE = 'seed_phrase';

/** Constant identifier for password confirmation field in forms. */
export const CONFIRM_PASSWORD = 'confirm_password';

/**
 * Enum defining different success flow types during the onboarding process.
 * Used to track and handle different completion paths based on user actions.
 */
export enum ONBOARDING_SUCCESS_FLOW {
  /** User successfully backed up their Secret Recovery Phrase */
  BACKED_UP_SRP = 'backedUpSRP',
  /** User completed onboarding without backing up their Secret Recovery Phrase */
  NO_BACKED_UP_SRP = 'noBackedUpSRP',
  /** User imported wallet from an existing seed phrase */
  IMPORT_FROM_SEED_PHRASE = 'importFromSeedPhrase',
  /** User initiated backup from settings screen */
  SETTINGS_BACKUP = 'settingsBackup',
  /** User completed backup after reminder prompt */
  REMINDER_BACKUP = 'reminderBackup',
}

import { AppMetadataControllerState } from '@metamask/app-metadata-controller';

/**
 * Default state configuration for the AppMetadataController.
 * Provides initial values for app version tracking and migration state.
 */
export const defaultAppMetadataControllerState: AppMetadataControllerState = {
  currentAppVersion: '',
  previousAppVersion: '',
  previousMigrationVersion: 0,
  currentMigrationVersion: 0,
};

import { AppMetadataControllerState } from '@metamask/app-metadata-controller';

/**
 * Default state configuration for the App Metadata Controller
 * Tracks application version information and migration state for MetaMask Mobile
 * Used to initialize the controller and manage app version transitions
 * @type {AppMetadataControllerState}
 */
export const defaultAppMetadataControllerState: AppMetadataControllerState = {
  currentAppVersion: '',
  previousAppVersion: '',
  previousMigrationVersion: 0,
  currentMigrationVersion: 0,
};

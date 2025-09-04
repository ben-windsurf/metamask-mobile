import {
  AppMetadataController,
  type AppMetadataControllerMessenger,
} from '@metamask/app-metadata-controller';
import { getVersion } from 'react-native-device-info';
import { version as migrationVersion } from '../../../../store/migrations';
import type { ControllerInitRequest } from '../../types';
import { logAppMetadataControllerCreation } from './utils';

/**
 * Initializes the AppMetadataController with current app version and migration state.
 * This controller tracks app version changes and migration progress for the MetaMask mobile app.
 *
 * @param initRequest - The controller initialization request containing messenger and persisted state
 * @returns Object containing the initialized AppMetadataController instance
 */
export function appMetadataControllerInit(
  initRequest: ControllerInitRequest<AppMetadataControllerMessenger>,
) {
  const currentVersion = getVersion();
  const currentState = initRequest.persistedState?.AppMetadataController || {
    currentAppVersion: '',
    previousAppVersion: '',
    previousMigrationVersion: 0,
    currentMigrationVersion: 0,
  };

  const controller = new AppMetadataController({
    state: currentState,
    messenger: initRequest.controllerMessenger,
    currentAppVersion: currentVersion,
    currentMigrationVersion: migrationVersion,
  });

  logAppMetadataControllerCreation(controller.state);
  return { controller };
}

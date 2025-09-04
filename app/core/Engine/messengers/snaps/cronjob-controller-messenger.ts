import { Messenger } from '@metamask/base-controller';
import {
  SnapInstalled,
  SnapUpdated,
  SnapDisabled,
  SnapEnabled,
  SnapUninstalled,
  HandleSnapRequest,
} from '@metamask/snaps-controllers';
import { GetPermissions } from '@metamask/permission-controller';

/**
 * Union type of all actions that the cronjob controller messenger can handle.
 * Includes permission retrieval and snap request handling actions.
 */
type Actions = GetPermissions | HandleSnapRequest;

/**
 * Union type of all events that the cronjob controller messenger can listen to.
 * Includes snap lifecycle events like installation, updates, and state changes.
 */
type Events =
  | SnapInstalled
  | SnapUpdated
  | SnapUninstalled
  | SnapEnabled
  | SnapDisabled;

/**
 * Type representing a restricted messenger specifically configured for the cronjob controller.
 * This messenger is scoped to only the actions and events that the cronjob controller needs.
 */
export type CronjobControllerMessenger = ReturnType<
  typeof getCronjobControllerMessenger
>;

/**
 * Get a restricted messenger for the cronjob controller. This is scoped to the
 * actions and events that the cronjob controller is allowed to handle.
 *
 * @param messenger - The controller messenger to restrict.
 * @returns The restricted controller messenger.
 */
export function getCronjobControllerMessenger(
  messenger: Messenger<Actions, Events>,
) {
  return messenger.getRestricted({
    name: 'CronjobController',
    allowedEvents: [
      'SnapController:snapInstalled',
      'SnapController:snapUpdated',
      'SnapController:snapUninstalled',
      'SnapController:snapEnabled',
      'SnapController:snapDisabled',
    ],
    allowedActions: [
      `PermissionController:getPermissions`,
      'SnapController:handleRequest',
    ],
  });
}

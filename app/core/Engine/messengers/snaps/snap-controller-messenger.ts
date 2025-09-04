import { Messenger } from '@metamask/base-controller';
import {
  ExecuteSnapAction,
  TerminateSnapAction,
  TerminateAllSnapsAction,
  HandleRpcRequestAction,
  GetResult,
  GetMetadata,
  Update,
  ResolveVersion,
  CreateInterface,
  GetInterface,
  ErrorMessageEvent,
  OutboundRequest,
  OutboundResponse,
} from '@metamask/snaps-controllers';
import {
  GetEndowments,
  GetPermissions,
  HasPermission,
  HasPermissions,
  RequestPermissions,
  RevokeAllPermissions,
  RevokePermissions,
  RevokePermissionForAllSubjects,
  GetSubjects,
  GrantPermissions,
  GetSubjectMetadata,
  AddSubjectMetadata,
  UpdateCaveat,
} from '@metamask/permission-controller';
import {
  AddApprovalRequest,
  UpdateRequestState,
} from '@metamask/approval-controller';
import {
  KeyringControllerGetKeyringsByTypeAction,
  KeyringControllerLockEvent,
} from '@metamask/keyring-controller';
import { PreferencesControllerGetStateAction } from '@metamask/preferences-controller';
import { NetworkControllerGetNetworkClientByIdAction } from '@metamask/network-controller';
import { SelectedNetworkControllerGetNetworkClientIdForDomainAction } from '@metamask/selected-network-controller';

/**
 * Union type of all actions that the Snap controller messenger can handle.
 * Includes permission management, approval requests, snap execution, and network operations.
 */
type Actions =
  | GetEndowments
  | GetPermissions
  | HasPermission
  | HasPermissions
  | RequestPermissions
  | RevokeAllPermissions
  | RevokePermissions
  | RevokePermissionForAllSubjects
  | GetSubjects
  | AddApprovalRequest
  | UpdateRequestState
  | GrantPermissions
  | GetSubjectMetadata
  | UpdateCaveat
  | AddSubjectMetadata
  | ExecuteSnapAction
  | TerminateSnapAction
  | TerminateAllSnapsAction
  | HandleRpcRequestAction
  | GetResult
  | GetMetadata
  | Update
  | ResolveVersion
  | CreateInterface
  | GetInterface
  | NetworkControllerGetNetworkClientByIdAction
  | SelectedNetworkControllerGetNetworkClientIdForDomainAction;

/**
 * Union type of all events that the Snap controller messenger can handle.
 * Includes error messages, outbound requests/responses, and keyring lock events.
 */
type Events =
  | ErrorMessageEvent
  | OutboundRequest
  | OutboundResponse
  | KeyringControllerLockEvent;

/**
 * Type representing the restricted messenger for the Snap controller.
 * This messenger is scoped to specific actions and events that the Snap controller can handle.
 */
export type SnapControllerMessenger = ReturnType<
  typeof getSnapControllerMessenger
>;

/**
 * Get a restricted messenger for the Snap controller. This is scoped to the
 * actions and events that the Snap controller is allowed to handle.
 *
 * @param messenger - The messenger to restrict.
 * @returns The restricted messenger.
 */
export function getSnapControllerMessenger(
  messenger: Messenger<Actions, Events>,
) {
  return messenger.getRestricted({
    name: 'SnapController',
    allowedEvents: [
      'ExecutionService:unhandledError',
      'ExecutionService:outboundRequest',
      'ExecutionService:outboundResponse',
      'KeyringController:lock',
    ],
    allowedActions: [
      'PermissionController:getEndowments',
      'PermissionController:getPermissions',
      'PermissionController:hasPermission',
      'PermissionController:hasPermissions',
      'PermissionController:requestPermissions',
      'PermissionController:revokeAllPermissions',
      'PermissionController:revokePermissions',
      'PermissionController:revokePermissionForAllSubjects',
      'PermissionController:getSubjectNames',
      'PermissionController:updateCaveat',
      'ApprovalController:addRequest',
      'ApprovalController:updateRequestState',
      'PermissionController:grantPermissions',
      'SubjectMetadataController:getSubjectMetadata',
      'SubjectMetadataController:addSubjectMetadata',
      'ExecutionService:executeSnap',
      'ExecutionService:terminateSnap',
      'ExecutionService:terminateAllSnaps',
      'ExecutionService:handleRpcRequest',
      'SnapsRegistry:get',
      'SnapsRegistry:getMetadata',
      'SnapsRegistry:update',
      'SnapsRegistry:resolveVersion',
      `SnapInterfaceController:createInterface`,
      `SnapInterfaceController:getInterface`,
      'NetworkController:getNetworkClientById',
      'SelectedNetworkController:getNetworkClientIdForDomain',
    ],
  });
}

/**
 * Union type of actions available during Snap controller initialization.
 * Limited to keyring and preferences controller actions needed for setup.
 */
type InitActions =
  | KeyringControllerGetKeyringsByTypeAction
  | PreferencesControllerGetStateAction;

/**
 * Type representing the restricted messenger for Snap controller initialization.
 * This messenger has limited scope for initialization-specific operations.
 */
export type SnapControllerInitMessenger = ReturnType<
  typeof getSnapControllerInitMessenger
>;

/**
 * Get a restricted messenger for the Snap controller init. This is scoped to
 * the actions and events that the Snap controller init is allowed to handle.
 *
 * @param messenger - The messenger to restrict.
 * @returns The restricted messenger.
 */
export function getSnapControllerInitMessenger(
  messenger: Messenger<InitActions, never>,
) {
  return messenger.getRestricted({
    name: 'SnapControllerInit',
    allowedEvents: [],
    allowedActions: [
      'KeyringController:getKeyringsByType',
      'PreferencesController:getState',
    ],
  });
}

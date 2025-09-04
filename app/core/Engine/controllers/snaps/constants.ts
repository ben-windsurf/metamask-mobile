import {
  SnapStateChange as SnapControllerStateChangeEventType,
  HandleSnapRequest as SnapControllerHandleRequestActionType,
  ClearSnapState as SnapControllerClearSnapStateActionType,
  GetSnap as SnapControllerGetSnapActionType,
  GetSnapState as SnapControllerGetSnapStateActionType,
  UpdateSnapState as SnapControllerUpdateSnapStateActionType,
  GetPermittedSnaps as SnapControllerGetPermittedSnapsActionType,
  InstallSnaps as SnapControllerInstallSnapsActionType,
  GetSnapFile as SnapControllerGetSnapFileActionType,
  SnapInstalled as SnapControllerSnapInstalledEventType,
  SnapUpdated as SnapControllerSnapUpdatedEventType,
  SnapUninstalled as SnapControllerSnapUninstalledEventType,
  SnapEnabled as SnapControllerSnapEnabledEventType,
  SnapDisabled as SnapControllerSnapDisabledEventType,
  GetAllSnaps as SnapControllerGetAllSnapsActionType,
  IsMinimumPlatformVersion as SnapControllerIsMinimumPlatformVersionActionType,
  CreateInterface,
  UpdateInterface,
  ResolveInterface,
  UpdateInterfaceState,
  Cancel,
  Get,
  WebSocketServiceOpenAction as WebSocketServiceOpenActionType,
  WebSocketServiceCloseAction as WebSocketServiceCloseActionType,
  WebSocketServiceGetAllAction as WebSocketServiceGetAllActionType,
  WebSocketServiceSendMessageAction as WebSocketServiceSendMessageActionType,
} from '@metamask/snaps-controllers';

// SnapController Events

/** Event type constant for SnapController state changes */
export const SnapControllerStateChangeEvent: SnapControllerStateChangeEventType['type'] =
  'SnapController:stateChange';

/** Event type constant for when a Snap is installed */
export const SnapControllerSnapInstalledEvent: SnapControllerSnapInstalledEventType['type'] =
  'SnapController:snapInstalled';

/** Event type constant for when a Snap is updated */
export const SnapControllerSnapUpdatedEvent: SnapControllerSnapUpdatedEventType['type'] =
  'SnapController:snapUpdated';

/** Event type constant for when a Snap is uninstalled */
export const SnapControllerSnapUninstalledEvent: SnapControllerSnapUninstalledEventType['type'] =
  'SnapController:snapUninstalled';

/** Event type constant for when a Snap is enabled */
export const SnapControllerSnapEnabledEvent: SnapControllerSnapEnabledEventType['type'] =
  'SnapController:snapEnabled';

/** Event type constant for when a Snap is disabled */
export const SnapControllerSnapDisabledEvent: SnapControllerSnapDisabledEventType['type'] =
  'SnapController:snapDisabled';

// SnapController Actions
export const SnapControllerHandleRequestAction: SnapControllerHandleRequestActionType['type'] =
  'SnapController:handleRequest';

export const SnapControllerClearSnapStateAction: SnapControllerClearSnapStateActionType['type'] =
  'SnapController:clearSnapState';

export const SnapControllerGetSnapAction: SnapControllerGetSnapActionType['type'] =
  'SnapController:get';

export const SnapControllerGetSnapStateAction: SnapControllerGetSnapStateActionType['type'] =
  'SnapController:getSnapState';

export const SnapControllerUpdateSnapStateAction: SnapControllerUpdateSnapStateActionType['type'] =
  'SnapController:updateSnapState';

export const SnapControllerGetPermittedSnapsAction: SnapControllerGetPermittedSnapsActionType['type'] =
  'SnapController:getPermitted';

export const SnapControllerInstallSnapsAction: SnapControllerInstallSnapsActionType['type'] =
  'SnapController:install';

export const SnapControllerGetSnapFileAction: SnapControllerGetSnapFileActionType['type'] =
  'SnapController:getFile';

export const SnapControllerGetAllSnapsAction: SnapControllerGetAllSnapsActionType['type'] =
  'SnapController:getAll';

export const SnapControllerIsMinimumPlatformVersionAction: SnapControllerIsMinimumPlatformVersionActionType['type'] =
  'SnapController:isMinimumPlatformVersion';

// SnapInterfaceController Actions
export const SnapInterfaceControllerCreateInterfaceAction: CreateInterface['type'] =
  'SnapInterfaceController:createInterface';

export const SnapInterfaceControllerUpdateInterfaceAction: UpdateInterface['type'] =
  'SnapInterfaceController:updateInterface';

export const SnapInterfaceControllerResolveInterfaceAction: ResolveInterface['type'] =
  'SnapInterfaceController:resolveInterface';

export const SnapInterfaceControllerUpdateInterfaceStateAction: UpdateInterfaceState['type'] =
  'SnapInterfaceController:updateInterfaceState';

// CronjobController Actions
export const CronjobControllerCancelAction: Cancel['type'] =
  'CronjobController:cancel';

export const CronjobControllerGetAction: Get['type'] = 'CronjobController:get';

// WebSocketService Actions
export const WebSocketServiceOpenAction: WebSocketServiceOpenActionType['type'] =
  'WebSocketService:open';

export const WebSocketServiceCloseAction: WebSocketServiceCloseActionType['type'] =
  'WebSocketService:close';

export const WebSocketServiceGetAllAction: WebSocketServiceGetAllActionType['type'] =
  'WebSocketService:getAll';

export const WebSocketServiceSendMessageAction: WebSocketServiceSendMessageActionType['type'] =
  'WebSocketService:sendMessage';

export interface SettingsState {
  searchEngine: string;
  primaryCurrency: string;
  lockTime: number;
  useBlockieIcon: boolean;
  hideZeroBalanceTokens: boolean;
  basicFunctionalityEnabled: boolean;
  deepLinkModalDisabled: boolean;
  showHexData?: boolean;
  showCustomNonce?: boolean;
  showFiatOnTestnets?: boolean;
  deviceNotificationEnabled?: boolean;
}

export enum SettingsActionType {
  SET_SEARCH_ENGINE = 'SET_SEARCH_ENGINE',
  SET_LOCK_TIME = 'SET_LOCK_TIME',
  SET_SHOW_HEX_DATA = 'SET_SHOW_HEX_DATA',
  SET_SHOW_CUSTOM_NONCE = 'SET_SHOW_CUSTOM_NONCE',
  SET_HIDE_ZERO_BALANCE_TOKENS = 'SET_HIDE_ZERO_BALANCE_TOKENS',
  SET_USE_BLOCKIE_ICON = 'SET_USE_BLOCKIE_ICON',
  SET_PRIMARY_CURRENCY = 'SET_PRIMARY_CURRENCY',
  SET_SHOW_FIAT_ON_TESTNETS = 'SET_SHOW_FIAT_ON_TESTNETS',
  TOGGLE_BASIC_FUNCTIONALITY = 'TOGGLE_BASIC_FUNCTIONALITY',
  TOGGLE_DEVICE_NOTIFICATIONS = 'TOGGLE_DEVICE_NOTIFICATIONS',
  SET_DEEP_LINK_MODAL_DISABLED = 'SET_DEEP_LINK_MODAL_DISABLED',
}

export interface SetSearchEngineAction {
  type: SettingsActionType.SET_SEARCH_ENGINE;
  searchEngine: string;
}

export interface SetLockTimeAction {
  type: SettingsActionType.SET_LOCK_TIME;
  lockTime: number;
}

export interface SetShowHexDataAction {
  type: SettingsActionType.SET_SHOW_HEX_DATA;
  showHexData: boolean;
}

export interface SetShowCustomNonceAction {
  type: SettingsActionType.SET_SHOW_CUSTOM_NONCE;
  showCustomNonce: boolean;
}

export interface SetHideZeroBalanceTokensAction {
  type: SettingsActionType.SET_HIDE_ZERO_BALANCE_TOKENS;
  hideZeroBalanceTokens: boolean;
}

export interface SetUseBlockieIconAction {
  type: SettingsActionType.SET_USE_BLOCKIE_ICON;
  useBlockieIcon: boolean;
}

export interface SetPrimaryCurrencyAction {
  type: SettingsActionType.SET_PRIMARY_CURRENCY;
  primaryCurrency: string;
}

export interface SetShowFiatOnTestnetsAction {
  type: SettingsActionType.SET_SHOW_FIAT_ON_TESTNETS;
  showFiatOnTestnets: boolean;
}

export interface ToggleBasicFunctionalityAction {
  type: SettingsActionType.TOGGLE_BASIC_FUNCTIONALITY;
  basicFunctionalityEnabled: boolean;
}

export interface ToggleDeviceNotificationsAction {
  type: SettingsActionType.TOGGLE_DEVICE_NOTIFICATIONS;
  deviceNotificationEnabled: boolean;
}

export interface SetDeepLinkModalDisabledAction {
  type: SettingsActionType.SET_DEEP_LINK_MODAL_DISABLED;
  deepLinkModalDisabled: boolean;
}

export type SettingsAction =
  | SetSearchEngineAction
  | SetLockTimeAction
  | SetShowHexDataAction
  | SetShowCustomNonceAction
  | SetHideZeroBalanceTokensAction
  | SetUseBlockieIconAction
  | SetPrimaryCurrencyAction
  | SetShowFiatOnTestnetsAction
  | ToggleBasicFunctionalityAction
  | ToggleDeviceNotificationsAction
  | SetDeepLinkModalDisabledAction;

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

export interface SettingsAction {
  type: SettingsActionType;
  searchEngine?: string;
  lockTime?: number;
  showHexData?: boolean;
  showCustomNonce?: boolean;
  hideZeroBalanceTokens?: boolean;
  useBlockieIcon?: boolean;
  primaryCurrency?: string;
  showFiatOnTestnets?: boolean;
  basicFunctionalityEnabled?: boolean;
  deviceNotificationEnabled?: boolean;
  deepLinkModalDisabled?: boolean;
}

import type { Action } from 'redux';
import type { SearchEngine, PrimaryCurrency } from '../../reducers/settings/types';

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

export type SetSearchEngineAction = Action<SettingsActionType.SET_SEARCH_ENGINE> & {
  searchEngine: SearchEngine;
};

export type SetLockTimeAction = Action<SettingsActionType.SET_LOCK_TIME> & {
  lockTime: number;
};

export type SetShowHexDataAction = Action<SettingsActionType.SET_SHOW_HEX_DATA> & {
  showHexData: boolean;
};

export type SetShowCustomNonceAction = Action<SettingsActionType.SET_SHOW_CUSTOM_NONCE> & {
  showCustomNonce: boolean;
};

export type SetHideZeroBalanceTokensAction = Action<SettingsActionType.SET_HIDE_ZERO_BALANCE_TOKENS> & {
  hideZeroBalanceTokens: boolean;
};

export type SetUseBlockieIconAction = Action<SettingsActionType.SET_USE_BLOCKIE_ICON> & {
  useBlockieIcon: boolean;
};

export type SetPrimaryCurrencyAction = Action<SettingsActionType.SET_PRIMARY_CURRENCY> & {
  primaryCurrency: PrimaryCurrency;
};

export type SetShowFiatOnTestnetsAction = Action<SettingsActionType.SET_SHOW_FIAT_ON_TESTNETS> & {
  showFiatOnTestnets: boolean;
};

export type ToggleBasicFunctionalityAction = Action<SettingsActionType.TOGGLE_BASIC_FUNCTIONALITY> & {
  basicFunctionalityEnabled: boolean;
};

export type ToggleDeviceNotificationsAction = Action<SettingsActionType.TOGGLE_DEVICE_NOTIFICATIONS> & {
  deviceNotificationEnabled: boolean;
};

export type SetDeepLinkModalDisabledAction = Action<SettingsActionType.SET_DEEP_LINK_MODAL_DISABLED> & {
  deepLinkModalDisabled: boolean;
};

/**
 * Settings actions union type
 */
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

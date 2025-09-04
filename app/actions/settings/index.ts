export enum ActionType {
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
  SET_TOKEN_SORT_CONFIG = 'SET_TOKEN_SORT_CONFIG',
}

interface SetSearchEngineAction {
  type: ActionType.SET_SEARCH_ENGINE;
  searchEngine: string;
}

interface SetLockTimeAction {
  type: ActionType.SET_LOCK_TIME;
  lockTime: number;
}

interface SetShowHexDataAction {
  type: ActionType.SET_SHOW_HEX_DATA;
  showHexData: boolean;
}

interface SetShowCustomNonceAction {
  type: ActionType.SET_SHOW_CUSTOM_NONCE;
  showCustomNonce: boolean;
}

interface SetHideZeroBalanceTokensAction {
  type: ActionType.SET_HIDE_ZERO_BALANCE_TOKENS;
  hideZeroBalanceTokens: boolean;
}

interface SetUseBlockieIconAction {
  type: ActionType.SET_USE_BLOCKIE_ICON;
  useBlockieIcon: boolean;
}

interface SetPrimaryCurrencyAction {
  type: ActionType.SET_PRIMARY_CURRENCY;
  primaryCurrency: string;
}

interface SetShowFiatOnTestnetsAction {
  type: ActionType.SET_SHOW_FIAT_ON_TESTNETS;
  showFiatOnTestnets: boolean;
}

interface ToggleBasicFunctionalityAction {
  type: ActionType.TOGGLE_BASIC_FUNCTIONALITY;
  basicFunctionalityEnabled: boolean;
}

interface ToggleDeviceNotificationsAction {
  type: ActionType.TOGGLE_DEVICE_NOTIFICATIONS;
  deviceNotificationEnabled: boolean;
}

interface SetDeepLinkModalDisabledAction {
  type: ActionType.SET_DEEP_LINK_MODAL_DISABLED;
  deepLinkModalDisabled: boolean;
}

interface TokenSortConfig {
  key: string;
  order: string;
  sortCallback: string;
}

interface SetTokenSortConfigAction {
  type: ActionType.SET_TOKEN_SORT_CONFIG;
  tokenSortConfig: TokenSortConfig;
}

export type Action =
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
  | SetDeepLinkModalDisabledAction
  | SetTokenSortConfigAction;

export function setSearchEngine(searchEngine: string): SetSearchEngineAction {
  return {
    type: ActionType.SET_SEARCH_ENGINE,
    searchEngine,
  };
}

export function setShowHexData(showHexData: boolean): SetShowHexDataAction {
  return {
    type: ActionType.SET_SHOW_HEX_DATA,
    showHexData,
  };
}

export function setShowCustomNonce(
  showCustomNonce: boolean,
): SetShowCustomNonceAction {
  return {
    type: ActionType.SET_SHOW_CUSTOM_NONCE,
    showCustomNonce,
  };
}

export function setHideZeroBalanceTokens(
  hideZeroBalanceTokens: boolean,
): SetHideZeroBalanceTokensAction {
  return {
    type: ActionType.SET_HIDE_ZERO_BALANCE_TOKENS,
    hideZeroBalanceTokens,
  };
}

export function setUseBlockieIcon(
  useBlockieIcon: boolean,
): SetUseBlockieIconAction {
  return {
    type: ActionType.SET_USE_BLOCKIE_ICON,
    useBlockieIcon,
  };
}

export function setPrimaryCurrency(
  primaryCurrency: string,
): SetPrimaryCurrencyAction {
  return {
    type: ActionType.SET_PRIMARY_CURRENCY,
    primaryCurrency,
  };
}

export function setShowFiatOnTestnets(
  showFiatOnTestnets: boolean,
): SetShowFiatOnTestnetsAction {
  return {
    type: ActionType.SET_SHOW_FIAT_ON_TESTNETS,
    showFiatOnTestnets,
  };
}

export function setLockTime(lockTime: number): SetLockTimeAction {
  return {
    type: ActionType.SET_LOCK_TIME,
    lockTime,
  };
}

export function toggleBasicFunctionality(
  basicFunctionalityEnabled: boolean,
): ToggleBasicFunctionalityAction {
  return {
    type: ActionType.TOGGLE_BASIC_FUNCTIONALITY,
    basicFunctionalityEnabled,
  };
}

export function toggleDeviceNotification(
  deviceNotificationEnabled: boolean,
): ToggleDeviceNotificationsAction {
  return {
    type: ActionType.TOGGLE_DEVICE_NOTIFICATIONS,
    deviceNotificationEnabled,
  };
}

export function setDeepLinkModalDisabled(
  deepLinkModalDisabled: boolean,
): SetDeepLinkModalDisabledAction {
  return {
    type: ActionType.SET_DEEP_LINK_MODAL_DISABLED,
    deepLinkModalDisabled,
  };
}

export function setTokenSortConfig(
  tokenSortConfig: TokenSortConfig,
): SetTokenSortConfigAction {
  return {
    type: ActionType.SET_TOKEN_SORT_CONFIG,
    tokenSortConfig,
  };
}

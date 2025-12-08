import { Action } from 'redux';

/**
 * Settings action type enum
 */
export enum SettingsActionType {
  SET_SEARCH_ENGINE = 'SET_SEARCH_ENGINE',
  SET_SHOW_HEX_DATA = 'SET_SHOW_HEX_DATA',
  SET_SHOW_CUSTOM_NONCE = 'SET_SHOW_CUSTOM_NONCE',
  SET_SHOW_FIAT_ON_TESTNETS = 'SET_SHOW_FIAT_ON_TESTNETS',
  SET_HIDE_ZERO_BALANCE_TOKENS = 'SET_HIDE_ZERO_BALANCE_TOKENS',
  SET_LOCK_TIME = 'SET_LOCK_TIME',
  SET_PRIMARY_CURRENCY = 'SET_PRIMARY_CURRENCY',
  SET_USE_BLOCKIE_ICON = 'SET_USE_BLOCKIE_ICON',
  TOGGLE_BASIC_FUNCTIONALITY = 'TOGGLE_BASIC_FUNCTIONALITY',
  TOGGLE_DEVICE_NOTIFICATIONS = 'TOGGLE_DEVICE_NOTIFICATIONS',
  SET_TOKEN_SORT_CONFIG = 'SET_TOKEN_SORT_CONFIG',
  SET_DEEP_LINK_MODAL_DISABLED = 'SET_DEEP_LINK_MODAL_DISABLED',
}

/**
 * Set search engine action interface
 */
export interface SetSearchEngineAction
  extends Action<SettingsActionType.SET_SEARCH_ENGINE> {
  searchEngine: string;
}

/**
 * Set show hex data action interface
 */
export interface SetShowHexDataAction
  extends Action<SettingsActionType.SET_SHOW_HEX_DATA> {
  showHexData: boolean;
}

/**
 * Set show custom nonce action interface
 */
export interface SetShowCustomNonceAction
  extends Action<SettingsActionType.SET_SHOW_CUSTOM_NONCE> {
  showCustomNonce: boolean;
}

/**
 * Set show fiat on testnets action interface
 */
export interface SetShowFiatOnTestnetsAction
  extends Action<SettingsActionType.SET_SHOW_FIAT_ON_TESTNETS> {
  showFiatOnTestnets: boolean;
}

/**
 * Set hide zero balance tokens action interface
 */
export interface SetHideZeroBalanceTokensAction
  extends Action<SettingsActionType.SET_HIDE_ZERO_BALANCE_TOKENS> {
  hideZeroBalanceTokens: boolean;
}

/**
 * Set lock time action interface
 */
export interface SetLockTimeAction
  extends Action<SettingsActionType.SET_LOCK_TIME> {
  lockTime: number;
}

/**
 * Set primary currency action interface
 */
export interface SetPrimaryCurrencyAction
  extends Action<SettingsActionType.SET_PRIMARY_CURRENCY> {
  primaryCurrency: string;
}

/**
 * Set use blockie icon action interface
 */
export interface SetUseBlockieIconAction
  extends Action<SettingsActionType.SET_USE_BLOCKIE_ICON> {
  useBlockieIcon: boolean;
}

/**
 * Toggle basic functionality action interface
 */
export interface ToggleBasicFunctionalityAction
  extends Action<SettingsActionType.TOGGLE_BASIC_FUNCTIONALITY> {
  basicFunctionalityEnabled: boolean;
}

/**
 * Toggle device notifications action interface
 */
export interface ToggleDeviceNotificationsAction
  extends Action<SettingsActionType.TOGGLE_DEVICE_NOTIFICATIONS> {
  deviceNotificationEnabled: boolean;
}

/**
 * Set token sort config action interface
 */
export interface SetTokenSortConfigAction
  extends Action<SettingsActionType.SET_TOKEN_SORT_CONFIG> {
  tokenSortConfig: unknown;
}

/**
 * Set deep link modal disabled action interface
 */
export interface SetDeepLinkModalDisabledAction
  extends Action<SettingsActionType.SET_DEEP_LINK_MODAL_DISABLED> {
  deepLinkModalDisabled: boolean;
}

/**
 * Settings action union type
 */
export type SettingsAction =
  | SetSearchEngineAction
  | SetShowHexDataAction
  | SetShowCustomNonceAction
  | SetShowFiatOnTestnetsAction
  | SetHideZeroBalanceTokensAction
  | SetLockTimeAction
  | SetPrimaryCurrencyAction
  | SetUseBlockieIconAction
  | ToggleBasicFunctionalityAction
  | ToggleDeviceNotificationsAction
  | SetTokenSortConfigAction
  | SetDeepLinkModalDisabledAction;

/**
 * Sets the search engine
 * @param searchEngine - The search engine to set
 * @returns Set search engine action
 */
export function setSearchEngine(searchEngine: string): SetSearchEngineAction {
  return {
    type: SettingsActionType.SET_SEARCH_ENGINE,
    searchEngine,
  };
}

/**
 * Sets whether to show hex data
 * @param showHexData - Whether to show hex data
 * @returns Set show hex data action
 */
export function setShowHexData(showHexData: boolean): SetShowHexDataAction {
  return {
    type: SettingsActionType.SET_SHOW_HEX_DATA,
    showHexData,
  };
}

/**
 * Sets whether to show custom nonce
 * @param showCustomNonce - Whether to show custom nonce
 * @returns Set show custom nonce action
 */
export function setShowCustomNonce(
  showCustomNonce: boolean,
): SetShowCustomNonceAction {
  return {
    type: SettingsActionType.SET_SHOW_CUSTOM_NONCE,
    showCustomNonce,
  };
}

/**
 * Sets whether to show fiat on testnets
 * @param showFiatOnTestnets - Whether to show fiat on testnets
 * @returns Set show fiat on testnets action
 */
export function setShowFiatOnTestnets(
  showFiatOnTestnets: boolean,
): SetShowFiatOnTestnetsAction {
  return {
    type: SettingsActionType.SET_SHOW_FIAT_ON_TESTNETS,
    showFiatOnTestnets,
  };
}

/**
 * Sets whether to hide zero balance tokens
 * @param hideZeroBalanceTokens - Whether to hide zero balance tokens
 * @returns Set hide zero balance tokens action
 */
export function setHideZeroBalanceTokens(
  hideZeroBalanceTokens: boolean,
): SetHideZeroBalanceTokensAction {
  return {
    type: SettingsActionType.SET_HIDE_ZERO_BALANCE_TOKENS,
    hideZeroBalanceTokens,
  };
}

/**
 * Sets the lock time
 * @param lockTime - The lock time in milliseconds (-1 for disabled)
 * @returns Set lock time action
 */
export function setLockTime(lockTime: number): SetLockTimeAction {
  return {
    type: SettingsActionType.SET_LOCK_TIME,
    lockTime,
  };
}

/**
 * Sets the primary currency
 * @param primaryCurrency - The primary currency to set
 * @returns Set primary currency action
 */
export function setPrimaryCurrency(
  primaryCurrency: string,
): SetPrimaryCurrencyAction {
  return {
    type: SettingsActionType.SET_PRIMARY_CURRENCY,
    primaryCurrency,
  };
}

/**
 * Sets whether to use blockie icon
 * @param useBlockieIcon - Whether to use blockie icon
 * @returns Set use blockie icon action
 */
export function setUseBlockieIcon(
  useBlockieIcon: boolean,
): SetUseBlockieIconAction {
  return {
    type: SettingsActionType.SET_USE_BLOCKIE_ICON,
    useBlockieIcon,
  };
}

/**
 * Toggles basic functionality
 * @param basicFunctionalityEnabled - Whether basic functionality is enabled
 * @returns Toggle basic functionality action
 */
export function toggleBasicFunctionality(
  basicFunctionalityEnabled: boolean,
): ToggleBasicFunctionalityAction {
  return {
    type: SettingsActionType.TOGGLE_BASIC_FUNCTIONALITY,
    basicFunctionalityEnabled,
  };
}

/**
 * Toggles device notifications
 * @param deviceNotificationEnabled - Whether device notifications are enabled
 * @returns Toggle device notifications action
 */
export function toggleDeviceNotification(
  deviceNotificationEnabled: boolean,
): ToggleDeviceNotificationsAction {
  return {
    type: SettingsActionType.TOGGLE_DEVICE_NOTIFICATIONS,
    deviceNotificationEnabled,
  };
}

/**
 * Sets the token sort config
 * @param tokenSortConfig - The token sort configuration
 * @returns Set token sort config action
 */
export function setTokenSortConfig(
  tokenSortConfig: unknown,
): SetTokenSortConfigAction {
  return {
    type: SettingsActionType.SET_TOKEN_SORT_CONFIG,
    tokenSortConfig,
  };
}

/**
 * Sets whether deep link modal is disabled
 * @param deepLinkModalDisabled - Whether deep link modal is disabled
 * @returns Set deep link modal disabled action
 */
export function setDeepLinkModalDisabled(
  deepLinkModalDisabled: boolean,
): SetDeepLinkModalDisabledAction {
  return {
    type: SettingsActionType.SET_DEEP_LINK_MODAL_DISABLED,
    deepLinkModalDisabled,
  };
}

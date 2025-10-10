import { SettingsActionType } from './types';
import type {
  SetSearchEngineAction,
  SetLockTimeAction,
  SetShowHexDataAction,
  SetShowCustomNonceAction,
  SetHideZeroBalanceTokensAction,
  SetUseBlockieIconAction,
  SetPrimaryCurrencyAction,
  SetShowFiatOnTestnetsAction,
  ToggleBasicFunctionalityAction,
  ToggleDeviceNotificationsAction,
  SetDeepLinkModalDisabledAction,
} from './types';
import type { SearchEngine, PrimaryCurrency } from '../../reducers/settings/types';

export * from './types';

export const setSearchEngine = (searchEngine: SearchEngine): SetSearchEngineAction => ({
  type: SettingsActionType.SET_SEARCH_ENGINE,
  searchEngine,
});

export const setShowHexData = (showHexData: boolean): SetShowHexDataAction => ({
  type: SettingsActionType.SET_SHOW_HEX_DATA,
  showHexData,
});

export const setShowCustomNonce = (showCustomNonce: boolean): SetShowCustomNonceAction => ({
  type: SettingsActionType.SET_SHOW_CUSTOM_NONCE,
  showCustomNonce,
});

export const setShowFiatOnTestnets = (showFiatOnTestnets: boolean): SetShowFiatOnTestnetsAction => ({
  type: SettingsActionType.SET_SHOW_FIAT_ON_TESTNETS,
  showFiatOnTestnets,
});

export const setHideZeroBalanceTokens = (hideZeroBalanceTokens: boolean): SetHideZeroBalanceTokensAction => ({
  type: SettingsActionType.SET_HIDE_ZERO_BALANCE_TOKENS,
  hideZeroBalanceTokens,
});

export const setLockTime = (lockTime: number): SetLockTimeAction => ({
  type: SettingsActionType.SET_LOCK_TIME,
  lockTime,
});

export const setPrimaryCurrency = (primaryCurrency: PrimaryCurrency): SetPrimaryCurrencyAction => ({
  type: SettingsActionType.SET_PRIMARY_CURRENCY,
  primaryCurrency,
});

export const setUseBlockieIcon = (useBlockieIcon: boolean): SetUseBlockieIconAction => ({
  type: SettingsActionType.SET_USE_BLOCKIE_ICON,
  useBlockieIcon,
});

export const toggleBasicFunctionality = (basicFunctionalityEnabled: boolean): ToggleBasicFunctionalityAction => ({
  type: SettingsActionType.TOGGLE_BASIC_FUNCTIONALITY,
  basicFunctionalityEnabled,
});

export const toggleDeviceNotification = (deviceNotificationEnabled: boolean): ToggleDeviceNotificationsAction => ({
  type: SettingsActionType.TOGGLE_DEVICE_NOTIFICATIONS,
  deviceNotificationEnabled,
});

export const setDeepLinkModalDisabled = (deepLinkModalDisabled: boolean): SetDeepLinkModalDisabledAction => ({
  type: SettingsActionType.SET_DEEP_LINK_MODAL_DISABLED,
  deepLinkModalDisabled,
});

import AppConstants from '../../core/AppConstants';
import { SettingsState, SettingsAction, SettingsActionType } from './types';

const initialState: SettingsState = {
  searchEngine: AppConstants.DEFAULT_SEARCH_ENGINE,
  primaryCurrency: 'ETH',
  lockTime: -1,
  useBlockieIcon: true,
  hideZeroBalanceTokens: false,
  basicFunctionalityEnabled: true,
  deepLinkModalDisabled: false,
};

const settingsReducer = (
  action: SettingsAction,
  state: SettingsState = initialState,
): SettingsState => {
  switch (action.type) {
    case SettingsActionType.SET_SEARCH_ENGINE:
      return {
        ...state,
        searchEngine: action.searchEngine || '',
      };
    case SettingsActionType.SET_LOCK_TIME:
      return {
        ...state,
        lockTime: action.lockTime ?? -1,
      };
    case SettingsActionType.SET_SHOW_HEX_DATA:
      return {
        ...state,
        showHexData: action.showHexData ?? false,
      };
    case SettingsActionType.SET_SHOW_CUSTOM_NONCE:
      return {
        ...state,
        showCustomNonce: action.showCustomNonce ?? false,
      };
    case SettingsActionType.SET_HIDE_ZERO_BALANCE_TOKENS:
      return {
        ...state,
        hideZeroBalanceTokens: action.hideZeroBalanceTokens ?? false,
      };
    case SettingsActionType.SET_USE_BLOCKIE_ICON:
      return {
        ...state,
        useBlockieIcon: action.useBlockieIcon ?? true,
      };
    case SettingsActionType.SET_PRIMARY_CURRENCY:
      return {
        ...state,
        primaryCurrency: action.primaryCurrency || 'ETH',
      };
    case SettingsActionType.SET_SHOW_FIAT_ON_TESTNETS:
      return {
        ...state,
        showFiatOnTestnets: action.showFiatOnTestnets ?? false,
      };
    case SettingsActionType.TOGGLE_BASIC_FUNCTIONALITY:
      return {
        ...state,
        basicFunctionalityEnabled: action.basicFunctionalityEnabled ?? true,
      };
    case SettingsActionType.TOGGLE_DEVICE_NOTIFICATIONS:
      return {
        ...state,
        deviceNotificationEnabled: action.deviceNotificationEnabled ?? false,
      };
    case SettingsActionType.SET_DEEP_LINK_MODAL_DISABLED:
      return {
        ...state,
        deepLinkModalDisabled: action.deepLinkModalDisabled ?? false,
      };
    default:
      return state;
  }
};
export default settingsReducer;

import AppConstants from '../../core/AppConstants';

export interface SettingsState {
  searchEngine?: string;
  primaryCurrency?: string;
  lockTime?: number;
  useBlockieIcon?: boolean;
  hideZeroBalanceTokens?: boolean;
  basicFunctionalityEnabled?: boolean;
  deepLinkModalDisabled?: boolean;
  showHexData?: boolean;
  showCustomNonce?: boolean;
  showFiatOnTestnets?: boolean;
  deviceNotificationEnabled?: boolean;
  maxValueMode?: boolean;
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

interface SettingsAction {
  type: string;
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
        searchEngine: action.searchEngine || 'DuckDuckGo',
      };
    case SettingsActionType.SET_LOCK_TIME:
      return {
        ...state,
        lockTime: action.lockTime || 30000,
      };
    case SettingsActionType.SET_SHOW_HEX_DATA:
      return {
        ...state,
        showHexData: action.showHexData,
      };
    case SettingsActionType.SET_SHOW_CUSTOM_NONCE:
      return {
        ...state,
        showCustomNonce: action.showCustomNonce,
      };
    case SettingsActionType.SET_HIDE_ZERO_BALANCE_TOKENS:
      return {
        ...state,
        hideZeroBalanceTokens: action.hideZeroBalanceTokens ?? false,
      };
    case SettingsActionType.SET_USE_BLOCKIE_ICON:
      return {
        ...state,
        useBlockieIcon: action.useBlockieIcon ?? false,
      };
    case SettingsActionType.SET_PRIMARY_CURRENCY:
      return {
        ...state,
        primaryCurrency: action.primaryCurrency || 'ETH',
      };
    case SettingsActionType.SET_SHOW_FIAT_ON_TESTNETS:
      return {
        ...state,
        showFiatOnTestnets: action.showFiatOnTestnets,
      };
    case SettingsActionType.TOGGLE_BASIC_FUNCTIONALITY:
      return {
        ...state,
        basicFunctionalityEnabled: action.basicFunctionalityEnabled ?? true,
      };
    case SettingsActionType.TOGGLE_DEVICE_NOTIFICATIONS:
      return {
        ...state,
        deviceNotificationEnabled: action.deviceNotificationEnabled,
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

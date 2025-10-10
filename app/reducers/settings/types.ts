export type SearchEngine = 'Google' | 'DuckDuckGo';
export type PrimaryCurrency = 'ETH' | 'Fiat';

/**
 * Settings state interface
 */
export interface SettingsState {
  searchEngine: SearchEngine;
  primaryCurrency: PrimaryCurrency;
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

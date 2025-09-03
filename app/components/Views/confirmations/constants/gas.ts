export enum GasModalType {
  ESTIMATES = 'estimatesModal',
  ADVANCED_EIP1559 = 'advancedEIP1559Modal',
  ADVANCED_GAS_PRICE = 'advancedGasPriceModal',
}

export enum GasOptionIcon {
  ADVANCED = '⚙️',
  GAS_PRICE = '⛓️',
  HIGH = '🦍',
  LOW = '🐢',
  MEDIUM = '🦊',
  SITE_SUGGESTED = '🌐',
}

/**
 * Default string value displayed when gas values are empty or unavailable
 * Used throughout gas estimation and confirmation UI components
 */
export const EMPTY_VALUE_STRING = '--';

import { ReactNode } from 'react';

/**
 * Gas object containing legacy gas parameters
 */
export interface LegacyGasObject {
  legacyGasLimit?: string;
  suggestedGasPrice?: string;
  suggestedMaxFeePerGas?: string;
}

/**
 * New gas price object returned when saving
 */
export interface NewGasPriceObject {
  suggestedGasPrice?: string;
  legacyGasLimit?: string;
}

/**
 * Analytics parameters for gas fee tracking
 */
export interface GasAnalyticsParams {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Extended options that can be spread into the component
 */
export interface ExtendOptions {
  [key: string]: unknown;
}

export interface EditGasFeeLegacyUpdateProps {
  /**
   * Function called when user cancels
   */
  onCancel: () => void;
  /**
   * Function called when user saves the new gas
   */
  onSave: (
    gasTxn: EditLegacyGasTransaction,
    newGasObject: NewGasPriceObject,
  ) => void;
  /**
   * Error message to show
   */
  error: string | ReactNode | null;
  /**
   * Warning message to show
   */
  warning?: string | ReactNode | null;
  /**
   * Extend options object. Object has option keys and properties will be spread
   */
  extendOptions?: ExtendOptions;
  /**
   * Function to call when update animation starts
   */
  onUpdatingValuesStart: () => void;
  /**
   * Function to call when update animation ends
   */
  onUpdatingValuesEnd: () => void;
  /**
   * If the values should animate upon update or not
   */
  animateOnChange: boolean | undefined;
  /**
   * Boolean to determine if the animation is happening
   */
  isAnimating: boolean;
  /**
   * Extra analytics params to be send with the gas analytics
   */
  analyticsParams: GasAnalyticsParams;
  view: string;
  onlyGas?: boolean;
  /**
   * Selected gas object containing legacy gas parameters
   */
  selectedGasObject: LegacyGasObject;
  hasDappSuggestedGas?: boolean;
  chainId: string;
}

export interface EditLegacyGasTransaction {
  suggestedGasLimit: string;
  suggestedGasPrice: string;
  transactionFee: string;
  transactionFeeFiat: string;
}

import { CurrencyRateState } from '@metamask/assets-controllers';

/**
 * Default state configuration for the currency rate controller
 * Provides initial values for currency conversion rates and settings
 * Used to initialize the controller when no previous state exists
 * @type {CurrencyRateState}
 */
export const defaultCurrencyRateState: CurrencyRateState = {
  currentCurrency: 'usd',
  currencyRates: {
    ETH: {
      conversionDate: 0,
      conversionRate: 0,
      usdConversionRate: null,
    },
  },
};

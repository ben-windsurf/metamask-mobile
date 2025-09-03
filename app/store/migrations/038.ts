import { captureException } from '@sentry/react-native';
import { isObject } from '@metamask/utils';
import { ensureValidState } from './util';

/**
 * Migration 38: Restructures CurrencyRateController state format
 * Removes pending currency properties and reorganizes currency rates into a nested structure
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state with updated CurrencyRateController structure
 */
export default function migrate(state: unknown) {
  if (!ensureValidState(state, 38)) {
    return state;
  }

  const currencyRateState = state.engine.backgroundState.CurrencyRateController;

  if (!isObject(currencyRateState)) {
    captureException(
      new Error(
        `Migration 38: Invalid CurrencyRateController state error: '${JSON.stringify(
          currencyRateState,
        )}'`,
      ),
    );
    return state;
  }

  const {
    currentCurrency,
    nativeCurrency,
    conversionRate,
    conversionDate,
    usdConversionRate,
  } = currencyRateState;

  delete currencyRateState.pendingCurrentCurrency;
  delete currencyRateState.pendingNativeCurrency;

  state.engine.backgroundState.CurrencyRateController = {
    currentCurrency,
    currencyRates: {
      [nativeCurrency as string]: {
        conversionRate,
        conversionDate,
        usdConversionRate,
      },
    },
  };

  return state;
}

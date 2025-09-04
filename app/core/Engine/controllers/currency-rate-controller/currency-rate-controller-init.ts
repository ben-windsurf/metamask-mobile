import {
  CurrencyRateController,
  CurrencyRateControllerActions,
  CurrencyRateControllerEvents,
} from '@metamask/assets-controllers';
import type { ControllerInitFunction } from '../../types';
import { RestrictedMessenger } from '@metamask/base-controller';
import type { NetworkControllerGetNetworkClientByIdAction } from '@metamask/network-controller';
import { defaultCurrencyRateState } from './constants';
import { selectBasicFunctionalityEnabled } from '../../../../selectors/settings';

/**
 * Initialize the CurrencyRateController.
 *
 * @param request - The request object.
 * @returns The CurrencyRateController.
 */

/**
 * Messenger type for the CurrencyRateController.
 * Provides restricted messaging capabilities for currency rate operations.
 *
 * TODO: Remove once the CurrencyRateMessenger is properly exported from module
 */
export type CurrencyRateMessenger = RestrictedMessenger<
  'CurrencyRateController',
  CurrencyRateControllerActions | NetworkControllerGetNetworkClientByIdAction,
  CurrencyRateControllerEvents,
  NetworkControllerGetNetworkClientByIdAction['type'],
  never
>;

/**
 * Represents a currency rate entry with conversion information.
 * Used internally for normalizing currency rate data.
 */
interface CurrencyRateEntry {
  /** The conversion rate for the currency */
  conversionRate: number;
  /** The date when the conversion rate was last updated, or null if unknown */
  conversionDate: number | null;
  /** The USD conversion rate, or null if not available */
  usdConversionRate: number | null;
}

/**
 * Initializes the CurrencyRateController with normalized currency rate data.
 * Ensures that all currency rates have valid conversion rates and handles
 * persisted state restoration with proper data normalization.
 *
 * @param request - The controller initialization request containing messenger, state, and utilities
 * @returns Object containing the initialized CurrencyRateController instance
 */
export const currencyRateControllerInit: ControllerInitFunction<
  CurrencyRateController,
  CurrencyRateMessenger
> = (request) => {
  const { controllerMessenger, persistedState, getState } = request;

  // Get the persisted state or use default state
  const persistedCurrencyRateState =
    persistedState.CurrencyRateController ?? defaultCurrencyRateState;

  // Normalize the currency rates to ensure conversionRate is never null
  const normalizedCurrencyRates: Record<string, CurrencyRateEntry> = {};
  const currencyRates =
    persistedCurrencyRateState.currencyRates ??
    defaultCurrencyRateState.currencyRates;

  // Normalize each currency rate to ensure conversionRate is never null
  Object.entries(currencyRates).forEach(([key, value]) => {
    normalizedCurrencyRates[key] = {
      ...value,
      conversionRate: value.conversionRate ?? 0,
    };
  });

  const controller = new CurrencyRateController({
    includeUsdRate: true,
    messenger: controllerMessenger,
    state: {
      ...persistedCurrencyRateState,
      currencyRates: normalizedCurrencyRates,
    },
    useExternalServices: () => selectBasicFunctionalityEnabled(getState()),
  });

  return { controller };
};

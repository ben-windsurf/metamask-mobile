import { RatesControllerStateChangeEvent as RatesControllerStateChangeEventType } from '@metamask/assets-controllers';

/**
 * Event type constant for RatesController state changes.
 * Used to listen for updates to exchange rates and currency data.
 */
export const RatesControllerStateChangeEvent: RatesControllerStateChangeEventType['type'] =
  'RatesController:stateChange';

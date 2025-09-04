import { JsonMap } from '../../../Analytics/MetaMetrics.types';
import SmartTransactionsController from '@metamask/smart-transactions-controller';
import type { RootState } from '../../../../reducers';
import { TransactionControllerInitMessenger } from '../../messengers/transaction-controller-messenger';

// In order to not import from redux slice, type is defined here
/**
 * Metrics data structure for transaction events.
 * Contains both regular and sensitive properties for analytics tracking.
 */
export interface TransactionMetrics {
  /** Standard properties that can be logged normally */
  properties: JsonMap;
  /** Sensitive properties that require special handling for privacy */
  sensitiveProperties: JsonMap;
}

/**
 * Request object for transaction event handlers.
 * Provides access to application state, messaging, and smart transaction functionality.
 */
export interface TransactionEventHandlerRequest {
  /** Function to retrieve the current Redux state */
  getState: () => RootState;
  /** Messenger instance for transaction controller initialization */
  initMessenger: TransactionControllerInitMessenger;
  /** Controller instance for managing smart transactions */
  smartTransactionsController: SmartTransactionsController;
}

import {
  AccountsControllerGetSelectedAccountAction,
  AccountsControllerGetStateAction,
} from '@metamask/accounts-controller';
import { ApprovalControllerActions } from '@metamask/approval-controller';
import { RemoteFeatureFlagControllerGetStateAction } from '@metamask/remote-feature-flag-controller';
import { Messenger } from '@metamask/base-controller';
import {
  NetworkControllerFindNetworkClientIdByChainIdAction,
  NetworkControllerGetEIP1559CompatibilityAction,
  NetworkControllerGetNetworkClientByIdAction,
  NetworkControllerStateChangeEvent,
} from '@metamask/network-controller';
import {
  TransactionControllerMessenger,
  TransactionControllerTransactionApprovedEvent,
  TransactionControllerTransactionConfirmedEvent,
  TransactionControllerTransactionDroppedEvent,
  TransactionControllerTransactionFailedEvent,
  TransactionControllerTransactionRejectedEvent,
  TransactionControllerTransactionSubmittedEvent,
  TransactionControllerUnapprovedTransactionAddedEvent,
} from '@metamask/transaction-controller';
import {
  SmartTransactionsControllerSmartTransactionEvent,
  SmartTransactionsControllerSmartTransactionConfirmationDoneEvent,
} from '@metamask/smart-transactions-controller';
import { KeyringControllerSignEip7702AuthorizationAction } from '@metamask/keyring-controller';

/**
 * Union type of all allowed messenger actions for the transaction controller.
 * Includes actions from accounts, approval, network, keyring, and remote feature flag controllers.
 */
type MessengerActions =
  | AccountsControllerGetStateAction
  | AccountsControllerGetSelectedAccountAction
  | ApprovalControllerActions
  | NetworkControllerFindNetworkClientIdByChainIdAction
  | KeyringControllerSignEip7702AuthorizationAction
  | NetworkControllerGetEIP1559CompatibilityAction
  | NetworkControllerGetNetworkClientByIdAction
  | RemoteFeatureFlagControllerGetStateAction;

/**
 * Union type of all allowed messenger events for the transaction controller.
 * Includes transaction lifecycle events, network state changes, and smart transaction events.
 */
type MessengerEvents =
  | TransactionControllerTransactionApprovedEvent
  | TransactionControllerTransactionConfirmedEvent
  | TransactionControllerTransactionDroppedEvent
  | TransactionControllerTransactionFailedEvent
  | TransactionControllerTransactionRejectedEvent
  | TransactionControllerTransactionSubmittedEvent
  | TransactionControllerUnapprovedTransactionAddedEvent
  | NetworkControllerStateChangeEvent
  | SmartTransactionsControllerSmartTransactionEvent
  | SmartTransactionsControllerSmartTransactionConfirmationDoneEvent;

/**
 * Type representing the restricted messenger instance for transaction controller initialization.
 * This messenger is used during the initialization phase of the transaction controller.
 */
export type TransactionControllerInitMessenger = ReturnType<
  typeof getTransactionControllerInitMessenger
>;

/**
 * Creates a restricted messenger instance for the transaction controller.
 * This messenger provides access to specific actions and events needed by the transaction controller.
 *
 * @param messenger - The base messenger instance with full access to actions and events
 * @returns A restricted messenger instance configured for the transaction controller
 */
export function getTransactionControllerMessenger(
  messenger: Messenger<MessengerActions, MessengerEvents>,
): TransactionControllerMessenger {
  // @ts-expect-error TODO: Resolve mismatch between base-controller versions.
  return messenger.getRestricted({
    name: 'TransactionController',
    allowedActions: [
      'AccountsController:getSelectedAccount',
      'AccountsController:getState',
      `ApprovalController:addRequest`,
      'KeyringController:signEip7702Authorization',
      'NetworkController:findNetworkClientIdByChainId',
      'NetworkController:getNetworkClientById',
      'RemoteFeatureFlagController:getState',
    ],
    allowedEvents: [`NetworkController:stateChange`],
  });
}

/**
 * Creates a restricted messenger instance for transaction controller initialization.
 * This messenger is used during the initialization phase and provides access to
 * transaction lifecycle events and approval controller actions.
 *
 * @param messenger - The base messenger instance with full access to actions and events
 * @returns A restricted messenger instance configured for transaction controller initialization
 */
export function getTransactionControllerInitMessenger(
  messenger: Messenger<MessengerActions, MessengerEvents>,
) {
  return messenger.getRestricted({
    name: 'TransactionControllerInit',
    allowedEvents: [
      'TransactionController:transactionApproved',
      'TransactionController:transactionConfirmed',
      'TransactionController:transactionDropped',
      'TransactionController:transactionFailed',
      'TransactionController:transactionRejected',
      'TransactionController:transactionSubmitted',
      'TransactionController:unapprovedTransactionAdded',
      'SmartTransactionsController:smartTransaction',
      'SmartTransactionsController:smartTransactionConfirmationDone',
    ],
    allowedActions: [
      'ApprovalController:addRequest',
      'ApprovalController:endFlow',
      'ApprovalController:startFlow',
      'ApprovalController:updateRequestState',
      'NetworkController:getEIP1559Compatibility',
    ],
  });
}

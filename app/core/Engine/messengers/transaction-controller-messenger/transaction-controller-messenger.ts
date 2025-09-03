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

type MessengerActions =
  | AccountsControllerGetStateAction
  | AccountsControllerGetSelectedAccountAction
  | ApprovalControllerActions
  | NetworkControllerFindNetworkClientIdByChainIdAction
  | KeyringControllerSignEip7702AuthorizationAction
  | NetworkControllerGetEIP1559CompatibilityAction
  | NetworkControllerGetNetworkClientByIdAction
  | RemoteFeatureFlagControllerGetStateAction;

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

export type TransactionControllerInitMessenger = ReturnType<
  typeof getTransactionControllerInitMessenger
>;

/**
 * Creates a restricted messenger for the TransactionController with specific allowed actions and events
 * @param {Messenger<MessengerActions, MessengerEvents>} messenger - The base messenger instance
 * @returns {TransactionControllerMessenger} A restricted messenger configured for transaction operations
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
 * Creates a restricted messenger for TransactionController initialization with event handling capabilities
 * @param {Messenger<MessengerActions, MessengerEvents>} messenger - The base messenger instance
 * @returns {TransactionControllerInitMessenger} A restricted messenger configured for transaction initialization and event handling
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

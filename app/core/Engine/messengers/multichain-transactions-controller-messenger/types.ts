import {
  AccountsControllerAccountAddedEvent,
  AccountsControllerAccountRemovedEvent,
  AccountsControllerListMultichainAccountsAction,
  AccountsControllerAccountTransactionsUpdatedEvent,
} from '@metamask/accounts-controller';
import { MultichainTransactionsControllerTransactionConfirmedEvent } from '@metamask/multichain-transactions-controller';
import { HandleSnapRequest } from '@metamask/snaps-controllers';

/**
 * Union type defining all possible actions that the MultichainTransactionsController messenger can handle.
 * Includes actions for listing multichain accounts and handling snap requests.
 */
export type MultichainTransactionsControllerActions =
  | AccountsControllerListMultichainAccountsAction
  | HandleSnapRequest;

/**
 * Union type defining all possible events that the MultichainTransactionsController messenger can emit or listen to.
 * Includes account lifecycle events, transaction updates, state changes, and transaction confirmation events.
 */
export type MultichainTransactionsControllerEvents =
  | AccountsControllerAccountAddedEvent
  | AccountsControllerAccountRemovedEvent
  | AccountsControllerAccountTransactionsUpdatedEvent
  | {
      type: 'MultichainTransactionsController:stateChange';
      payload: [unknown];
    }
  | MultichainTransactionsControllerTransactionConfirmedEvent;

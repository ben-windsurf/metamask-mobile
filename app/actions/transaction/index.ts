import TransactionTypes from '../../core/TransactionTypes';
import {
  ResetTransactionAction,
  NewAssetTransactionAction,
  SetRecipientAction,
  SetSelectedAssetAction,
  PrepareTransactionAction,
  SetTransactionSecurityAlertResponseAction,
  SetTransactionObjectAction,
  SetTransactionIdAction,
  SetTokensTransactionAction,
  SetEtherTransactionAction,
  SetNonceAction,
  SetProposedNonceAction,
  SetMaxValueModeAction,
  SetTransactionValueAction,
  SelectedAsset,
  TransactionObject,
  AssetType,
  TransactionMetadata,
} from './types';
import { SecurityAlertResponse } from '@metamask/transaction-controller';

const {
  ASSET: { ETH, ERC20, ERC721 },
} = TransactionTypes;

/**
 * Clears transaction object completely
 */
export function resetTransaction(): ResetTransactionAction {
  return {
    type: 'RESET_TRANSACTION',
  };
}

/**
 * Starts a new transaction state with an asset
 *
 * @param selectedAsset - Asset to start the transaction with
 */
export function newAssetTransaction(
  selectedAsset: SelectedAsset,
): NewAssetTransactionAction {
  return {
    type: 'NEW_ASSET_TRANSACTION',
    selectedAsset,
    assetType: (selectedAsset.isETH
      ? ETH
      : selectedAsset.tokenId
      ? ERC721
      : ERC20) as AssetType,
  };
}

/**
 * Sets transaction to address and ensRecipient in case is available
 *
 * @param from - Address to send the transaction from
 * @param to - Address to send the transaction to
 * @param ensRecipient - Resolved ens name to send the transaction to
 * @param transactionToName - Resolved address book name for to address
 * @param transactionFromName - Resolved address book name for from address
 */
export function setRecipient(
  from: string,
  to: string,
  ensRecipient?: string,
  transactionToName?: string,
  transactionFromName?: string,
): SetRecipientAction {
  return {
    type: 'SET_RECIPIENT',
    from,
    to,
    ensRecipient,
    transactionToName,
    transactionFromName,
  };
}

/**
 * Sets asset as selectedAsset
 *
 * @param selectedAsset - Asset to start the transaction with
 */
export function setSelectedAsset(
  selectedAsset: SelectedAsset,
): SetSelectedAssetAction {
  return {
    type: 'SET_SELECTED_ASSET',
    selectedAsset,
    assetType: (selectedAsset.isETH
      ? ETH
      : selectedAsset.tokenId
      ? ERC721
      : ERC20) as AssetType,
  };
}

/**
 * Sets transaction object to be sent
 *
 * @param transaction - Transaction object with from, to, data, gas, gasPrice, value
 */
export function prepareTransaction(
  transaction: TransactionObject,
): PrepareTransactionAction {
  return {
    type: 'PREPARE_TRANSACTION',
    transaction,
  };
}

export function setTransactionSecurityAlertResponse(
  transactionId: string,
  securityAlertResponse: SecurityAlertResponse,
): SetTransactionSecurityAlertResponseAction {
  return {
    type: 'SET_TRANSACTION_SECURITY_ALERT_RESPONSE',
    transactionId,
    securityAlertResponse,
  };
}

/**
 * Sets any attribute in transaction object
 *
 * @param transaction - New transaction object
 */
export function setTransactionObject(
  transaction: TransactionMetadata,
): SetTransactionObjectAction {
  return {
    type: 'SET_TRANSACTION_OBJECT',
    transaction,
  };
}

/**
 * Sets the current transaction ID only.
 *
 * @param transactionId - Id of the current transaction.
 */
export function setTransactionId(transactionId: string): SetTransactionIdAction {
  return {
    type: 'SET_TRANSACTION_ID',
    transactionId,
  };
}

/**
 * Enable selectable tokens (ERC20 and Ether) to send in a transaction
 *
 * @param asset - Asset to start the transaction with
 */
export function setTokensTransaction(
  asset: SelectedAsset,
): SetTokensTransactionAction {
  return {
    type: 'SET_TOKENS_TRANSACTION',
    asset,
  };
}

/**
 * Enable Ether only to send in a transaction
 *
 * @param transaction - Transaction additional object
 */
export function setEtherTransaction(
  transaction: TransactionMetadata,
): SetEtherTransactionAction {
  return {
    type: 'SET_ETHER_TRANSACTION',
    transaction,
  };
}

export function setNonce(nonce: string): SetNonceAction {
  return {
    type: 'SET_NONCE',
    nonce,
  };
}

export function setProposedNonce(proposedNonce: string): SetProposedNonceAction {
  return {
    type: 'SET_PROPOSED_NONCE',
    proposedNonce,
  };
}

export function setMaxValueMode(maxValueMode: boolean): SetMaxValueModeAction {
  return {
    type: 'SET_MAX_VALUE_MODE',
    maxValueMode,
  };
}

export function setTransactionValue(value: string): SetTransactionValueAction {
  return {
    type: 'SET_TRANSACTION_VALUE',
    value,
  };
}

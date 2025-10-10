import { Action } from 'redux';
import { SelectedAsset as SelectedAssetImport } from '../../components/UI/AccountFromToInfoCard/AccountFromToInfoCard.types';
import { SecurityAlertResponse } from '@metamask/transaction-controller';

export type SelectedAsset = SelectedAssetImport;

export type AssetType = 'ETH' | 'ERC20' | 'ERC721' | 'ERC1155';

export interface TransactionObject {
  data?: string;
  from?: string;
  gas?: string;
  gasPrice?: string;
  to?: string;
  value?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
}

export interface TransactionState {
  selectedAsset: SelectedAsset;
  assetType?: AssetType;
  transaction: TransactionObject;
  nonce?: string;
  proposedNonce?: string;
  securityAlertResponses: Record<string, SecurityAlertResponse>;
  ensRecipient?: string;
  transactionTo?: string;
  transactionToName?: string;
  transactionFromName?: string;
  transactionValue?: string;
  symbol?: string;
  paymentRequest?: unknown;
  readableValue?: string;
  id?: string;
  type?: string;
  warningGasPriceHigh?: boolean;
  useMax: boolean;
  maxValueMode?: boolean;
}

export interface ResetTransactionAction extends Action<'RESET_TRANSACTION'> {}

export interface NewAssetTransactionAction
  extends Action<'NEW_ASSET_TRANSACTION'> {
  selectedAsset: SelectedAsset;
  assetType: AssetType;
}

export interface SetNonceAction extends Action<'SET_NONCE'> {
  nonce: string;
}

export interface SetProposedNonceAction extends Action<'SET_PROPOSED_NONCE'> {
  proposedNonce: string;
}

export interface SetRecipientAction extends Action<'SET_RECIPIENT'> {
  from: string;
  to: string;
  ensRecipient?: string;
  transactionToName?: string;
  transactionFromName?: string;
}

export interface SetSelectedAssetAction extends Action<'SET_SELECTED_ASSET'> {
  selectedAsset: SelectedAsset;
  assetType?: AssetType;
}

export interface PrepareTransactionAction
  extends Action<'PREPARE_TRANSACTION'> {
  transaction: TransactionObject;
}

export interface TransactionMetadata {
  data?: string;
  from?: string;
  gas?: string;
  gasPrice?: string;
  to?: string;
  value?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  securityAlertResponse?: SecurityAlertResponse;

  selectedAsset?: SelectedAsset;
  assetType?: AssetType;
  ensRecipient?: string;
  transactionTo?: string;
  transactionToName?: string;
  transactionFromName?: string;

  [key: string]: unknown;
}

export interface SetTransactionObjectAction
  extends Action<'SET_TRANSACTION_OBJECT'> {
  transaction: TransactionMetadata;
}

export interface SetTokensTransactionAction
  extends Action<'SET_TOKENS_TRANSACTION'> {
  asset: SelectedAsset;
}

export interface SetEtherTransactionAction
  extends Action<'SET_ETHER_TRANSACTION'> {
  transaction: TransactionMetadata;
}

export interface SetTransactionSecurityAlertResponseAction
  extends Action<'SET_TRANSACTION_SECURITY_ALERT_RESPONSE'> {
  transactionId: string;
  securityAlertResponse: SecurityAlertResponse;
}

export interface SetTransactionIdAction extends Action<'SET_TRANSACTION_ID'> {
  transactionId: string;
}

export interface SetMaxValueModeAction extends Action<'SET_MAX_VALUE_MODE'> {
  maxValueMode: boolean;
}

export interface SetTransactionValueAction
  extends Action<'SET_TRANSACTION_VALUE'> {
  value: string;
}

export interface RehydrateAction extends Action<'persist/REHYDRATE'> {}

export type TransactionAction =
  | ResetTransactionAction
  | NewAssetTransactionAction
  | SetNonceAction
  | SetProposedNonceAction
  | SetRecipientAction
  | SetSelectedAssetAction
  | PrepareTransactionAction
  | SetTransactionObjectAction
  | SetTokensTransactionAction
  | SetEtherTransactionAction
  | SetTransactionSecurityAlertResponseAction
  | SetTransactionIdAction
  | SetMaxValueModeAction
  | SetTransactionValueAction
  | RehydrateAction;

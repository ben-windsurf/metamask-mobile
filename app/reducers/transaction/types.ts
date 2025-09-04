import type BN from 'bnjs4';
import { SecurityAlertResponse } from '@metamask/transaction-controller';

export interface TransactionObject {
  data?: string;
  from?: string;
  gas?: string | BN;
  gasPrice?: string | BN;
  to?: string;
  value?: string | BN;
  maxFeePerGas?: string | BN;
  maxPriorityFeePerGas?: string | BN;
  securityAlertResponse?: SecurityAlertResponse;
  [key: string]: unknown;
}

export interface SelectedAsset {
  tokenId?: string;
  isETH?: boolean;
  symbol?: string;
  address?: string;
  chainId?: string;
  isNative?: boolean;
  name?: string;
  decimals?: number;
  image?: string;
  logo?: string;
  ticker?: string;
}

export interface TransactionState {
  ensRecipient?: string;
  assetType?: string;
  selectedAsset: SelectedAsset;
  transaction: TransactionObject;
  warningGasPriceHigh?: boolean;
  transactionTo?: string;
  transactionToName?: string;
  transactionFromName?: string;
  transactionValue?: string;
  symbol?: string;
  paymentRequest?: unknown;
  readableValue?: string;
  id?: string;
  type?: string;
  proposedNonce?: string;
  nonce?: string;
  securityAlertResponses: Record<string, unknown>;
  useMax: boolean;
  maxValueMode?: boolean;
  origin?: string;
  chainId?: string;
}

export enum TransactionActionType {
  RESET_TRANSACTION = 'RESET_TRANSACTION',
  NEW_ASSET_TRANSACTION = 'NEW_ASSET_TRANSACTION',
  SET_NONCE = 'SET_NONCE',
  SET_PROPOSED_NONCE = 'SET_PROPOSED_NONCE',
  SET_RECIPIENT = 'SET_RECIPIENT',
  SET_SELECTED_ASSET = 'SET_SELECTED_ASSET',
  PREPARE_TRANSACTION = 'PREPARE_TRANSACTION',
  SET_TRANSACTION_OBJECT = 'SET_TRANSACTION_OBJECT',
  SET_TOKENS_TRANSACTION = 'SET_TOKENS_TRANSACTION',
  SET_ETHER_TRANSACTION = 'SET_ETHER_TRANSACTION',
  SET_TRANSACTION_SECURITY_ALERT_RESPONSE = 'SET_TRANSACTION_SECURITY_ALERT_RESPONSE',
  SET_TRANSACTION_ID = 'SET_TRANSACTION_ID',
  SET_MAX_VALUE_MODE = 'SET_MAX_VALUE_MODE',
  SET_TRANSACTION_VALUE = 'SET_TRANSACTION_VALUE',
}

export interface ResetTransactionAction {
  type: TransactionActionType.RESET_TRANSACTION;
}

export interface NewAssetTransactionAction {
  type: TransactionActionType.NEW_ASSET_TRANSACTION;
  selectedAsset: SelectedAsset;
  assetType: string;
}

export interface SetNonceAction {
  type: TransactionActionType.SET_NONCE;
  nonce: string;
}

export interface SetProposedNonceAction {
  type: TransactionActionType.SET_PROPOSED_NONCE;
  proposedNonce: string;
}

export interface SetRecipientAction {
  type: TransactionActionType.SET_RECIPIENT;
  from: string;
  ensRecipient?: string;
  to: string;
  transactionToName?: string;
  transactionFromName?: string;
}

export interface SetSelectedAssetAction {
  type: TransactionActionType.SET_SELECTED_ASSET;
  selectedAsset: SelectedAsset;
  assetType?: string;
}

export interface PrepareTransactionAction {
  type: TransactionActionType.PREPARE_TRANSACTION;
  transaction: TransactionObject;
}

export interface SetTransactionObjectAction {
  type: TransactionActionType.SET_TRANSACTION_OBJECT;
  transaction: TransactionObject & {
    selectedAsset?: SelectedAsset;
    assetType?: string;
  };
}

export interface SetTokensTransactionAction {
  type: TransactionActionType.SET_TOKENS_TRANSACTION;
  asset: SelectedAsset;
}

export interface SetEtherTransactionAction {
  type: TransactionActionType.SET_ETHER_TRANSACTION;
  transaction: TransactionObject;
}

export interface SetTransactionSecurityAlertResponseAction {
  type: TransactionActionType.SET_TRANSACTION_SECURITY_ALERT_RESPONSE;
  transactionId: string;
  securityAlertResponse: unknown;
}

export interface SetTransactionIdAction {
  type: TransactionActionType.SET_TRANSACTION_ID;
  transactionId: string;
}

export interface SetMaxValueModeAction {
  type: TransactionActionType.SET_MAX_VALUE_MODE;
  maxValueMode: boolean;
}

export interface SetTransactionValueAction {
  type: TransactionActionType.SET_TRANSACTION_VALUE;
  value: string;
}

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
  | SetTransactionValueAction;

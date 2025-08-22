import { type Action } from 'redux';
import { SecurityAlertResponse } from '../../components/Views/confirmations/legacy/components/BlockaidBanner/BlockaidBanner.types';

export type { SecurityAlertResponse };

export enum TransactionActionType {
  REHYDRATE = 'persist/REHYDRATE',
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

export interface SelectedAsset {
  tokenId?: string;
  isETH?: boolean;
  symbol?: string;
  address?: string;
  decimals?: number;
  name?: string;
  image?: string;
  balance?: string;
  chainId?: string;
  isNative?: boolean;
}

export interface TransactionData {
  data?: string;
  from?: string;
  gas?: string;
  gasPrice?: string;
  to?: string;
  value?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  selectedAsset?: SelectedAsset;
  assetType?: string;
  securityAlertResponse?: SecurityAlertResponse;
}

export type RehydrateAction = Action<TransactionActionType.REHYDRATE>;

export type ResetTransactionAction =
  Action<TransactionActionType.RESET_TRANSACTION>;

export type NewAssetTransactionAction =
  Action<TransactionActionType.NEW_ASSET_TRANSACTION> & {
    selectedAsset: SelectedAsset;
    assetType: string;
  };

export type SetNonceAction = Action<TransactionActionType.SET_NONCE> & {
  nonce: string;
};

export type SetProposedNonceAction =
  Action<TransactionActionType.SET_PROPOSED_NONCE> & {
    proposedNonce: string;
  };

export type SetRecipientAction = Action<TransactionActionType.SET_RECIPIENT> & {
  from: string;
  ensRecipient?: string;
  to: string;
  transactionToName?: string;
  transactionFromName?: string;
};

export type SetSelectedAssetAction =
  Action<TransactionActionType.SET_SELECTED_ASSET> & {
    selectedAsset: SelectedAsset;
    assetType?: string;
  };

export type PrepareTransactionAction =
  Action<TransactionActionType.PREPARE_TRANSACTION> & {
    transaction: TransactionData;
  };

export type SetTransactionObjectAction =
  Action<TransactionActionType.SET_TRANSACTION_OBJECT> & {
    transaction: TransactionData;
  };

export type SetTokensTransactionAction =
  Action<TransactionActionType.SET_TOKENS_TRANSACTION> & {
    asset: SelectedAsset;
  };

export type SetEtherTransactionAction =
  Action<TransactionActionType.SET_ETHER_TRANSACTION> & {
    transaction: TransactionData;
  };

export type SetTransactionSecurityAlertResponseAction =
  Action<TransactionActionType.SET_TRANSACTION_SECURITY_ALERT_RESPONSE> & {
    transactionId: string;
    securityAlertResponse: SecurityAlertResponse;
  };

export type SetTransactionIdAction =
  Action<TransactionActionType.SET_TRANSACTION_ID> & {
    transactionId: string;
  };

export type SetMaxValueModeAction =
  Action<TransactionActionType.SET_MAX_VALUE_MODE> & {
    maxValueMode: boolean;
  };

export type SetTransactionValueAction =
  Action<TransactionActionType.SET_TRANSACTION_VALUE> & {
    value: string;
  };

export type TransactionAction =
  | RehydrateAction
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

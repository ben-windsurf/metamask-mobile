/* eslint-disable @typescript-eslint/default-param-last */
import { REHYDRATE } from 'redux-persist';
import { getTxData, getTxMeta } from '../../util/transaction-reducer-helpers';
import { TransactionState } from './types';
import {
  TransactionAction,
  TransactionActionType,
  AssetType,
  TransactionObject,
} from '../../actions/transaction/types';
import { SelectedAsset } from '../../components/UI/AccountFromToInfoCard/AccountFromToInfoCard.types';
import type { Action } from 'redux';

export * from './types';
export type { TransactionState };

const initialState: TransactionState = {
  ensRecipient: undefined,
  assetType: undefined,
  selectedAsset: {} as SelectedAsset,
  transaction: {
    data: undefined,
    from: undefined,
    gas: undefined,
    gasPrice: undefined,
    to: undefined,
    value: undefined,
    maxFeePerGas: undefined,
    maxPriorityFeePerGas: undefined,
  },
  warningGasPriceHigh: undefined,
  transactionTo: undefined,
  transactionToName: undefined,
  transactionFromName: undefined,
  transactionValue: undefined,
  symbol: undefined,
  paymentRequest: undefined,
  readableValue: undefined,
  id: undefined,
  type: undefined,
  proposedNonce: undefined,
  nonce: undefined,
  securityAlertResponses: {},
  useMax: false,
  maxValueMode: false,
};

const getAssetType = (selectedAsset: SelectedAsset): AssetType | undefined => {
  let assetType: AssetType | undefined;
  if (selectedAsset) {
    if (selectedAsset.tokenId) {
      assetType = 'ERC721';
    } else if (selectedAsset.isETH) {
      assetType = 'ETH';
    } else {
      assetType = 'ERC20';
    }
  }
  return assetType;
};

type RehydrateAction = Action<typeof REHYDRATE>;

const transactionReducer = (
  state: TransactionState = initialState,
  action: TransactionAction | RehydrateAction,
): TransactionState => {
  switch (action.type) {
    case REHYDRATE:
      return {
        ...initialState,
      };
    case TransactionActionType.RESET_TRANSACTION:
      return {
        ...initialState,
      };
    case TransactionActionType.NEW_ASSET_TRANSACTION:
      return {
        ...state,
        ...initialState,
        selectedAsset: action.selectedAsset,
        assetType: action.assetType,
      };
    case TransactionActionType.SET_NONCE:
      return {
        ...state,
        nonce: action.nonce,
      };
    case TransactionActionType.SET_PROPOSED_NONCE:
      return {
        ...state,
        proposedNonce: action.proposedNonce,
      };
    case TransactionActionType.SET_RECIPIENT:
      return {
        ...state,
        transaction: { ...state.transaction, from: action.from },
        ensRecipient: action.ensRecipient,
        transactionTo: action.to,
        transactionToName: action.transactionToName,
        transactionFromName: action.transactionFromName,
      };
    case TransactionActionType.SET_SELECTED_ASSET: {
      const selectedAsset = action.selectedAsset;
      const assetType = action.assetType || getAssetType(selectedAsset);
      return {
        ...state,
        selectedAsset,
        assetType,
      };
    }
    case TransactionActionType.PREPARE_TRANSACTION:
      return {
        ...state,
        transaction: action.transaction,
      };
    case TransactionActionType.SET_TRANSACTION_OBJECT: {
      const selectedAsset = action.transaction
        .selectedAsset as SelectedAsset | undefined;
      if (selectedAsset) {
        const assetType = getAssetType(selectedAsset);
        action.transaction.assetType = assetType;
      }
      const txMeta = getTxMeta(action.transaction);
      const txData = getTxData(action.transaction);
      return {
        ...state,
        transaction: {
          ...state.transaction,
          ...(txData as Partial<TransactionObject>),
        },
        ...txMeta,
        securityAlertResponses: state.securityAlertResponses,
      };
    }
    case TransactionActionType.SET_TOKENS_TRANSACTION: {
      const selectedAsset = action.asset;
      const assetType = getAssetType(selectedAsset);
      return {
        ...state,
        selectedAsset: action.asset,
        assetType,
      };
    }
    case TransactionActionType.SET_ETHER_TRANSACTION: {
      const txData = getTxData(action.transaction);
      return {
        ...state,
        symbol: 'ETH',
        assetType: 'ETH',
        selectedAsset: { isETH: true, symbol: 'ETH' } as SelectedAsset,
        ...getTxMeta(action.transaction),
        transaction: txData as TransactionObject,
      };
    }
    case TransactionActionType.SET_TRANSACTION_SECURITY_ALERT_RESPONSE: {
      const { transactionId, securityAlertResponse } = action;
      return {
        ...state,
        securityAlertResponses: {
          ...state.securityAlertResponses,
          [transactionId]: securityAlertResponse,
        },
      };
    }
    case TransactionActionType.SET_TRANSACTION_ID: {
      const { transactionId } = action;
      return {
        ...state,
        id: transactionId,
      };
    }
    case TransactionActionType.SET_MAX_VALUE_MODE: {
      return {
        ...state,
        maxValueMode: action.maxValueMode,
      };
    }
    case TransactionActionType.SET_TRANSACTION_VALUE: {
      return {
        ...state,
        transaction: { ...state.transaction, value: action.value },
      };
    }
    default:
      return state;
  }
};

export default transactionReducer;

export const selectTransactionState = (state: {
  transaction: TransactionState;
}) => state.transaction;

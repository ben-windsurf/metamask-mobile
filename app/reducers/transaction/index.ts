import { REHYDRATE } from 'redux-persist';
import { getTxData, getTxMeta } from '../../util/transaction-reducer-helpers';
import {
  TransactionState,
  TransactionAction,
  TransactionActionType,
  SelectedAsset,
} from './types';

const initialState: TransactionState = {
  ensRecipient: undefined,
  assetType: undefined,
  selectedAsset: {},
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
};

const getAssetType = (selectedAsset: SelectedAsset): string | undefined => {
  let assetType;
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

const transactionReducer = (
  action: TransactionAction,
  state: TransactionState = initialState,
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
        selectedAsset: action.selectedAsset || {},
        assetType: action.assetType || undefined,
      };
    case TransactionActionType.SET_NONCE:
      return {
        ...state,
        nonce: action.nonce || undefined,
      };
    case TransactionActionType.SET_PROPOSED_NONCE:
      return {
        ...state,
        proposedNonce: action.proposedNonce || undefined,
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
      const selectedAsset = action.selectedAsset || {};
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
        transaction: (action.transaction as Record<string, unknown>) || {},
      };
    case TransactionActionType.SET_TRANSACTION_OBJECT: {
      const transactionData = action.transaction as Record<string, unknown>;
      const selectedAsset = transactionData?.selectedAsset;
      if (selectedAsset) {
        const assetType = getAssetType(selectedAsset);
        transactionData.assetType = assetType;
      }
      const txMeta = getTxMeta(
        transactionData as Parameters<typeof getTxMeta>[0],
      );
      return {
        ...state,
        transaction: {
          ...state.transaction,
          ...getTxData(transactionData as Parameters<typeof getTxData>[0]),
        } as Record<string, unknown>,
        ...txMeta,
        // Retain the securityAlertResponses from the old state
        securityAlertResponses: state.securityAlertResponses,
      };
    }
    case TransactionActionType.SET_TOKENS_TRANSACTION: {
      const selectedAsset = action.asset || {};
      const assetType = getAssetType(selectedAsset);
      return {
        ...state,
        selectedAsset: action.asset || {},
        assetType,
      };
    }
    case TransactionActionType.SET_ETHER_TRANSACTION:
      return {
        ...state,
        symbol: 'ETH',
        assetType: 'ETH',
        selectedAsset: { isETH: true, symbol: 'ETH' },
        ...getTxMeta(action.transaction as Parameters<typeof getTxMeta>[0]),
        transaction: getTxData(
          action.transaction as Parameters<typeof getTxData>[0],
        ) as Record<string, unknown>,
      };
    case TransactionActionType.SET_TRANSACTION_SECURITY_ALERT_RESPONSE: {
      const { transactionId, securityAlertResponse } = action;
      return {
        ...state,
        securityAlertResponses: {
          ...state.securityAlertResponses,
          [transactionId || '']: securityAlertResponse,
        },
      };
    }
    case TransactionActionType.SET_TRANSACTION_ID: {
      const { transactionId } = action;
      return {
        ...state,
        id: transactionId || undefined,
      };
    }
    case TransactionActionType.SET_MAX_VALUE_MODE: {
      return {
        ...state,
        maxValueMode: action.maxValueMode ?? false,
      };
    }
    case TransactionActionType.SET_TRANSACTION_VALUE: {
      return {
        ...state,
        transaction: { ...state.transaction, value: action.value || undefined },
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

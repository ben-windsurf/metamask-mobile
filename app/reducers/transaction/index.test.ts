import transactionReducer, { TransactionState } from './index';
import {
  resetTransaction,
  newAssetTransaction,
  setNonce,
  setProposedNonce,
  setRecipient,
  setSelectedAsset,
  prepareTransaction,
  setTransactionObject,
  setTokensTransaction,
  setEtherTransaction,
  setTransactionSecurityAlertResponse,
  setTransactionId,
  setMaxValueMode,
  setTransactionValue,
} from '../../actions/transaction';
import { SelectedAsset } from '../../components/UI/AccountFromToInfoCard/AccountFromToInfoCard.types';
import { REHYDRATE } from 'redux-persist';
import { ResultType } from '../../components/Views/confirmations/constants/signatures';
import { Reason } from '../../components/Views/confirmations/legacy/components/BlockaidBanner/BlockaidBanner.types';

describe('transaction reducer', () => {
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

  it('should return initial state', () => {
    const state = transactionReducer(undefined, {
      type: 'UNKNOWN_ACTION',
    } as never);
    expect(state).toEqual(initialState);
  });

  it('should handle REHYDRATE', () => {
    const existingState: TransactionState = {
      ...initialState,
      nonce: '5',
      id: 'test-id',
    };
    const state = transactionReducer(existingState, {
      type: REHYDRATE,
    } as never);
    expect(state).toEqual(initialState);
  });

  it('should handle RESET_TRANSACTION', () => {
    const existingState: TransactionState = {
      ...initialState,
      nonce: '5',
      id: 'test-id',
    };
    const state = transactionReducer(existingState, resetTransaction());
    expect(state).toEqual(initialState);
  });

  describe('NEW_ASSET_TRANSACTION', () => {
    it('should set ETH asset', () => {
      const selectedAsset: SelectedAsset = {
        isETH: true,
        address: '0x',
        symbol: 'ETH',
        decimals: 18,
      };
      const state = transactionReducer(
        initialState,
        newAssetTransaction(selectedAsset),
      );
      expect(state.selectedAsset).toEqual(selectedAsset);
      expect(state.assetType).toBe('ETH');
    });

    it('should set ERC721 asset', () => {
      const selectedAsset: SelectedAsset = {
        isETH: false,
        tokenId: '123',
        address: '0xNFT',
        symbol: 'NFT',
        decimals: 0,
      };
      const state = transactionReducer(
        initialState,
        newAssetTransaction(selectedAsset),
      );
      expect(state.selectedAsset).toEqual(selectedAsset);
      expect(state.assetType).toBe('ERC721');
    });

    it('should set ERC20 asset', () => {
      const selectedAsset: SelectedAsset = {
        isETH: false,
        address: '0xToken',
        symbol: 'TKN',
        decimals: 18,
      };
      const state = transactionReducer(
        initialState,
        newAssetTransaction(selectedAsset),
      );
      expect(state.selectedAsset).toEqual(selectedAsset);
      expect(state.assetType).toBe('ERC20');
    });
  });

  it('should handle SET_NONCE', () => {
    const state = transactionReducer(initialState, setNonce('10'));
    expect(state.nonce).toBe('10');
  });

  it('should handle SET_PROPOSED_NONCE', () => {
    const state = transactionReducer(initialState, setProposedNonce('15'));
    expect(state.proposedNonce).toBe('15');
  });

  it('should handle SET_RECIPIENT', () => {
    const state = transactionReducer(
      initialState,
      setRecipient('0xFrom', '0xTo', 'test.eth', 'ToName', 'FromName'),
    );
    expect(state.transaction.from).toBe('0xFrom');
    expect(state.transactionTo).toBe('0xTo');
    expect(state.ensRecipient).toBe('test.eth');
    expect(state.transactionToName).toBe('ToName');
    expect(state.transactionFromName).toBe('FromName');
  });

  it('should handle SET_SELECTED_ASSET', () => {
    const selectedAsset: SelectedAsset = {
      isETH: true,
      address: '0x',
      symbol: 'ETH',
      decimals: 18,
    };
    const state = transactionReducer(
      initialState,
      setSelectedAsset(selectedAsset),
    );
    expect(state.selectedAsset).toEqual(selectedAsset);
    expect(state.assetType).toBe('ETH');
  });

  it('should handle PREPARE_TRANSACTION', () => {
    const transaction = {
      from: '0xFrom',
      to: '0xTo',
      value: '0x1',
      gas: '0x5208',
    };
    const state = transactionReducer(
      initialState,
      prepareTransaction(transaction),
    );
    expect(state.transaction).toEqual(transaction);
  });

  it('should handle SET_TRANSACTION_OBJECT', () => {
    const transaction = {
      from: '0xFrom',
      to: '0xTo',
      value: '0x1',
      gas: '0x5208',
    };
    const state = transactionReducer(
      initialState,
      setTransactionObject(transaction),
    );
    expect(state.transaction.from).toBe('0xFrom');
    expect(state.transaction.to).toBe('0xTo');
    expect(state.transaction.value).toBe('0x1');
    expect(state.transaction.gas).toBe('0x5208');
  });

  it('should handle SET_TOKENS_TRANSACTION', () => {
    const asset: SelectedAsset = {
      isETH: false,
      address: '0xToken',
      symbol: 'TKN',
      decimals: 18,
    };
    const state = transactionReducer(
      initialState,
      setTokensTransaction(asset),
    );
    expect(state.selectedAsset).toEqual(asset);
    expect(state.assetType).toBe('ERC20');
  });

  it('should handle SET_ETHER_TRANSACTION', () => {
    const transaction = {
      from: '0xFrom',
      to: '0xTo',
      value: '0x1',
    };
    const state = transactionReducer(
      initialState,
      setEtherTransaction(transaction),
    );
    expect(state.symbol).toBe('ETH');
    expect(state.assetType).toBe('ETH');
    expect(state.selectedAsset.isETH).toBe(true);
    expect(state.selectedAsset.symbol).toBe('ETH');
  });

  it('should handle SET_TRANSACTION_SECURITY_ALERT_RESPONSE', () => {
    const securityAlertResponse = {
      result_type: ResultType.Malicious,
      reason: Reason.maliciousDomain,
    };
    const state = transactionReducer(
      initialState,
      setTransactionSecurityAlertResponse('tx-123', securityAlertResponse),
    );
    expect(state.securityAlertResponses['tx-123']).toEqual(
      securityAlertResponse,
    );
  });

  it('should handle SET_TRANSACTION_ID', () => {
    const state = transactionReducer(initialState, setTransactionId('tx-456'));
    expect(state.id).toBe('tx-456');
  });

  it('should handle SET_MAX_VALUE_MODE', () => {
    const state = transactionReducer(initialState, setMaxValueMode(true));
    expect(state.maxValueMode).toBe(true);

    const state2 = transactionReducer(state, setMaxValueMode(false));
    expect(state2.maxValueMode).toBe(false);
  });

  it('should handle SET_TRANSACTION_VALUE', () => {
    const state = transactionReducer(
      initialState,
      setTransactionValue('0x123'),
    );
    expect(state.transaction.value).toBe('0x123');
  });

  it('should preserve securityAlertResponses when setting transaction object', () => {
    const stateWithAlerts = transactionReducer(
      initialState,
      setTransactionSecurityAlertResponse('tx-1', {
        result_type: ResultType.Benign,
        reason: Reason.notApplicable,
      }),
    );

    const newState = transactionReducer(
      stateWithAlerts,
      setTransactionObject({ from: '0xNew' }),
    );

    expect(newState.securityAlertResponses['tx-1']).toBeDefined();
  });
});

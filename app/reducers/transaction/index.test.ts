import { REHYDRATE } from 'redux-persist';
import { SecurityAlertResponse } from '@metamask/transaction-controller';
import reducer, { TransactionState } from './index';
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
import { SelectedAsset } from '../../actions/transaction/types';

describe('Transaction Reducer', () => {
  const mockSelectedAsset: SelectedAsset = {
    isETH: false,
    address: '0x123',
    symbol: 'TST',
    decimals: 18,
  };

  const mockETHAsset: SelectedAsset = {
    isETH: true,
    address: '0x0',
    symbol: 'ETH',
    decimals: 18,
  };

  const mockERC721Asset: SelectedAsset = {
    isETH: false,
    tokenId: '123',
    address: '0x456',
    symbol: 'NFT',
    decimals: 0,
  };

  describe('Initial State', () => {
    it('should return initial state', () => {
      const state = reducer(undefined, resetTransaction());
      expect(state).toBeDefined();
      expect(state.useMax).toBe(false);
      expect(state.securityAlertResponses).toEqual({});
      expect(state.selectedAsset).toEqual({});
    });
  });

  describe('REHYDRATE', () => {
    it('should reset to initial state on rehydrate', () => {
      const existingState: TransactionState = {
        ...reducer(undefined, resetTransaction()),
        nonce: '5',
        symbol: 'TEST',
      };

      const action = {
        type: REHYDRATE,
      };

      const newState = reducer(existingState, action);
      expect(newState.nonce).toBeUndefined();
      expect(newState.symbol).toBeUndefined();
    });
  });

  describe('RESET_TRANSACTION', () => {
    it('should reset transaction to initial state', () => {
      const existingState: TransactionState = {
        ...reducer(undefined, resetTransaction()),
        nonce: '5',
        transactionTo: '0xABC',
      };

      const action = resetTransaction();
      const newState = reducer(existingState, action);

      expect(newState.nonce).toBeUndefined();
      expect(newState.transactionTo).toBeUndefined();
    });
  });

  describe('NEW_ASSET_TRANSACTION', () => {
    it('should set new asset transaction with ERC20', () => {
      const action = newAssetTransaction(mockSelectedAsset);
      const newState = reducer(undefined, action);

      expect(newState.selectedAsset).toEqual(mockSelectedAsset);
      expect(newState.assetType).toBe('ERC20');
    });

    it('should set new asset transaction with ETH', () => {
      const action = newAssetTransaction(mockETHAsset);
      const newState = reducer(undefined, action);

      expect(newState.selectedAsset).toEqual(mockETHAsset);
      expect(newState.assetType).toBe('ETH');
    });

    it('should set new asset transaction with ERC721', () => {
      const action = newAssetTransaction(mockERC721Asset);
      const newState = reducer(undefined, action);

      expect(newState.selectedAsset).toEqual(mockERC721Asset);
      expect(newState.assetType).toBe('ERC721');
    });
  });

  describe('SET_NONCE', () => {
    it('should set nonce', () => {
      const action = setNonce('10');
      const newState = reducer(undefined, action);

      expect(newState.nonce).toBe('10');
    });
  });

  describe('SET_PROPOSED_NONCE', () => {
    it('should set proposed nonce', () => {
      const action = setProposedNonce('15');
      const newState = reducer(undefined, action);

      expect(newState.proposedNonce).toBe('15');
    });
  });

  describe('SET_RECIPIENT', () => {
    it('should set recipient information', () => {
      const action = setRecipient(
        '0xFrom',
        '0xTo',
        'test.eth',
        'ToName',
        'FromName',
      );
      const newState = reducer(undefined, action);

      expect(newState.transaction.from).toBe('0xFrom');
      expect(newState.transactionTo).toBe('0xTo');
      expect(newState.ensRecipient).toBe('test.eth');
      expect(newState.transactionToName).toBe('ToName');
      expect(newState.transactionFromName).toBe('FromName');
    });
  });

  describe('SET_SELECTED_ASSET', () => {
    it('should set selected asset', () => {
      const action = setSelectedAsset(mockSelectedAsset);
      const newState = reducer(undefined, action);

      expect(newState.selectedAsset).toEqual(mockSelectedAsset);
      expect(newState.assetType).toBe('ERC20');
    });

    it('should compute asset type from selected asset', () => {
      const action = setSelectedAsset(mockETHAsset);
      const newState = reducer(undefined, action);

      expect(newState.assetType).toBe('ETH');
    });
  });

  describe('PREPARE_TRANSACTION', () => {
    it('should prepare transaction object', () => {
      const transaction = {
        from: '0xFrom',
        to: '0xTo',
        value: '0x1',
        gas: '0x5208',
      };
      const action = prepareTransaction(transaction);
      const newState = reducer(undefined, action);

      expect(newState.transaction).toEqual(transaction);
    });
  });

  describe('SET_TRANSACTION_OBJECT', () => {
    it('should set transaction object with asset type', () => {
      const transaction = {
        from: '0xFrom',
        to: '0xTo',
        value: '0x1',
        selectedAsset: mockSelectedAsset,
      };
      const action = setTransactionObject(transaction);
      const newState = reducer(undefined, action);

      expect(newState.transaction.from).toBe('0xFrom');
      expect(newState.transaction.to).toBe('0xTo');
      expect(newState.transaction.value).toBe('0x1');
    });

    it('should preserve security alert responses', () => {
      const initialState: TransactionState = {
        ...reducer(undefined, resetTransaction()),
        securityAlertResponses: {
          '123': { result_type: 'Benign' } as SecurityAlertResponse,
        },
      };

      const transaction = {
        from: '0xFrom',
        to: '0xTo',
      };
      const action = setTransactionObject(transaction);
      const newState = reducer(initialState, action);

      expect(newState.securityAlertResponses['123']).toBeDefined();
    });
  });

  describe('SET_TOKENS_TRANSACTION', () => {
    it('should set tokens transaction', () => {
      const action = setTokensTransaction(mockSelectedAsset);
      const newState = reducer(undefined, action);

      expect(newState.selectedAsset).toEqual(mockSelectedAsset);
      expect(newState.assetType).toBe('ERC20');
    });
  });

  describe('SET_ETHER_TRANSACTION', () => {
    it('should set ether transaction', () => {
      const transaction = {
        value: '0x1',
        gas: '0x5208',
      };
      const action = setEtherTransaction(transaction);
      const newState = reducer(undefined, action);

      expect(newState.symbol).toBe('ETH');
      expect(newState.assetType).toBe('ETH');
      expect(newState.selectedAsset.isETH).toBe(true);
    });
  });

  describe('SET_TRANSACTION_SECURITY_ALERT_RESPONSE', () => {
    it('should set security alert response for transaction', () => {
      const securityAlertResponse: SecurityAlertResponse = {
        result_type: 'Malicious',
        reason: 'Test reason',
      } as SecurityAlertResponse;

      const action = setTransactionSecurityAlertResponse(
        'tx123',
        securityAlertResponse,
      );
      const newState = reducer(undefined, action);

      expect(newState.securityAlertResponses.tx123).toEqual(
        securityAlertResponse,
      );
    });

    it('should add security alert response without overwriting existing ones', () => {
      const initialState: TransactionState = {
        ...reducer(undefined, resetTransaction()),
        securityAlertResponses: {
          tx1: { result_type: 'Benign' } as SecurityAlertResponse,
        },
      };

      const newResponse: SecurityAlertResponse = {
        result_type: 'Warning',
      } as SecurityAlertResponse;

      const action = setTransactionSecurityAlertResponse('tx2', newResponse);
      const newState = reducer(initialState, action);

      expect(newState.securityAlertResponses.tx1).toBeDefined();
      expect(newState.securityAlertResponses.tx2).toEqual(newResponse);
    });
  });

  describe('SET_TRANSACTION_ID', () => {
    it('should set transaction id', () => {
      const action = setTransactionId('tx-abc-123');
      const newState = reducer(undefined, action);

      expect(newState.id).toBe('tx-abc-123');
    });
  });

  describe('SET_MAX_VALUE_MODE', () => {
    it('should set max value mode to true', () => {
      const action = setMaxValueMode(true);
      const newState = reducer(undefined, action);

      expect(newState.maxValueMode).toBe(true);
    });

    it('should set max value mode to false', () => {
      const action = setMaxValueMode(false);
      const newState = reducer(undefined, action);

      expect(newState.maxValueMode).toBe(false);
    });
  });

  describe('SET_TRANSACTION_VALUE', () => {
    it('should set transaction value', () => {
      const action = setTransactionValue('0x123456');
      const newState = reducer(undefined, action);

      expect(newState.transaction.value).toBe('0x123456');
    });

    it('should preserve other transaction properties', () => {
      const initialState: TransactionState = {
        ...reducer(undefined, resetTransaction()),
        transaction: {
          from: '0xFrom',
          to: '0xTo',
          gas: '0x5208',
        },
      };

      const action = setTransactionValue('0xABC');
      const newState = reducer(initialState, action);

      expect(newState.transaction.from).toBe('0xFrom');
      expect(newState.transaction.to).toBe('0xTo');
      expect(newState.transaction.gas).toBe('0x5208');
      expect(newState.transaction.value).toBe('0xABC');
    });
  });

  describe('Asset Type Classification', () => {
    it('should correctly identify ERC20 tokens', () => {
      const asset: SelectedAsset = {
        isETH: false,
        address: '0x123',
        symbol: 'DAI',
        decimals: 18,
      };
      const action = newAssetTransaction(asset);
      const newState = reducer(undefined, action);

      expect(newState.assetType).toBe('ERC20');
    });

    it('should correctly identify ETH', () => {
      const asset: SelectedAsset = {
        isETH: true,
        address: '0x0',
        symbol: 'ETH',
        decimals: 18,
      };
      const action = newAssetTransaction(asset);
      const newState = reducer(undefined, action);

      expect(newState.assetType).toBe('ETH');
    });

    it('should correctly identify ERC721 tokens', () => {
      const asset: SelectedAsset = {
        isETH: false,
        tokenId: '42',
        address: '0x789',
        symbol: 'NFT',
        decimals: 0,
      };
      const action = newAssetTransaction(asset);
      const newState = reducer(undefined, action);

      expect(newState.assetType).toBe('ERC721');
    });
  });
});

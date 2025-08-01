export interface ModalsState {
  networkModalVisible?: boolean;
  shouldNetworkSwitchPopToWallet?: boolean;
  collectibleContractModalVisible?: boolean;
  dappTransactionModalVisible?: boolean;
  signMessageModalVisible?: boolean;
  infoNetworkModalVisible?: boolean;
  receiveAsset?: Record<string, unknown>;
}

export enum ModalsActionType {
  TOGGLE_NETWORK_MODAL = 'TOGGLE_NETWORK_MODAL',
  TOGGLE_COLLECTIBLE_CONTRACT_MODAL = 'TOGGLE_COLLECTIBLE_CONTRACT_MODAL',
  TOGGLE_DAPP_TRANSACTION_MODAL = 'TOGGLE_DAPP_TRANSACTION_MODAL',
  TOGGLE_INFO_NETWORK_MODAL = 'TOGGLE_INFO_NETWORK_MODAL',
  TOGGLE_SIGN_MODAL = 'TOGGLE_SIGN_MODAL',
}

interface ModalsAction {
  type: string;
  shouldNetworkSwitchPopToWallet?: boolean;
  show?: boolean | null;
}

const initialState: ModalsState = {
  networkModalVisible: false,
  shouldNetworkSwitchPopToWallet: true,
  collectibleContractModalVisible: false,
  dappTransactionModalVisible: false,
  signMessageModalVisible: true,
};

const modalsReducer = (
  state: ModalsState,
  action: ModalsAction = { type: '' },
): ModalsState => {
  if (!state) state = initialState;
  switch (action.type) {
    case ModalsActionType.TOGGLE_NETWORK_MODAL:
      return {
        ...state,
        networkModalVisible: !state.networkModalVisible,
        shouldNetworkSwitchPopToWallet:
          action.shouldNetworkSwitchPopToWallet ?? true,
      };
    case ModalsActionType.TOGGLE_COLLECTIBLE_CONTRACT_MODAL:
      return {
        ...state,
        collectibleContractModalVisible: !state.collectibleContractModalVisible,
      };
    case ModalsActionType.TOGGLE_DAPP_TRANSACTION_MODAL:
      if (action.show === false) {
        return {
          ...state,
          dappTransactionModalVisible: false,
        };
      }
      return {
        ...state,
        dappTransactionModalVisible:
          action.show === null
            ? !state.dappTransactionModalVisible
            : action.show ?? false,
      };
    case ModalsActionType.TOGGLE_INFO_NETWORK_MODAL:
      if (action.show === false) {
        return {
          ...state,
          infoNetworkModalVisible: false,
        };
      }
      return {
        ...state,
        infoNetworkModalVisible: !state.infoNetworkModalVisible,
      };
    case ModalsActionType.TOGGLE_SIGN_MODAL:
      if (action.show === false) {
        return {
          ...state,
          signMessageModalVisible: false,
        };
      }
      return {
        ...state,
        signMessageModalVisible: !state.signMessageModalVisible,
      };
    default:
      return state;
  }
};

export default modalsReducer;

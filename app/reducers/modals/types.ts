export interface ModalsState {
  networkModalVisible: boolean;
  shouldNetworkSwitchPopToWallet: boolean;
  collectibleContractModalVisible: boolean;
  dappTransactionModalVisible: boolean;
  signMessageModalVisible: boolean;
  infoNetworkModalVisible?: boolean;
  receiveAsset?: unknown;
}

export enum ModalsActionType {
  TOGGLE_NETWORK_MODAL = 'TOGGLE_NETWORK_MODAL',
  TOGGLE_COLLECTIBLE_CONTRACT_MODAL = 'TOGGLE_COLLECTIBLE_CONTRACT_MODAL',
  TOGGLE_DAPP_TRANSACTION_MODAL = 'TOGGLE_DAPP_TRANSACTION_MODAL',
  TOGGLE_INFO_NETWORK_MODAL = 'TOGGLE_INFO_NETWORK_MODAL',
  TOGGLE_SIGN_MODAL = 'TOGGLE_SIGN_MODAL',
}

export interface ToggleNetworkModalAction {
  type: ModalsActionType.TOGGLE_NETWORK_MODAL;
  shouldNetworkSwitchPopToWallet: boolean;
}

export interface ToggleCollectibleContractModalAction {
  type: ModalsActionType.TOGGLE_COLLECTIBLE_CONTRACT_MODAL;
}

export interface ToggleDappTransactionModalAction {
  type: ModalsActionType.TOGGLE_DAPP_TRANSACTION_MODAL;
  show?: boolean | null;
}

export interface ToggleInfoNetworkModalAction {
  type: ModalsActionType.TOGGLE_INFO_NETWORK_MODAL;
  show?: boolean;
}

export interface ToggleSignModalAction {
  type: ModalsActionType.TOGGLE_SIGN_MODAL;
  show?: boolean;
}

export type ModalsAction =
  | ToggleNetworkModalAction
  | ToggleCollectibleContractModalAction
  | ToggleDappTransactionModalAction
  | ToggleInfoNetworkModalAction
  | ToggleSignModalAction;

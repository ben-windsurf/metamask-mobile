import { type Action } from 'redux';

export enum ModalsActionType {
  TOGGLE_NETWORK_MODAL = 'TOGGLE_NETWORK_MODAL',
  TOGGLE_COLLECTIBLE_CONTRACT_MODAL = 'TOGGLE_COLLECTIBLE_CONTRACT_MODAL',
  TOGGLE_DAPP_TRANSACTION_MODAL = 'TOGGLE_DAPP_TRANSACTION_MODAL',
  TOGGLE_INFO_NETWORK_MODAL = 'TOGGLE_INFO_NETWORK_MODAL',
  TOGGLE_SIGN_MODAL = 'TOGGLE_SIGN_MODAL',
}

export type ToggleNetworkModalAction =
  Action<ModalsActionType.TOGGLE_NETWORK_MODAL> & {
    shouldNetworkSwitchPopToWallet: boolean;
  };

export type ToggleCollectibleContractModalAction =
  Action<ModalsActionType.TOGGLE_COLLECTIBLE_CONTRACT_MODAL>;

export type ToggleDappTransactionModalAction =
  Action<ModalsActionType.TOGGLE_DAPP_TRANSACTION_MODAL> & {
    show?: boolean | null;
  };

export type ToggleInfoNetworkModalAction =
  Action<ModalsActionType.TOGGLE_INFO_NETWORK_MODAL> & {
    show?: boolean;
  };

export type ToggleSignModalAction =
  Action<ModalsActionType.TOGGLE_SIGN_MODAL> & {
    show?: boolean;
  };

export type ModalsAction =
  | ToggleNetworkModalAction
  | ToggleCollectibleContractModalAction
  | ToggleDappTransactionModalAction
  | ToggleInfoNetworkModalAction
  | ToggleSignModalAction;

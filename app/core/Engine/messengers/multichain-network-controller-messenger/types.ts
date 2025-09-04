import { AccountsControllerSelectedAccountChangeEvent } from '@metamask/accounts-controller';
import {
  type NetworkControllerSetActiveNetworkAction,
  type NetworkControllerGetStateAction,
} from '@metamask/network-controller';

/**
 * Union type of all actions that the multichain network controller messenger can handle.
 * Includes network controller actions for setting active networks and getting state.
 */
export type MultichainNetworkControllerActions =
  | NetworkControllerSetActiveNetworkAction
  | NetworkControllerGetStateAction;

/**
 * Union type of all events that the multichain network controller messenger can emit.
 * Currently includes account selection change events from the accounts controller.
 */
export type MultichainNetworkControllerEvents =
  AccountsControllerSelectedAccountChangeEvent;

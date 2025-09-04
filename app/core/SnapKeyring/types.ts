import { RestrictedMessenger } from '@metamask/base-controller';
import { MaybeUpdateState, TestOrigin } from '@metamask/phishing-controller';
import type { KeyringControllerGetAccountsAction } from '@metamask/keyring-controller';
import { GetSubjectMetadata } from '@metamask/permission-controller';
import {
  AccountsControllerGetAccountByAddressAction,
  AccountsControllerSetAccountNameAction,
  AccountsControllerSetAccountNameAndSelectAccountAction,
  AccountsControllerSetSelectedAccountAction,
  AccountsControllerListMultichainAccountsAction,
} from '@metamask/accounts-controller';
import type {
  AcceptRequest,
  AddApprovalRequest,
  EndFlow,
  RejectRequest,
  ShowError,
  ShowSuccess,
  StartFlow,
} from '@metamask/approval-controller';
import { SnapKeyringAllowedActions } from '@metamask/eth-snap-keyring';

/**
 * Union type of all allowed actions for the SnapKeyring builder messenger.
 * Combines approval controller actions, phishing controller actions, keyring actions,
 * permission actions, and accounts controller actions that the SnapKeyring can perform.
 */
export type SnapKeyringBuilderAllowActions =
  | StartFlow
  | EndFlow
  | ShowSuccess
  | ShowError
  | AddApprovalRequest
  | AcceptRequest
  | RejectRequest
  | MaybeUpdateState
  | TestOrigin
  | KeyringControllerGetAccountsAction
  | GetSubjectMetadata
  | AccountsControllerSetSelectedAccountAction
  | AccountsControllerGetAccountByAddressAction
  | AccountsControllerListMultichainAccountsAction
  | AccountsControllerSetAccountNameAction
  | AccountsControllerSetAccountNameAndSelectAccountAction
  | SnapKeyringAllowedActions;

/**
 * Restricted messenger type for the SnapKeyring builder.
 * Provides controlled communication interface for SnapKeyring operations
 * with specific allowed actions and no allowed events.
 */
export type SnapKeyringBuilderMessenger = RestrictedMessenger<
  'SnapKeyring',
  SnapKeyringBuilderAllowActions,
  never,
  SnapKeyringBuilderAllowActions['type'],
  never
>;

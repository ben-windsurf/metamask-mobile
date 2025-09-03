import {
  MultichainRouterGetSupportedAccountsAction,
  MultichainRouterIsSupportedScopeAction,
} from '@metamask/snaps-controllers';

/**
 * Event type constant for checking if a scope is supported by the multichain router
 * Used to determine if a specific blockchain scope can be handled by the router
 */
export const MultichainRouterIsSupportedScopeEvent: MultichainRouterIsSupportedScopeAction['type'] =
  'MultichainRouter:isSupportedScope';

/**
 * Event type constant for retrieving supported accounts from the multichain router
 * Used to get a list of accounts that are compatible with multichain operations
 */
export const MultichainRouterGetSupportedAccountsEvent: MultichainRouterGetSupportedAccountsAction['type'] =
  'MultichainRouter:getSupportedAccounts';

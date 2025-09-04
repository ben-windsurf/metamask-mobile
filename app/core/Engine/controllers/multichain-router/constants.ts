import {
  MultichainRouterGetSupportedAccountsAction,
  MultichainRouterIsSupportedScopeAction,
} from '@metamask/snaps-controllers';

/**
 * Event type constant for checking if a scope is supported by the multichain router.
 * Used to identify multichain router scope validation events.
 */
export const MultichainRouterIsSupportedScopeEvent: MultichainRouterIsSupportedScopeAction['type'] =
  'MultichainRouter:isSupportedScope';

/**
 * Event type constant for retrieving supported accounts from the multichain router.
 * Used to identify multichain router account retrieval events.
 */
export const MultichainRouterGetSupportedAccountsEvent: MultichainRouterGetSupportedAccountsAction['type'] =
  'MultichainRouter:getSupportedAccounts';

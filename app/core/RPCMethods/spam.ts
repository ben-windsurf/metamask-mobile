import { Store } from 'redux';
import { JsonRpcRequest } from '@metamask/utils';
import { providerErrors } from '@metamask/rpc-errors';

import { containsUserRejectedError } from '../../util/middlewares';
import Routes from '../../constants/navigation/Routes';
import NavigationService from '../NavigationService';
import { RPC_METHODS } from '../SDKConnect/SDKConnectConstants';
import {
  selectIsOriginBlockedForRPCRequests,
  onRPCRequestRejectedByUser,
} from '../redux/slices/originThrottling';

/**
 * Set of RPC methods that can be blocked by the spam filter
 * These methods are considered potentially spammy and subject to origin throttling
 */
export const BLOCKABLE_SPAM_RPC_METHODS = new Set([
  RPC_METHODS.ETH_SENDTRANSACTION,
  RPC_METHODS.ETH_SIGNTYPEDEATA,
  RPC_METHODS.ETH_SIGNTYPEDEATAV3,
  RPC_METHODS.ETH_SIGNTYPEDEATAV4,
  RPC_METHODS.METAMASK_CONNECTSIGN,
  RPC_METHODS.METAMASK_BATCH,
  RPC_METHODS.PERSONAL_SIGN,
  RPC_METHODS.WALLET_WATCHASSET,
  RPC_METHODS.WALLET_ADDETHEREUMCHAIN,
  RPC_METHODS.WALLET_SWITCHETHEREUMCHAIN,
  RPC_METHODS.WALLET_SEND_CALLS,
]);

// Origin added in the createOriginMiddleware
export type ExtendedJSONRPCRequest = JsonRpcRequest & { origin: string };

/**
 * Error thrown when a request is blocked by the spam filter
 * Returns an unauthorized provider error with descriptive message
 */
export const SPAM_FILTER_ACTIVATED = providerErrors.unauthorized(
  'Request blocked due to spam filter.',
);

/**
 * Validates whether an RPC request should be throttled based on origin spam filtering
 * Throws SPAM_FILTER_ACTIVATED error if the origin is blocked for the requested method
 * @param {Object} params - Validation parameters
 * @param {ExtendedJSONRPCRequest} params.req - The RPC request with origin information
 * @param {Store} params.store - Redux store to check origin blocking status
 * @throws {Error} SPAM_FILTER_ACTIVATED if origin is blocked for this RPC method
 */
export function validateOriginThrottling({
  req,
  store,
}: {
  req: ExtendedJSONRPCRequest;
  store: Store;
}) {
  const isBlockableRPCMethod = BLOCKABLE_SPAM_RPC_METHODS.has(req.method);
  if (!isBlockableRPCMethod) {
    return;
  }

  const appState = store.getState();

  const isDappBlocked = selectIsOriginBlockedForRPCRequests(
    appState,
    req.origin,
  );
  if (isDappBlocked) {
    throw SPAM_FILTER_ACTIVATED;
  }
}

/**
 * Processes RPC request rejections to update origin throttling state
 * Tracks user rejections and shows spam modal when origin gets blocked
 * @param {Object} params - Processing parameters
 * @param {ExtendedJSONRPCRequest} params.req - The rejected RPC request with origin
 * @param {Object} params.error - Error details from the rejection
 * @param {string} params.error.message - Error message text
 * @param {number} [params.error.code] - Optional error code
 * @param {Store} params.store - Redux store to dispatch throttling actions
 */
export function processOriginThrottlingRejection({
  req,
  error,
  store,
}: {
  req: ExtendedJSONRPCRequest;
  error: {
    message: string;
    code?: number;
  };
  store: Store;
}) {
  const isBlockableRPCMethod = BLOCKABLE_SPAM_RPC_METHODS.has(req.method);

  if (!isBlockableRPCMethod) {
    return;
  }

  if (!containsUserRejectedError(error.message, error?.code)) {
    return;
  }

  store.dispatch(onRPCRequestRejectedByUser(req.origin));

  if (selectIsOriginBlockedForRPCRequests(store.getState(), req.origin)) {
    NavigationService.navigation.navigate(Routes.MODAL.ROOT_MODAL_FLOW, {
      screen: Routes.SHEET.ORIGIN_SPAM_MODAL,
      params: { origin: req.origin },
    });
  }
}

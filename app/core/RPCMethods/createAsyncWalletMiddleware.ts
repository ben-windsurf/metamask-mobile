import { createWalletMiddleware } from '@metamask/eth-json-rpc-middleware';
import { JsonRpcMiddleware } from '@metamask/json-rpc-engine';
import { JsonRpcParams } from '@metamask/eth-query';
import { Json } from '@metamask/utils';

import {
  getAccounts,
  getCapabilities,
  getCallsStatus,
  processSendCalls,
} from './eip5792';

/**
 * Creates an asynchronous wallet middleware for handling EIP-5792 wallet operations
 * This middleware provides support for batch transaction calls, account management,
 * and wallet capabilities in the MetaMask Mobile application
 * @returns {JsonRpcMiddleware<JsonRpcParams, Json>} Configured wallet middleware with EIP-5792 support
 */
export const createAsyncWalletMiddleware = (): JsonRpcMiddleware<
  JsonRpcParams,
  Json
> =>
  createWalletMiddleware({
    getAccounts,
    processSendCalls,
    getCallsStatus,
    getCapabilities,
  }) as JsonRpcMiddleware<JsonRpcParams, Json>;

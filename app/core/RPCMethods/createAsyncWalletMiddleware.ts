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
 * Creates an async wallet middleware for handling EIP-5792 wallet operations.
 * This middleware provides support for batch transactions, account management,
 * and capability queries in the MetaMask mobile wallet.
 *
 * @returns A JSON-RPC middleware configured with EIP-5792 wallet methods
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

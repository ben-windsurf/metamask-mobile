import {
  JsonRpcEngineNextCallback,
  JsonRpcMiddleware,
} from '@metamask/json-rpc-engine';
import type {
  Json,
  JsonRpcParams,
  JsonRpcRequest,
  PendingJsonRpcResponse,
} from '@metamask/utils';

import { store } from '../../store';
import {
  ExtendedJSONRPCRequest,
  processOriginThrottlingRejection,
  validateOriginThrottling,
} from './spam';

/**
 * Creates a JSON-RPC middleware for origin-based request throttling and spam protection
 *
 * This middleware validates incoming RPC requests against origin-based throttling rules
 * to prevent spam and abuse from malicious dApps. It tracks request frequency per origin
 * and applies rate limiting to protect the MetaMask Mobile application.
 *
 * @returns {JsonRpcMiddleware<JsonRpcParams, Json>} JSON-RPC middleware function that validates and processes origin throttling
 */
export function createOriginThrottlingMiddleware(): JsonRpcMiddleware<
  JsonRpcParams,
  Json
> {
  return (
    req: JsonRpcRequest<JsonRpcParams>,
    res: PendingJsonRpcResponse<Json>,
    next: JsonRpcEngineNextCallback,
  ) => {
    validateOriginThrottling({ req: req as ExtendedJSONRPCRequest, store });

    next((callback: () => void) => {
      if (res.error) {
        processOriginThrottlingRejection({
          req: req as ExtendedJSONRPCRequest,
          error: res.error as {
            message: string;
            code?: number;
          },
          store,
        });
      }
      callback();
    });
    return;
  };
}

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
 * Creates a JSON-RPC middleware that implements origin-based request throttling
 * to prevent spam and abuse from malicious dApps or origins.
 *
 * This middleware validates incoming requests against throttling rules and
 * processes rejections when rate limits are exceeded.
 *
 * @returns A JSON-RPC middleware function that handles origin throttling
 *
 * @example
 * ```typescript
 * const throttlingMiddleware = createOriginThrottlingMiddleware();
 * engine.push(throttlingMiddleware);
 * ```
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

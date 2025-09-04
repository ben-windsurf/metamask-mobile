import { METHODS_TO_REDIRECT } from './SDKConnectConstants';
import DevLogger from './utils/DevLogger';

/**
 * Manages a queue of RPC (Remote Procedure Call) requests for SDK connections.
 * Tracks pending RPC calls and determines when it's safe to redirect users to the app.
 */
export class RPCQueueManager {
  private rpcQueue: { [id: string]: string } = {};

  /**
   * Adds an RPC request to the queue.
   * @param params - The RPC request parameters
   * @param params.id - Unique identifier for the RPC request
   * @param params.method - The RPC method name being called
   */
  add({ id, method }: { id: string; method: string }) {
    DevLogger.log(`RPCQueueManager::add id=${id} method=${method}`);
    this.rpcQueue[id] = method;
  }

  /**
   * Resets the RPC queue by clearing all pending requests.
   * Logs a warning if there are still pending RPCs when reset is called.
   */
  reset() {
    const queuLength = Object.keys(this.rpcQueue).length;
    if (queuLength > 0) {
      console.warn(
        `RPCQueueManager: ${queuLength} RPCs still in the queue`,
        this.rpcQueue,
      );
    }
    this.rpcQueue = {};
  }

  /**
   * Checks if the RPC queue is empty.
   * @returns True if there are no pending RPC requests, false otherwise
   */
  isEmpty() {
    return Object.keys(this.rpcQueue).length === 0;
  }

  /**
   * Check if the queue doesn't contains a redirectable RPC
   * if it does, we can't redirect the user to the app
   *
   * We also pass the current rpc method as a prameters because not all message are saved inside the rpcqueue.
   * For example metamask_getProviderState is sent directly to the backgroundBridge.
   */
  canRedirect({ method }: { method: string }) {
    const redirect = METHODS_TO_REDIRECT[method];
    Object.keys(this.rpcQueue).forEach((id) => {
      const rpcMethod = this.rpcQueue[id];
      if (METHODS_TO_REDIRECT[rpcMethod]) {
        return false;
      }
    });
    return redirect;
  }

  /**
   * Removes an RPC request from the queue by its ID.
   * @param id - The unique identifier of the RPC request to remove
   */
  remove(id: string) {
    delete this.rpcQueue[id];
  }

  /**
   * Gets the entire RPC queue.
   * @returns Object containing all pending RPC requests mapped by their IDs
   */
  get() {
    return this.rpcQueue;
  }

  /**
   * Gets the RPC method for a specific request ID.
   * @param id - The unique identifier of the RPC request
   * @returns The RPC method name if found, undefined otherwise
   */
  getId(id: string) {
    return this.rpcQueue?.[id];
  }
}

export default RPCQueueManager;
